// Import the necessary modules and classes
import { shortenURL } from "../../src/utils/shortener";
import { URL_Model } from "../../src/model/urlModel";
import shortid from "shortid";

// Mock the shortid module to control its behavior during testing
jest.mock("shortid");

// Describe the test suite for the shortenURL function
describe("shortenURL", () => {
  // Clear all mocks after each test to ensure a clean state
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: returns an existing URL if it already exists in the database
  it("returns an existing URL if it already exists in the database", async () => {
    // Define the original URL and the existing URL object for testing
    const originalURL = "https://www.google.com";
    const existingURL = {
      original_url: originalURL,
      short_id: "test_id",
    };

    // Mock URL_Model.findOne to return the existing URL object
    URL_Model.findOne = jest.fn().mockResolvedValue(existingURL);

    // Call the shortenURL function and store the result
    const result = await shortenURL(originalURL);

    // Check if URL_Model.findOne was called with the correct parameter
    expect(URL_Model.findOne).toHaveBeenCalledWith({ original_url: originalURL });

    // Check if the result matches the existing URL object
    expect(result).toEqual(existingURL);
  });

  // Test case: creates and returns a new URL if it doesn't exist in the database
  it("creates and returns a new URL if it doesn't exist in the database", async () => {
    // Define the original URL, short_id, and the new URL object for testing
    const originalURL = "https://www.google.com";
    const short_id = "new_id";
    const newURL = {
      original_url: originalURL,
      short_id,
    };

    // Mock URL_Model.findOne to return null (URL not found in the database)
    URL_Model.findOne = jest.fn().mockResolvedValue(null);

    // Mock URL_Model.prototype.save to return the new URL object with an additional _id property
    URL_Model.prototype.save = jest.fn().mockResolvedValue({ ...newURL, _id: "some_random_id" });

    // Mock shortid.generate to return the specified short_id
    shortid.generate = jest.fn().mockReturnValue(short_id);

    // Call the shortenURL function and store the result
    const result = await shortenURL(originalURL);

    // Check if URL_Model.findOne was called with the correct parameter
    expect(URL_Model.findOne).toHaveBeenCalledWith({ original_url: originalURL });

    // Check if shortid.generate was called
    expect(shortid.generate).toHaveBeenCalled();

    // Check if the result object contains the expected properties and values
    expect(result).toEqual(expect.objectContaining(newURL));
  });
});
