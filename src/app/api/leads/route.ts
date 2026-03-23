import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT = "uribs3@gmail.com";

const USER_TYPE_LABELS: Record<string, string> = {
  producer: "Event Producer",
  vendor:   "Service Provider",
  party:    "Party-goer",
};

export async function POST(req: NextRequest) {
  try {
    const { email, userType } = await req.json() as {
      email: string;
      userType: string | null;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── SMTP transport ────────────────────────────────────────────────────────
    // Requires two environment variables in .env.local:
    //   SMTP_USER  — the Gmail address used to send (e.g. yourapp@gmail.com)
    //   SMTP_PASS  — a Gmail App Password (not your regular password)
    //                Generate at: myaccount.google.com → Security → App Passwords
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const roleLabel = userType ? USER_TYPE_LABELS[userType] ?? userType : "Not specified";

    await transporter.sendMail({
      from:    `"PIC Platform" <${process.env.SMTP_USER}>`,
      to:      RECIPIENT,
      subject: `PIC - New Lead, ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;border-radius:14px;overflow:hidden;border:1px solid #bfdbfe">
          <!-- Header -->
          <div style="background:#031760;padding:28px 32px">
            <p style="margin:0;color:#93c5fd;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600">PIC · Parties &amp; Events Platform</p>
            <h1 style="margin:10px 0 0;color:#ffffff;font-size:22px;font-weight:700">New Lead</h1>
          </div>
          <!-- Body -->
          <div style="padding:32px;background:#f0f7ff">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:10px 0;color:#1e40af;font-size:13px;font-weight:600;width:110px;text-transform:uppercase;letter-spacing:0.05em">Email</td>
                <td style="padding:10px 0">
                  <span style="background:#dbeafe;color:#1e3a8a;font-weight:700;font-size:15px;padding:4px 12px;border-radius:6px">${email}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#1e40af;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Role</td>
                <td style="padding:10px 0">
                  <span style="background:#dbeafe;color:#1e3a8a;font-weight:700;font-size:15px;padding:4px 12px;border-radius:6px">${roleLabel}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#1e40af;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em">Time</td>
                <td style="padding:10px 0;color:#1e3a8a;font-size:14px">${new Date().toLocaleString("en-IL", { timeZone: "Asia/Jerusalem" })}</td>
              </tr>
            </table>
          </div>
          <!-- Footer -->
          <div style="padding:16px 32px;background:#1e3a8a">
            <p style="margin:0;color:#93c5fd;font-size:11px">PIC · Parties &amp; Events Platform · Copyright 2026 ©</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads/route] email error:", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
