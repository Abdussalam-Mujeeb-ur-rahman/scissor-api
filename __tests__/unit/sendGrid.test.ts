import { sendConfirmationEmail } from '../../src/utils/sendGrid';
import sgMail from '@sendgrid/mail';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('sendConfirmationEmail', () => {
  it('should send an email and return a success message', async () => {
    const email = 'ayodejiabdussalam@gmail.com';
    const confirmationLink = 'https://example.com/confirm';

    // Set up the expected message
    const expectedMsg = {
      to: email,
      from: 'mjbabdussalam@gmail.com', 
      subject: 'Email confirmation',
      text: `Please click on the following link to confirm your email: ${confirmationLink} .`,
      html: `<p>Please click <a href=${confirmationLink}>here</a> to confirm your email.</p>`,
    };
    
    // Mock the sgMail.send method to resolve immediately
    (sgMail.send as jest.Mock).mockResolvedValueOnce({});

    // Call the function
    const result = await sendConfirmationEmail(email, confirmationLink);

    // Check that sgMail.send was called with the expected message
    expect(sgMail.send).toHaveBeenCalledWith(expectedMsg);

    // Check that the function returned the expected result
    expect(result).toEqual(`confirmation link has been sent to ${email}`);
  });

  it('should return an error message when an error occurs', async () => {
    const email = 'ayodejiabdussalam@gmail.com';
    const confirmationLink = 'https://example.com/confirm';

    // Mock the sgMail.send method to reject with an error
    (sgMail.send as jest.Mock).mockRejectedValueOnce(new Error('Test error'));

    // Call the function
    const result = await sendConfirmationEmail(email, confirmationLink);

    // Check that the function returned the expected error message
    expect(result).toEqual('Error sending confirmation link. Please try again!');
  });
});
