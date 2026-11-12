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

// Local asset paths for CID inline fallback
const localLogoPath = path.resolve(__dirname, '../assets/speshway-logo.png');
const localWatermarkPath = path.resolve(__dirname, '../assets/speshway-watermark.png');

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
 * Common attachments helper (CID inline attachments)
 */
const getBrandAttachments = () => {
  const attachments = [];
  if (fs.existsSync(localLogoPath)) {
    attachments.push({
      filename: 'speshway-logo.png',
      path: localLogoPath,
      cid: 'speshway-logo',
      contentDisposition: 'inline',
    });
  }
  if (fs.existsSync(localWatermarkPath)) {
    attachments.push({
      filename: 'speshway-watermark.png',
      path: localWatermarkPath,
      cid: 'speshway-watermark',
      contentDisposition: 'inline',
    });
  }
  return attachments;
};

/**
 * Generate standard SPESHWAY branded email wrapper HTML
 */
const renderEmailWrapper = ({ title = 'SPESHWAY', subtitle = 'ALL-IN-ONE ERP SOLUTIONS', bodyHtml }) => {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${title} - ${subtitle}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Email Card Container -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 18px rgba(0,0,0,0.06);">
    <!-- Top Green Header Bar Matching Brand Logo Color -->
    <tr>
      <td style="background: #047857; background: linear-gradient(135deg, #047857 0%, #065f46 100%); padding: 22px 20px; text-align: center;">
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
      <td style="background-color: #ffffff; background-image: url('${BRAND_WATERMARK_URL}'); background-repeat: no-repeat; background-position: center center; background-size: 280px auto; padding: 32px 26px; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65;">
        ${bodyHtml}
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 18px 24px; text-align: center; font-size: 12px; color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; border-top: 1px solid #e2e8f0;">
        © ${currentYear} SPESHWAY Technologies. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

/**
 * Send an acknowledgment email to a customer right after they submit an inquiry
 */
export const sendInquiryConfirmationEmail = async ({ name, email, module, company, message }) => {
  if (!email) return null;

  try {
    const transport = getTransporter();
    const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';

    const bodyHtml = `
      <p style="font-size: 16px; margin: 0 0 16px 0; color: #0f172a;">Hello <b>${name || 'Valued Client'}</b>,</p>
      
      <p style="margin: 0 0 16px 0; color: #334155; font-size: 14.5px;">
        Thank you for reaching out to <b>SPESHWAY</b>. We have successfully received your inquiry and our enterprise solutions team has been notified.
      </p>

      <!-- Inquiry Details Card with Emerald Accent -->
      <div style="background-color: #f8fafc; background-color: rgba(248, 250, 252, 0.94); border: 1px solid #e2e8f0; border-left: 4px solid #047857; padding: 16px 18px; border-radius: 0 8px 8px 0; margin: 22px 0;">
        <p style="margin: 0 0 8px 0; font-size: 12.5px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">
          INQUIRY DETAILS:
        </p>
        <p style="margin: 3px 0; font-size: 14px; color: #334155;"><b>Module / Solution:</b> ${module || 'All-In-One Complete Suite'}</p>
        ${company ? `<p style="margin: 3px 0; font-size: 14px; color: #334155;"><b>Organization:</b> ${company}</p>` : ''}
        ${message ? `<p style="margin: 8px 0 0 0; font-size: 13.5px; color: #64748b; font-style: italic; border-top: 1px dashed #cbd5e1; padding-top: 6px;">"${message}"</p>` : ''}
      </div>

      <p style="margin: 0 0 20px 0; color: #334155; font-size: 14.5px;">
        One of our product specialists will review your requirements and reach out to you with tailored demo access and solution architecture details.
      </p>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; margin-top: 26px;">
        <p style="margin: 0; font-size: 13px; color: #64748b;">
          Need urgent assistance? Reply directly to this email or contact us at <a href="mailto:${smtpUser}" style="color: #047857; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
        </p>
      </div>
    `;

    const mailOptions = {
      from: getFromAddress(),
      to: email,
      subject: `Thank you for your inquiry — SPESHWAY All-In-One ERP`,
      html: renderEmailWrapper({
        title: 'SPESHWAY',
        subtitle: 'ALL-IN-ONE ERP SOLUTIONS',
        bodyHtml,
      }),
      attachments: getBrandAttachments(),
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
  const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';
  const mailSubject = subject || `Update regarding your SPESHWAY inquiry (${inquiryModule || 'ERP Solution'})`;

  // Convert newlines in reply message to HTML paragraphs
  const formattedReply = replyMessage
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p style="margin: 0 0 10px 0; line-height: 1.6;">${line}</p>`)
    .join('');

  const bodyHtml = `
    <p style="font-size: 15px; margin: 0 0 16px 0; color: #0f172a;">Dear <b>${customerName || 'Client'}</b>,</p>
    
    <div style="background-color: #f8fafc; background-color: rgba(248, 250, 252, 0.94); border: 1px solid #e2e8f0; border-left: 4px solid #047857; padding: 18px 20px; border-radius: 6px; margin: 20px 0; color: #1e293b; font-size: 14.5px;">
      ${formattedReply}
    </div>

    ${
      inquiryModule
        ? `<p style="font-size: 12.5px; color: #64748b; margin: 12px 0;"><b>Referenced Service / Module:</b> ${inquiryModule}</p>`
        : ''
    }

    <p style="margin: 20px 0 0 0; color: #334155; font-size: 14.5px;">
      Best regards,<br />
      <b>${adminName || 'SPESHWAY Enterprise Support Team'}</b><br />
      <span style="font-size: 12.5px; color: #64748b;">SPESHWAY All-In-One ERP</span>
    </p>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; font-size: 12.5px; color: #64748b;">
      You can reply directly to this email to continue our conversation.
    </div>
  `;

  const mailOptions = {
    from: getFromAddress(),
    to,
    replyTo: smtpUser,
    subject: mailSubject,
    html: renderEmailWrapper({
      title: 'SPESHWAY',
      subtitle: 'SUPPORT & SOLUTIONS TEAM',
      bodyHtml,
    }),
    attachments: getBrandAttachments(),
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
      <p style="margin: 0 0 14px 0; font-size: 15px; color: #0f172a;">Hello <b>${customerName || 'Client'}</b>,</p>
      <p style="margin: 0 0 16px 0; color: #334155; font-size: 14.5px;">
        We have an update regarding your inquiry for <b>${inquiryModule || 'SPESHWAY ERP'}</b>:
      </p>

      <div style="background-color: #ecfdf5; background-color: rgba(236, 253, 245, 0.94); border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 16px 18px; margin: 18px 0;">
        <span style="font-size: 11.5px; font-weight: 800; color: #047857; text-transform: uppercase; letter-spacing: 0.05em;">Current Status:</span>
        <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 800; color: #065f46;">${statusTitle}</p>
        ${note ? `<p style="margin: 8px 0 0 0; font-size: 13.5px; color: #334155; border-top: 1px dashed #a7f3d0; padding-top: 6px;">${note}</p>` : ''}
      </div>

      <p style="margin: 18px 0 0 0; font-size: 13.5px; color: #64748b;">
        Have questions? Reply directly to this email or reach us anytime at <a href="mailto:${smtpUser}" style="color: #047857; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
      </p>
    `;

    const mailOptions = {
      from: getFromAddress(),
      to,
      subject: `Inquiry Update: ${statusTitle} — SPESHWAY All-In-One ERP`,
      html: renderEmailWrapper({
        title: 'SPESHWAY',
        subtitle: 'INQUIRY STATUS UPDATE',
        bodyHtml,
      }),
      attachments: getBrandAttachments(),
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
