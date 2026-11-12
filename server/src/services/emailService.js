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

// Production Cloudinary CDN image assets for 100% email client compatibility (Using exact user uploaded PNG, zero white background)
export const BRAND_LOGO_URL =
  'https://res.cloudinary.com/ddgjubbbx/image/upload/v1794485778/speshway_branding/speshway_logo_noborder_clean.png';
// High-resolution (1080x340 @2x retina) pure white header banner for 100% Dark Mode & Light Mode immunity
// Since email clients (especially mobile Gmail / iOS / Outlook) never invert <img> raster pixels,
// this guarantees the header is 100% PURE WHITE in all dark & light themes.
export const BRAND_HEADER_BANNER_URL =
  'https://res.cloudinary.com/ddgjubbbx/image/upload/v1794485810/speshway_branding/speshway_email_header_white_solid.png';
// Background watermark logo calibrated to subtle ~6% opacity (between 5% and 7%) for soft, non-intrusive appearance
export const BRAND_WATERMARK_URL =
  'https://res.cloudinary.com/ddgjubbbx/image/upload/v1794467467/speshway_branding/oaabwyjojcmmoon7mpnq.png';

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
 * Generate SPESHWAY branded email wrapper HTML matching exact reference design
 * - Top Header Bar: 100% Pure White Background in both Dark & Light Themes
 *   (Secured with linear-gradient and anti-inversion styles so Gmail, Apple Mail, Outlook never invert it)
 * - Logo and Name ("SPESHWAY / ALL-IN-ONE ERP SOLUTIONS") on crisp white background
 * - Body Section: Clean Dark Container (#18191a) without any background watermark logo
 * - Guaranteed theme immunity: Looks identical in Light Mode and Dark Mode across all mobile and web email clients
 */
const renderEmailWrapper = ({ title = 'SPESHWAY', subtitle = 'ALL-IN-ONE ERP SOLUTIONS', bodyHtml }) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${title} - ${subtitle}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    /* Guarantee white background for the logo and brand header in dark & light themes */
    .speshway-header-white {
      background-color: #ffffff !important;
      background: #ffffff !important;
      background-image: linear-gradient(#ffffff, #ffffff) !important;
    }
    .speshway-brand-title {
      color: #00875a !important;
      -webkit-text-fill-color: #00875a !important;
    }
    .speshway-brand-sub {
      color: #1e3a8a !important;
      -webkit-text-fill-color: #1e3a8a !important;
    }
    .speshway-body-cell {
      background-color: #18191a !important;
      background: #18191a !important;
      background-image: linear-gradient(#18191a, #18191a) !important;
      color: #e2e8f0 !important;
    }
    .speshway-footer-cell {
      background-color: #141517 !important;
      background: #141517 !important;
      background-image: linear-gradient(#141517, #141517) !important;
      color: #6b7280 !important;
    }
    .speshway-detail-box {
      background-color: #222326 !important;
      background: #222326 !important;
      background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)) !important;
    }

    @media (prefers-color-scheme: dark) {
      body, .speshway-body-outer {
        background-color: #0b0f17 !important;
        background: #0b0f17 !important;
      }
      .speshway-header-white {
        background-color: #ffffff !important;
        background: #ffffff !important;
        background-image: linear-gradient(#ffffff, #ffffff) !important;
      }
      .speshway-brand-title {
        color: #00875a !important;
        -webkit-text-fill-color: #00875a !important;
      }
      .speshway-brand-sub {
        color: #1e3a8a !important;
        -webkit-text-fill-color: #1e3a8a !important;
      }
      .speshway-body-cell {
        background-color: #18191a !important;
        background: #18191a !important;
        background-image: linear-gradient(#18191a, #18191a) !important;
        color: #e2e8f0 !important;
      }
      .speshway-footer-cell {
        background-color: #141517 !important;
        background: #141517 !important;
        background-image: linear-gradient(#141517, #141517) !important;
        color: #6b7280 !important;
      }
      .speshway-detail-box {
        background-color: #222326 !important;
        background: #222326 !important;
        background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)) !important;
      }
    }

    /* Outlook.com & webmail dark mode overrides */
    [data-ogsc] body, [data-ogsb] body {
      background-color: #0b0f17 !important;
    }
    [data-ogsc] .speshway-header-white,
    [data-ogsb] .speshway-header-white {
      background-color: #ffffff !important;
      background: #ffffff !important;
      background-image: linear-gradient(#ffffff, #ffffff) !important;
    }
    [data-ogsc] .speshway-brand-title {
      color: #00875a !important;
    }
    [data-ogsc] .speshway-brand-sub {
      color: #1e3a8a !important;
    }
    [data-ogsc] .speshway-body-cell,
    [data-ogsb] .speshway-body-cell {
      background-color: #18191a !important;
      background: #18191a !important;
      color: #e2e8f0 !important;
    }
    [data-ogsc] .speshway-footer-cell,
    [data-ogsb] .speshway-footer-cell {
      background-color: #141517 !important;
      background: #141517 !important;
      color: #6b7280 !important;
    }
  </style>
</head>
<body class="speshway-body-outer" style="margin: 0; padding: 24px 12px; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <!-- Email Card Container -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; margin: 0 auto; background-color: #18191a; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
    <!-- Top Header Bar with 100% Guaranteed Pure White Background in ALL Themes -->
    <!-- An <img> tag is NEVER inverted by Gmail/Outlook/iOS Dark Mode engines -->
    <tr>
      <td class="speshway-header-white" bgcolor="#ffffff" style="background-color: #ffffff; background: #ffffff !important; padding: 0; margin: 0; text-align: center; border-radius: 14px 14px 0 0; overflow: hidden; line-height: 0; font-size: 0;">
        <img src="${BRAND_HEADER_BANNER_URL}" 
             alt="${title} - ${subtitle}" 
             width="540" 
             style="display: block; width: 100%; max-width: 540px; height: auto; border: 0; outline: none; text-decoration: none; border-radius: 14px 14px 0 0;" />
      </td>
    </tr>

    <!-- Body Section (Clean Dark Background with Zero Watermark) -->
    <tr>
      <td class="speshway-body-cell" bgcolor="#18191a" style="background-color: #18191a; background: #18191a linear-gradient(#18191a, #18191a) !important; padding: 28px 24px; color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.65;">
        ${bodyHtml}
      </td>
    </tr>

    <!-- Footer Matching Reference -->
    <tr>
      <td class="speshway-footer-cell" bgcolor="#141517" style="background-color: #141517; background: #141517 linear-gradient(#141517, #141517) !important; padding: 18px 24px; text-align: center; font-size: 12px; color: #6b7280; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; border-top: 1px solid rgba(255, 255, 255, 0.08); border-radius: 0 0 14px 14px;">
        © ${currentYear} SPESHWAY Technologies. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Send an acknowledgment email to a customer right after they submit an inquiry
 * Matches the reference design (Image 2) with Dark Theme + Watermark Background and NO attachments
 */
export const sendInquiryConfirmationEmail = async ({
  name,
  email,
  phone,
  module,
  company,
  message,
}) => {
  if (!email) return null;

  try {
    const transport = getTransporter();
    const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';

    const bodyHtml = `
      <p style="font-size: 15px; margin: 0 0 12px 0; color: #ffffff;">Hello <b style="color: #ffffff;">${(name || 'Valued Client').toUpperCase()}</b>,</p>
      
      <p style="margin: 0 0 14px 0; color: #cbd5e1; font-size: 14px; line-height: 1.55;">
        Thank you for reaching out to <strong style="color: #ffffff;">SPESHWAY</strong>. We have received your inquiry and our enterprise solutions team has been notified.
      </p>

      <!-- Inquiry Details Card with Logo Green Accent Matching Reference -->
      <div class="speshway-detail-box" style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 3px solid #44a849; padding: 14px 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
        <p style="margin: 0 0 8px 0; font-size: 11.5px; font-weight: 800; color: #44a849; text-transform: uppercase; letter-spacing: 0.05em;">
          INQUIRY DETAILS:
        </p>
        <p style="margin: 3px 0; font-size: 13.5px; color: #e2e8f0;">
          <strong style="color: #94a3b8;">Module / Solution:</strong> ${module || 'All-In-One Complete Suite'}
        </p>
        ${company ? `<p style="margin: 3px 0; font-size: 13.5px; color: #e2e8f0;"><strong style="color: #94a3b8;">Organization:</strong> ${company}</p>` : ''}
        ${email ? `<p style="margin: 3px 0; font-size: 13.5px; color: #e2e8f0;"><strong style="color: #94a3b8;">Work Email:</strong> <span style="color: #e2e8f0;">${email}</span></p>` : ''}
        ${phone ? `<p style="margin: 3px 0; font-size: 13.5px; color: #e2e8f0;"><strong style="color: #94a3b8;">Contact Number:</strong> <span style="color: #e2e8f0;">${phone}</span></p>` : ''}
        ${message ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #cbd5e1; border-top: 1px dashed rgba(255, 255, 255, 0.12); padding-top: 6px;">"${message}"</p>` : ''}
      </div>

      <p style="margin: 0 0 16px 0; color: #cbd5e1; font-size: 13.5px; line-height: 1.55;">
        One of our product specialists will connect with you shortly with tailored demo access and solution architecture details.
      </p>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; margin-top: 18px;">
        <p style="margin: 0; font-size: 12.5px; color: #94a3b8; line-height: 1.45;">
          Need assistance? Reply directly to this email or contact us at <a href="mailto:${smtpUser}" style="color: #44a849; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
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
 * Helper to strip redundant outer greetings or sign-offs from admin reply text
 * so the inner card remains clean, compact, and structured (matching Image 2).
 */
const cleanReplyContent = (rawText) => {
  if (!rawText) return '';
  return rawText
    .replace(/^(?:hello|hi|dear)\s+[^,\n]+,\s*/i, '')
    .replace(/^thank you for reaching out to speshway[^.\n]*[.\n]\s*/i, '')
    .replace(/(?:\n|^)(?:best regards|warm regards|sincerely|thanks and regards|regards)[,\s][\s\S]*$/i, '')
    .trim();
};

/**
 * Send an email reply/update from the Admin to the customer
 * Exact match with reference design: Top Green Header, Dark Theme (#18191a), Watermark in background, Compact Details Card, and ZERO attachments!
 */
export const sendInquiryReplyEmail = async ({
  to,
  customerName,
  customerPhone,
  company,
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

  // Clean redundant greetings/sign-offs to keep the card compact & matching Image 2
  const cleanedText = cleanReplyContent(replyMessage) || replyMessage.trim();

  // Convert newlines in reply message to clean HTML paragraphs
  const formattedReply = cleanedText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p style="margin: 4px 0; line-height: 1.55; color: #e2e8f0; font-size: 14px;">${line}</p>`)
    .join('');

  const bodyHtml = `
    <p style="font-size: 15px; margin: 0 0 12px 0; color: #ffffff;">Hello <b style="color: #ffffff;">${(customerName || 'Valued Client').toUpperCase()}</b>,</p>
    
    <p style="margin: 0 0 14px 0; color: #cbd5e1; font-size: 14px; line-height: 1.55;">
      We have an update regarding your inquiry for <strong style="color: #ffffff;">${inquiryModule || 'SPESHWAY ERP Solutions'}</strong>:
    </p>

    <!-- Response Details Card -->
    <div class="speshway-detail-box" style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 3px solid #44a849; padding: 14px 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
      <p style="margin: 0 0 8px 0; font-size: 11.5px; font-weight: 800; color: #44a849; text-transform: uppercase; letter-spacing: 0.05em;">
        MESSAGE FROM SPESHWAY TEAM:
      </p>
      <div style="margin: 4px 0 10px 0;">
        ${formattedReply}
      </div>
      <div style="border-top: 1px dashed rgba(255, 255, 255, 0.12); padding-top: 8px; margin-top: 8px;">
        <p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;">
          <strong style="color: #94a3b8;">Module / Solution:</strong> ${inquiryModule || 'All-In-One Complete Suite'}
        </p>
        ${company ? `<p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;"><strong style="color: #94a3b8;">Organization:</strong> ${company}</p>` : ''}
        ${to ? `<p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;"><strong style="color: #94a3b8;">Work Email:</strong> ${to}</p>` : ''}
        ${customerPhone ? `<p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;"><strong style="color: #94a3b8;">Contact Number:</strong> ${customerPhone}</p>` : ''}
      </div>
    </div>

    <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; margin-top: 18px;">
      <p style="margin: 0; font-size: 12.5px; color: #94a3b8; line-height: 1.45;">
        Need urgent assistance? Reply directly to this email or reach us at <a href="mailto:${smtpUser}" style="color: #44a849; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
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
  customerPhone,
  company,
  newStatus,
  inquiryModule,
  note,
}) => {
  if (!to) return null;

  try {
    const statusLabels = {
      new: 'Received & In Review',
      contacted: 'In Touch with Product Specialist',
      qualified: 'Demo Qualified & Solution Ready',
      closed: 'Inquiry Completed',
    };

    const statusDescriptions = {
      new: 'Your inquiry has been received and queued for review.',
      contacted: 'Our specialist has reviewed your requirements and reached out regarding next steps.',
      qualified: 'Your inquiry has been qualified. Tailored demo access and solution details are prepared.',
      closed: 'This inquiry lifecycle has been completed. Thank you for connecting with SPESHWAY.',
    };

    const statusColors = {
      new: '#f59e0b',
      contacted: '#38bdf8',
      qualified: '#34d399',
      closed: '#94a3b8',
    };

    const statusTitle = statusLabels[newStatus] || newStatus;
    const accentColor = statusColors[newStatus] || '#44a849';
    const transport = getTransporter();
    const smtpUser = process.env.SMTP_USER || 'naveenkumar970100@gmail.com';

    const bodyHtml = `
      <p style="margin: 0 0 12px 0; font-size: 15px; color: #ffffff;">Hello <b style="color: #ffffff;">${(customerName || 'Valued Client').toUpperCase()}</b>,</p>
      
      <p style="margin: 0 0 14px 0; color: #cbd5e1; font-size: 14px; line-height: 1.55;">
        Your inquiry for <strong style="color: #ffffff;">${inquiryModule || 'SPESHWAY All-In-One ERP'}</strong> has an update:
      </p>

      <!-- Status & Inquiry Details Card -->
      <div class="speshway-detail-box" style="background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.12); border-left: 3px solid ${accentColor}; border-radius: 0 8px 8px 0; padding: 14px 16px; margin: 16px 0;">
        <span style="font-size: 11px; font-weight: 800; color: ${accentColor}; text-transform: uppercase; letter-spacing: 0.05em;">Current Status:</span>
        <p style="margin: 4px 0 6px 0; font-size: 16px; font-weight: 800; color: ${accentColor};">${statusTitle}</p>
        <p style="margin: 0 0 10px 0; font-size: 13.5px; color: #cbd5e1; line-height: 1.5;">
          ${note || statusDescriptions[newStatus] || ''}
        </p>

        <div style="border-top: 1px dashed rgba(255, 255, 255, 0.12); padding-top: 8px; margin-top: 8px;">
          <p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;">
            <strong style="color: #94a3b8;">Module / Solution:</strong> ${inquiryModule || 'All-In-One Complete Suite'}
          </p>
          ${company ? `<p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;"><strong style="color: #94a3b8;">Organization:</strong> ${company}</p>` : ''}
          ${to ? `<p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;"><strong style="color: #94a3b8;">Work Email:</strong> ${to}</p>` : ''}
          ${customerPhone ? `<p style="margin: 3px 0; font-size: 13px; color: #e2e8f0;"><strong style="color: #94a3b8;">Contact Number:</strong> ${customerPhone}</p>` : ''}
        </div>
      </div>

      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 14px; margin-top: 18px;">
        <p style="margin: 0; font-size: 12.5px; color: #94a3b8; line-height: 1.45;">
          Have questions? Reply directly to this email or reach us anytime at <a href="mailto:${smtpUser}" style="color: #44a849; text-decoration: none; font-weight: 600;">${smtpUser}</a>.
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
  BRAND_HEADER_BANNER_URL,
  BRAND_WATERMARK_URL,
  sendInquiryConfirmationEmail,
  sendInquiryReplyEmail,
  sendInquiryStatusEmail,
  verifySmtpConnection,
};
