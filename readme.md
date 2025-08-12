# Scissor API

A URL shortening API built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **User Authentication**: Signup, email confirmation, and login with session-based authentication
- **URL Shortening**: Create short URLs from long URLs
- **URL Redirection**: Access short URLs to redirect to original URLs
- **Security**: Helmet for security headers, rate limiting, CORS, input validation
- **Monitoring**: Sentry for error tracking, Treblle for API monitoring
- **Email Service**: Nodemailer with Gmail SMTP for email confirmation

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: Session-based with cookies
- **Email**: Nodemailer with Gmail SMTP
- **Security**: Helmet, express-rate-limit, CORS
- **Validation**: Joi for request validation
- **Monitoring**: Sentry, Treblle, Morgan
- **Testing**: Jest with ts-jest

## Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Gmail account with App Password

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd scissor-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
SECRET=your_secret_key_here
GMAIL=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
SEC_KEY=your_sentry_secret_key
DSN=your_sentry_dsn
TREBLLE_API_KEY=your_treblle_api_key
TREBLLE_PROJECT_ID=your_treblle_project_id
NODE_ENV=development
```

**Important**: For Gmail, you need to:

1. Enable 2-factor authentication
2. Generate an App Password (not your regular password)
3. Use the App Password in `GMAIL_PASS`

## Running the Application

### Development Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

### Production Build

```bash
npm run build
node dist/src/index.js
```

### Running Tests

```bash
npm test
```

## API Endpoints

### Authentication

#### Signup

```http
POST /auth
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Email Confirmation

```http
GET /auth/{confirmationId}
```

#### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### URL Shortening (Protected)

#### Create Short URL

```http
POST /new
Content-Type: application/json
Cookie: sessionToken=your_session_token

{
  "url": "https://www.example.com/very/long/url"
}
```

#### Access Short URL

```http
GET /{shortId}
```

### User Management (Protected)

#### Update User

```http
PATCH /user/updateUser/{userId}
Content-Type: application/json
Cookie: sessionToken=your_session_token

{
  "name": "Updated Name"
}
```

#### Delete User

```http
DELETE /user/deleteUser/{userId}
Cookie: sessionToken=your_session_token
```

## Security Features

- **Helmet**: Security headers
- **Rate Limiting**: 30 requests per minute per IP
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Joi validation for all requests
- **Password Hashing**: HMAC-SHA256 with salt
- **Session Tokens**: Secure session management
- **HttpOnly Cookies**: XSS protection

## Development Notes

- **Email Service**: Uses Nodemailer with Gmail SMTP
- **Session Management**: Uses signed cookies (removed signing for localhost compatibility)
- **Database**: MongoDB with Mongoose schemas
- **Error Handling**: Comprehensive error handling with Sentry integration
- **Logging**: Morgan for HTTP request logging

## Testing

The application includes unit tests for:

- Authentication functions
- Email sending
- URL shortening
- Sentry integration

Run tests with:

```bash
npm test
```

## Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment variables
2. Update the cookie domain in `authController.ts` for your production domain
3. Ensure all environment variables are properly configured
4. Use a process manager like PM2 for production

## Troubleshooting

### Email Issues

- Ensure Gmail App Password is correct
- Check that 2FA is enabled on Gmail
- Verify SMTP settings in development

### Authentication Issues

- Check that the SECRET environment variable is set
- Ensure cookies are being sent with requests
- Verify session tokens are being stored in the database

### Database Issues

- Ensure MongoDB is running and accessible
- Check connection string and credentials
- Verify database permissions
