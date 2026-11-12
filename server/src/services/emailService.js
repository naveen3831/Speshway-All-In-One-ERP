import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

let nodemailer = null;
try {
  const mod = await import('nodemailer');
  nodemailer = mod.default || mod;
} catch (e) {
  console.warn('⚠️ [EmailService] nodemailer package not available; email dispatch will run in mock mode.');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded regardless of launch directory
const envPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(process.cwd(), '.env'),
];
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p, override: false });
  }
}

// Production Cloudinary CDN image assets for 100% email client compatibility
export const BRAND_LOGO_URL =
  'https://res.cloudinary.com/ddgjubbbx/image/upload/v1794460763/speshway_branding/speshway_logo_transparent.png';
export const BRAND_WATERMARK_URL =
  'https://res.cloudinary.com/ddgjubbbx/image/upload/v1794460912/speshway_branding/speshway_watermark.png';

// Lazy-initialized transporter
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (!nodemailer) {
    return {
      verify: async () => false,
      sendMail: async (opts) => {
        console.log('ℹ️ [EmailService Mock] sendMail called for:', opts?.to, opts?.subject);
        return { messageId: 'mock-' + Date.now() };
      },
    };
  }

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
 * Generate SPESHWAY branded email wrapper HTML matching reference design
 * - Rich Emerald Header with SPESHWAY Logo and clean Typography
 * - Dark Theme Container (#18191a) with Watermark in the background
 * - Zero attachments: All images loaded directly via HTTPS CDN URLs
 */
const renderEmailWrapper = ({ title = 'SPESHWAY', subtitle = 'ALL-IN-ONE ERP SOLUTIONS', bodyHtml }) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark light">
  <meta name="supported-color-schemes" content="dark light">
  <title>${title} - ${subtitle}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Email Card Container -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; margin: 0 auto; background-color: #18191a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
    <!-- Top Green Header Bar Matching Reference -->
    <tr>
      <td style="background-color: #047857; background: linear-gradient(135deg, #047857 0%, #065f46 100%); padding: 22px 20px; text-align: center; border-radius: 14px 14px 0 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
          <tr>
            <td valign="middle" style="padding-right: 14px;">
              <img src="${BRAND_LOGO_URL}" 
                   alt="SPESHWAY Logo" 
                   width="46" 
                   height="56" 
                   style="display: block; width: 46px; height: auto; max-height: 58px; border: 0; outline: none; text-decoration: none;" />
            </td>
            <td valign="middle" align="left" style="text-align: left;">
              <h1 style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: 0.03em; line-height: 1.2;">
                ${title}
              </h1>
              <p style="margin: 3px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 700; color: #ffffff; opacity: 0.95; letter-spacing: 0.08em; text-transform: uppercase;">
                ${subtitle}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Section with Low-Transparency Watermark in Background -->
    <tr>
      <td style="background-color: #18191a; background-image: url('${BRAND_WATERMARK_URL}'); background-repeat: no-repeat; background-position: center center; background-size: 280px auto; padding: 32px 26px; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65;">
        ${bodyHtml}
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #141517; padding: 18px 24px; text-align: center; font-size: 12px; color: #6b7280; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; border-top: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0 0 14px 14px;">
        © ${currentYear} SPESHWAY Technologies. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Send an acknowledgment email to a customer right after they submit an inquiry
 * Matches the reference design with Dark Theme + Watermark Background and NO attachments
 */
export const sendInquiryConfirmationEmail = async ({ name, email, module, company, message }) => {
  if (!email) return null;

  try {
    const transport = getTransporter();
    const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';

    const bodyHtml = `
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #ffffff;">Hello <b style="color: #ffffff;">${(name || 'Valued Client').toUpperCase()}</b>,</p>
      
      <p style="margin: 0 0 16px 0; color: #cbd5e1; font-size: 14.5px; line-height: 1.65;">
        Thank you for reaching out to <strong style="color: #ffffff;">SPESHWAY</strong>. We have successfully received your inquiry and our enterprise solutions team has been notified.
      </p>

      <!-- Inquiry Details Card with Emerald Accent Matching Reference -->
      <div style="background-color: #232428; background-color: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 3px solid #10b981; padding: 16px 18px; border-radius: 0 8px 8px 0; margin: 22px 0;">
        <p style="margin: 0 0 8px 0; font-size: 12.5px; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em;">
          INQUIRY DETAILS:
        </p>
        <p style="margin: 4px 0; font-size: 14px; color: #e2e8f0;"><strong style="color: #94a3b8;">Module / Solution:</strong> ${module || 'All-In-One Complete Suite'}</p>
        ${company ? `<p style="margin: 4px 0; font-size: 14px; color: #e2e8f0;"><strong style="color: #94a3b8;">Organization:</strong> ${company}</p>` : ''}
        ${message ? `<p style="margin: 8px 0 0 0; font-size: 13.5px; color: #94a3b8; font-style: italic; border-top: 1px dashed rgba(255, 255, 255, 0.12); padding-top: 6px;">"${message}"</p>` : ''}
      </div>

      <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 14.5px; line-height: 1.65;">
        One of our product specialists will review your requirements and reach out to you with tailored demo access and solution architecture details.
      </p>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.12); padding-top: 18px; margin-top: 26px;">
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
          Need urgent assistance? Reply directly to this email or contact us at <a href="mailto:${smtpUser}" style="color: #10b981; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
        </p>
      </div>
    `;

    const mailOptions = {
      from: getFromAddress(),
      sender: getFromAddress(),
      to: email,
      replyTo: smtpUser,
      subject: `Thank you for your inquiry — SPESHWAY All-In-One ERP`,
      html: renderEmailWrapper({
        title: 'SPESHWAY',
        subtitle: 'ALL-IN-ONE ERP SOLUTIONS',
        bodyHtml,
      }),
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
 * Exact match with reference design: Top Green Header, Dark Theme (#18191a), Watermark in background, and NO attachments!
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
  const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';
  const mailSubject = subject || `Update regarding your SPESHWAY inquiry (${inquiryModule || 'ERP Solution'})`;

  // Convert newlines in reply message to clean HTML paragraphs
  const formattedReply = replyMessage
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p style="margin: 0 0 10px 0; line-height: 1.65; color: #f1f5f9; font-size: 14.5px;">${line}</p>`)
    .join('');

  const bodyHtml = `
    <p style="font-size: 16px; margin: 0 0 16px 0; color: #ffffff;">Hello <b style="color: #ffffff;">${(customerName || 'Valued Client').toUpperCase()}</b>,</p>
    
    <p style="margin: 0 0 16px 0; color: #cbd5e1; font-size: 14.5px; line-height: 1.65;">
      Thank you for reaching out to <strong style="color: #ffffff;">SPESHWAY</strong>. Our enterprise solutions team has reviewed your request regarding <strong>${inquiryModule || 'our ERP solutions'}</strong> and has prepared the following response for you:
    </p>

    <!-- Response Message Card Styled Exactly Like Reference Design -->
    <div style="background-color: #232428; background-color: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 3px solid #10b981; padding: 18px 20px; border-radius: 0 8px 8px 0; margin: 22px 0;">
      <p style="margin: 0 0 12px 0; font-size: 12.5px; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em;">
        MESSAGE FROM SPESHWAY TEAM:
      </p>
      ${formattedReply}
      ${
        inquiryModule
          ? `<p style="margin: 12px 0 0 0; font-size: 12.5px; color: #94a3b8; border-top: 1px dashed rgba(255, 255, 255, 0.12); padding-top: 8px;">
               <strong style="color: #e2e8f0;">Referenced Module / Solution:</strong> ${inquiryModule}
             </p>`
          : ''
      }
    </div>

    <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 14.5px; line-height: 1.65;">
      One of our product specialists will be happy to assist you further with tailored demo access, customized module workflows, and solution architecture details.
    </p>

    <div style="border-top: 1px solid rgba(255, 255, 255, 0.12); padding-top: 18px; margin-top: 26px;">
      <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
        Need urgent assistance? Reply directly to this email or contact us at <a href="mailto:${smtpUser}" style="color: #10b981; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
      </p>
    </div>
  `;

  const mailOptions = {
    from: getFromAddress(),
    sender: getFromAddress(),
    to,
    replyTo: smtpUser,
    subject: mailSubject,
    html: renderEmailWrapper({
      title: 'SPESHWAY',
      subtitle: 'ALL-IN-ONE ERP SOLUTIONS',
      bodyHtml,
    }),
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
    const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';

    const bodyHtml = `
      <p style="margin: 0 0 14px 0; font-size: 16px; color: #ffffff;">Hello <b style="color: #ffffff;">${(customerName || 'Client').toUpperCase()}</b>,</p>
      <p style="margin: 0 0 16px 0; color: #cbd5e1; font-size: 14.5px; line-height: 1.65;">
        We have an update regarding your inquiry for <strong style="color: #ffffff;">${inquiryModule || 'SPESHWAY ERP'}</strong>:
      </p>

      <div style="background-color: #232428; background-color: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 3px solid #10b981; border-radius: 0 8px 8px 0; padding: 16px 18px; margin: 18px 0;">
        <span style="font-size: 11.5px; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.05em;">Current Status:</span>
        <p style="margin: 6px 0 0 0; font-size: 16px; font-weight: 800; color: #34d399;">${statusTitle}</p>
        ${note ? `<p style="margin: 8px 0 0 0; font-size: 13.5px; color: #cbd5e1; border-top: 1px dashed rgba(255, 255, 255, 0.12); padding-top: 6px;">${note}</p>` : ''}
      </div>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.12); padding-top: 18px; margin-top: 24px;">
        <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
          Have questions? Reply directly to this email or reach us anytime at <a href="mailto:${smtpUser}" style="color: #10b981; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
        </p>
      </div>
    `;

    const mailOptions = {
      from: getFromAddress(),
      sender: getFromAddress(),
      to,
      replyTo: smtpUser,
      subject: `Inquiry Update: ${statusTitle} — SPESHWAY All-In-One ERP`,
      html: renderEmailWrapper({
        title: 'SPESHWAY',
        subtitle: 'ALL-IN-ONE ERP SOLUTIONS',
        bodyHtml,
      }),
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
  BRAND_LOGO_URL,
  BRAND_WATERMARK_URL,
  sendInquiryConfirmationEmail,
  sendInquiryReplyEmail,
  sendInquiryStatusEmail,
  verifySmtpConnection,
};
