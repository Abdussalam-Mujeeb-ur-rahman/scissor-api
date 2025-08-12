import { sendConfirmationEmail } from "../../src/utils/sendGrid";

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

describe("sendConfirmationEmail", () => {
  let mockSendMail: jest.Mock;

  beforeEach(() => {
    // Get the mock function from the module
    const nodemailer = require("nodemailer");
    mockSendMail = nodemailer.createTransport().sendMail;
    mockSendMail.mockClear();
  });

  it("should send an email and return a success message", async () => {
    const email = "ayodejiabdussalam@gmail.com";
    const confirmationLink = "https://example.com/confirm";

    // Set up the expected mail options
    const expectedMailOptions = {
      from: "mjbabdussalam@gmail.com",
      to: email,
      subject: "Email confirmation",
      text: `Please click on the following link to confirm your email: ${confirmationLink} .`,
      html: `<p>Please click <a href="${confirmationLink}">here</a> to confirm your email.</p>`,
    };

    // Mock the sendMail method to resolve immediately
    mockSendMail.mockResolvedValueOnce({});

    // Call the function
    const result = await sendConfirmationEmail(email, confirmationLink);

    // Check that sendMail was called with the expected options
    expect(mockSendMail).toHaveBeenCalledWith(expectedMailOptions);

    // Check that the function returned the expected result
    expect(result).toEqual(`confirmation link has been sent to ${email}`);
  });

  it("should return an error message when an error occurs", async () => {
    const email = "ayodejiabdussalam@gmail.com";
    const confirmationLink = "https://example.com/confirm";

    // Mock the sendMail method to reject with an error
    mockSendMail.mockRejectedValueOnce(new Error("Test error"));

    // Call the function
    const result = await sendConfirmationEmail(email, confirmationLink);

    // Check that the function returned the expected error message
    expect(result).toEqual(
      "Error sending confirmation link. Please try again!"
    );
  });
});
