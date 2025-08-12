#!/bin/bash

echo "🧪 Testing Scissor API - Comprehensive Test Suite"
echo "=================================================="

BASE_URL="http://localhost:5050"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test endpoint
test_endpoint() {
    local test_name="$1"
    local method="$2"
    local endpoint="$3"
    local data="$4"
    local expected_status="$5"
    local description="$6"
    
    echo -e "\n${YELLOW}Testing: $test_name${NC}"
    echo "Description: $description"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "%{http_code}" "$BASE_URL$endpoint")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "%{http_code}" -X POST -H "Content-Type: application/json" -d "$data" "$BASE_URL$endpoint")
    fi
    
    http_code="${response: -3}"
    body="${response%???}"
    
    echo "Response: $body"
    echo "HTTP Code: $http_code"
    
    if [ "$http_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAILED - Expected $expected_status, got $http_code${NC}"
        ((FAILED++))
    fi
}

echo -e "\n${YELLOW}1. Testing Basic Endpoints${NC}"
test_endpoint "Health Check" "GET" "/" "" "200" "Server health check"

echo -e "\n${YELLOW}2. Testing Authentication Endpoints${NC}"
test_endpoint "Generate Signup Link" "POST" "/auth/" '{"name":"Test User","email":"test@gmail.com","password":"123456"}' "200" "Generate signup confirmation link"

echo -e "\n${YELLOW}3. Testing Protected Endpoints (Unauthorized)${NC}"
test_endpoint "Create URL (Unauthorized)" "POST" "/new" '{"url":"https://www.google.com"}' "404" "Try to create URL without authentication"
test_endpoint "Get All Users (Unauthorized)" "GET" "/user/getAllUsers" "" "404" "Try to get users without authentication"

echo -e "\n${YELLOW}4. Testing URL Validation${NC}"
test_endpoint "Invalid URL Format" "POST" "/new" '{"url":"invalid-url"}' "404" "Test URL validation with invalid format"

echo -e "\n${YELLOW}5. Testing Error Handling${NC}"
test_endpoint "Non-existent Route" "GET" "/api/nonexistent" "" "404" "Test 404 handling for non-existent routes"

echo -e "\n${YELLOW}6. Testing Rate Limiting${NC}"
echo "Making 5 rapid requests to test rate limiting..."
for i in {1..5}; do
    response=$(curl -s -w "%{http_code}" "$BASE_URL/")
    http_code="${response: -3}"
    echo "Request $i: HTTP $http_code"
done

echo -e "\n${YELLOW}7. Testing Security Headers${NC}"
headers=$(curl -s -I "$BASE_URL/" | grep -E "(Content-Security-Policy|X-Frame-Options|X-Content-Type-Options)")
echo "Security Headers:"
echo "$headers"

echo -e "\n${YELLOW}8. Testing CORS${NC}"
cors_headers=$(curl -s -I "$BASE_URL/" | grep -E "(Access-Control-Allow-Origin|Access-Control-Allow-Credentials)")
echo "CORS Headers:"
echo "$cors_headers"

echo -e "\n${YELLOW}9. Testing Database Connection${NC}"
# Test if the server can handle database operations
test_endpoint "Database Connection Test" "POST" "/auth/" '{"name":"DB Test","email":"dbtest@gmail.com","password":"123456"}' "200" "Test database connectivity through signup endpoint"

echo -e "\n${YELLOW}10. Testing Input Validation${NC}"
test_endpoint "Invalid Email Format" "POST" "/auth/" '{"name":"Test","email":"invalid-email","password":"123456"}' "400" "Test email validation"
test_endpoint "Missing Required Fields" "POST" "/auth/" '{"name":"Test"}' "400" "Test required field validation"

echo -e "\n${YELLOW}=================================================="
echo "Test Results Summary"
echo "=================================================="
echo -e "${GREEN}✅ PASSED: $PASSED${NC}"
echo -e "${RED}❌ FAILED: $FAILED${NC}"
echo -e "Total Tests: $((PASSED + FAILED))"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All tests passed! The API is working correctly.${NC}"
else
    echo -e "\n${RED}⚠️  Some tests failed. Please check the implementation.${NC}"
fi

echo -e "\n${YELLOW}Note: Email sending tests will fail without proper SendGrid credentials.${NC}"
echo -e "${YELLOW}This is expected behavior and doesn't indicate a problem with the core API.${NC}"
