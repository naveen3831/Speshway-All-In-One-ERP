import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded regardless of launch directory
const envPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(process.cwd(), '.env'),
];
for (const p of envPaths) {
  dotenv.config({ path: p, override: false });
}

// Lazy-initialized transporter
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';
  const smtpPass = (process.env.SMTP_PASS || 'mypbeksafsszjlii').replace(/\s+/g, '');
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const isSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

  transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
};

const getFromAddress = () => {
  return (
    process.env.EMAIL_FROM ||
    `"SPESHWAY All-In-One ERP" <${process.env.SMTP_USER || 'naveenkumar970100@gmail.com'}>`
  );
};

/**
 * Send an acknowledgment email to a customer right after they submit an inquiry
 */
export const sendInquiryConfirmationEmail = async ({ name, email, module, company, message }) => {
  if (!email) return null;

  try {
    const transport = getTransporter();
    const mailOptions = {
      from: getFromAddress(),
      to: email,
      subject: `Thank you for your inquiry — SPESHWAY All-In-One ERP`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">SPESHWAY</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 600; opacity: 0.9; letter-spacing: 0.05em; text-transform: uppercase;">All-In-One ERP Solutions</p>
          </div>

          <!-- Body -->
          <div style="padding: 28px 24px; color: #1e293b; line-height: 1.6;">
            <p style="font-size: 16px; margin: 0 0 16px 0;">Hello <b>${name || 'Valued Client'}</b>,</p>
            <p style="margin: 0 0 16px 0; color: #334155;">
              Thank you for reaching out to <b>SPESHWAY</b>. We have successfully received your inquiry and our enterprise solutions team has been notified.
            </p>

            <div style="background-color: #f8fafc; border-left: 4px solid #047857; padding: 14px 16px; border-radius: 0 8px 8px 0; margin: 20px 0;">
              <p style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #047857; text-transform: uppercase; letter-spacing: 0.04em;">Inquiry Details:</p>
              <p style="margin: 2px 0; font-size: 14px; color: #334155;"><b>Module / Solution:</b> ${module || 'All-In-One Complete Suite'}</p>
              ${company ? `<p style="margin: 2px 0; font-size: 14px; color: #334155;"><b>Organization:</b> ${company}</p>` : ''}
              ${message ? `<p style="margin: 6px 0 0 0; font-size: 13px; color: #64748b; font-style: italic;">"${message}"</p>` : ''}
            </div>

            <p style="margin: 0 0 20px 0; color: #334155;">
              One of our product specialists will review your requirements and reach out to you with tailored demo access and solution architecture details.
            </p>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; margin-top: 24px;">
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Need urgent assistance? Reply directly to this email or contact us at <a href="mailto:${process.env.SMTP_USER || 'naveenkumar970100@gmail.com'}" style="color: #047857; text-decoration: none; font-weight: 600;">${process.env.SMTP_USER || 'naveenkumar970100@gmail.com'}</a>.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            © ${new Date().getFullYear()} SPESHWAY Technologies. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log(`✉️ Inquiry confirmation email sent to ${email} (MessageID: ${info.messageId})`);
    return info;
  } catch (err) {
    console.warn(`[EmailService] Failed to send confirmation email to ${email}:`, err.message);
    return null;
  }
};

/**
 * Send an email reply/update from the Admin to the customer
 */
export const sendInquiryReplyEmail = async ({
  to,
  customerName,
  subject,
  replyMessage,
  inquiryModule,
  adminName,
}) => {
  if (!to) {
    throw new Error('Recipient email address is required');
  }
  if (!replyMessage || !replyMessage.trim()) {
    throw new Error('Reply message cannot be empty');
  }

  const transport = getTransporter();
  const mailSubject = subject || `Update regarding your SPESHWAY inquiry (${inquiryModule || 'ERP Solution'})`;

  // Convert newlines in reply message to HTML breaks
  const formattedReply = replyMessage
    .split('\n')
    .map((line) => `<p style="margin: 0 0 10px 0;">${line.trim()}</p>`)
    .join('');

  const mailOptions = {
    from: getFromAddress(),
    to,
    replyTo: process.env.SMTP_USER || 'naveenkumar970100@gmail.com',
    subject: mailSubject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); padding: 26px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">SPESHWAY</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; font-weight: 600; opacity: 0.9; letter-spacing: 0.05em; text-transform: uppercase;">Support & Solutions Team</p>
        </div>

        <!-- Body -->
        <div style="padding: 28px 24px; color: #1e293b; line-height: 1.6;">
          <p style="font-size: 15px; margin: 0 0 16px 0;">Dear <b>${customerName || 'Client'}</b>,</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #047857; padding: 16px; border-radius: 6px; margin: 18px 0; color: #1e293b;">
            ${formattedReply}
          </div>

          ${
            inquiryModule
              ? `<p style="font-size: 12px; color: #64748b; margin: 12px 0;"><b>Referenced Service / Module:</b> ${inquiryModule}</p>`
              : ''
          }

          <p style="margin: 18px 0 0 0; color: #334155; font-size: 14px;">
            Best regards,<br />
            <b>${adminName || 'SPESHWAY Enterprise Support Team'}</b><br />
            <span style="font-size: 12px; color: #64748b;">SPESHWAY All-In-One ERP</span>
          </p>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #64748b;">
            You can reply directly to this email to continue our conversation.
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          Sent securely via SPESHWAY Mailer • naveenkumar970100@gmail.com
        </div>
      </div>
    `,
  };

  const info = await transport.sendMail(mailOptions);
  console.log(`✉️ Admin reply email dispatched to ${to} (MessageID: ${info.messageId})`);
  return info;
};

/**
 * Send an email update when the inquiry status is changed
 */
export const sendInquiryStatusEmail = async ({
  to,
  customerName,
  newStatus,
  inquiryModule,
  note,
}) => {
  if (!to) return null;

  try {
    const statusLabels = {
      new: 'Received & Pending Review',
      contacted: 'In Touch with Product Specialist',
      qualified: 'Demo Qualified & Solution Ready',
      closed: 'Inquiry Completed',
    };

    const statusTitle = statusLabels[newStatus] || newStatus;
    const transport = getTransporter();

    const mailOptions = {
      from: getFromAddress(),
      to,
      subject: `Inquiry Update: ${statusTitle} — SPESHWAY All-In-One ERP`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #047857 0%, #065f46 100%); padding: 24px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 800;">SPESHWAY</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9; text-transform: uppercase;">Inquiry Status Update</p>
          </div>

          <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
            <p style="margin: 0 0 14px 0;">Hello <b>${customerName || 'Client'}</b>,</p>
            <p style="margin: 0 0 16px 0; color: #334155;">
              We have an update regarding your inquiry for <b>${inquiryModule || 'SPESHWAY ERP'}</b>:
            </p>

            <div style="background-color: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 14px 16px; margin: 16px 0;">
              <span style="font-size: 12px; font-weight: 700; color: #047857; text-transform: uppercase;">Status:</span>
              <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #065f46;">${statusTitle}</p>
              ${note ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #334155;">${note}</p>` : ''}
            </div>

            <p style="margin: 16px 0 0 0; font-size: 13px; color: #64748b;">
              Have questions? Reply directly to this email or reach us anytime at <a href="mailto:${process.env.SMTP_USER || 'naveenkumar970100@gmail.com'}" style="color: #047857;">${process.env.SMTP_USER || 'naveenkumar970100@gmail.com'}</a>.
            </p>
          </div>
        </div>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    console.log(`✉️ Status update email sent to ${to} (${newStatus})`);
    return info;
  } catch (err) {
    console.warn(`[EmailService] Failed to send status email to ${to}:`, err.message);
    return null;
  }
};

/**
 * Verify SMTP connection on startup or test
 */
export const verifySmtpConnection = async () => {
  try {
    const transport = getTransporter();
    await transport.verify();
    console.log(`📧 SMTP Transporter verified successfully (${process.env.SMTP_USER || 'naveenkumar970100@gmail.com'})`);
    return true;
  } catch (err) {
    console.warn(`⚠️ [EmailService] SMTP verification notice:`, err.message);
    return false;
  }
};

export default {
  sendInquiryConfirmationEmail,
  sendInquiryReplyEmail,
  sendInquiryStatusEmail,
  verifySmtpConnection,
};
