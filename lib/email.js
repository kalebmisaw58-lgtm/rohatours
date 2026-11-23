import nodemailer from 'nodemailer';

function getTransporter() {
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        return null;
    }

    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
}

export async function sendEmail({ to, subject, html, text }) {
    const transporter = getTransporter();
    const from = process.env.EMAIL_FROM || '"Iconic Ethiopia Tours" <expeditions@rohatours.com>';

    if (!transporter) {
        console.log(`[Email Mock - SMTP not configured]
To: ${to}
Subject: ${subject}
Preview: ${text || subject}`);
        return { success: true, simulated: true };
    }

    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            text,
            html,
        });
        return { success: true, messageId: info.messageId };
    } catch (err) {
        console.error('Email sending error:', err);
        return { success: false, error: err.message };
    }
}

export async function sendBookingConfirmation(booking) {
    const subject = `Your Iconic Ethiopia Tours Expedition Request: ${booking.package}`;
    const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FDFAF4; border: 1px solid #E0D8C8; border-radius: 16px; overflow: hidden;">
        <div style="background-color: #1B3022; padding: 32px 24px; text-align: center;">
            <h1 style="color: #C5A059; margin: 0; font-size: 26px; letter-spacing: 2px;">ICONIC ETHIOPIA TOURS</h1>
            <p style="color: #FDFAF4; margin: 8px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Land of Origins Expeditions</p>
        </div>
        <div style="padding: 32px 24px; color: #1B3022;">
            <h2 style="font-size: 20px; margin-top: 0;">Dear ${booking.customerName},</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #475569;">
                Thank you for choosing Iconic Ethiopia Tours. We have received your booking inquiry for <strong>${booking.package}</strong>.
            </p>
            <div style="background: white; border: 1px solid #E0D8C8; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #C5A059; letter-spacing: 1px;">Expedition Details</h3>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Package:</strong> ${booking.package}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Travel Date:</strong> ${booking.travelDate || 'Flexible'}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Travelers:</strong> ${booking.travelerCount}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>Current Status:</strong> <span style="background: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 999px; font-weight: bold; font-size: 12px; text-transform: uppercase;">Pending Review</span></p>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                Our lead guide <strong>Mekuanent</strong> and our expedition team are reviewing your itinerary and will confirm within 24 hours.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #475569;">
                Need to make immediate adjustments? Contact us directly:
            </p>
            <div style="margin: 20px 0;">
                <a href="https://wa.me/251963575717" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold; font-size: 14px;">
                    Chat with us on WhatsApp
                </a>
            </div>
            <hr style="border: none; border-top: 1px solid #E0D8C8; margin: 24px 0;" />
            <p style="font-size: 12px; color: #94A3B8; text-align: center; margin: 0;">
                Iconic Ethiopia Tours • Addis Ababa, Ethiopia • expeditions@rohatours.com
            </p>
        </div>
    </div>
    `;

    return sendEmail({
        to: booking.customerEmail,
        subject,
        html,
        text: `Thank you for your booking inquiry for ${booking.package}. We will contact you within 24 hours. Iconic Ethiopia Tours Team.`
    });
}

export async function sendStaffBookingAlert(booking) {
    const staffEmail = process.env.STAFF_EMAIL || 'expeditions@rohatours.com';
    const subject = `[New Booking Alert] ${booking.customerName} - ${booking.package}`;
    const html = `
    <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #1B3022;">New Booking Request Received</h2>
        <ul>
            <li><strong>Customer:</strong> ${booking.customerName}</li>
            <li><strong>Email:</strong> ${booking.customerEmail}</li>
            <li><strong>Phone:</strong> ${booking.customerPhone || 'Not provided'}</li>
            <li><strong>Package:</strong> ${booking.package}</li>
            <li><strong>Travel Date:</strong> ${booking.travelDate || 'Flexible'}</li>
            <li><strong>Travelers:</strong> ${booking.travelerCount}</li>
            <li><strong>Submitted On:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p><a href="https://rohatours.vercel.app/staff" style="background: #1B3022; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none;">Open Staff Dashboard</a></p>
    </div>
    `;

    return sendEmail({
        to: staffEmail,
        subject,
        html,
        text: `New booking from ${booking.customerName} (${booking.customerEmail}) for ${booking.package}.`
    });
}

export async function sendBookingStatusUpdate(booking, status) {
    const isConfirmed = status === 'confirmed';
    const subject = isConfirmed
        ? `Confirmed: Your Iconic Ethiopia Tours Expedition — ${booking.package}`
        : `Update on Your Iconic Ethiopia Tours Booking — ${booking.package}`;

    const message = isConfirmed
        ? `We are delighted to confirm your private expedition for <strong>${booking.package}</strong>. Our team is finalizing your logistics, 4x4 transport, and guide assignment.`
        : `Your booking status for <strong>${booking.package}</strong> has been updated to <em>${status}</em>. Please let us know if your travel plans change or if we can assist with alternative dates.`;

    const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FDFAF4; border: 1px solid #E0D8C8; border-radius: 16px; overflow: hidden; padding: 24px;">
        <h2 style="color: #1B3022;">Hello ${booking.customerName},</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">${message}</p>
        <div style="background: white; border: 1px solid #E0D8C8; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <p style="margin: 4px 0;"><strong>Package:</strong> ${booking.package}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> <span style="text-transform: uppercase; font-weight: bold; color: ${isConfirmed ? '#15803d' : '#b91c1c'}">${status}</span></p>
        </div>
        <p>If you have any questions, reply directly to this email or message us on WhatsApp at +251 963 575 717.</p>
        <p style="color: #64748B; font-size: 12px; margin-top: 30px;">Iconic Ethiopia Tours Team • Land of Origins</p>
    </div>
    `;

    return sendEmail({
        to: booking.customerEmail,
        subject,
        html,
        text: `Your booking for ${booking.package} is now ${status}. Contact +251963575717 for questions.`
    });
}

