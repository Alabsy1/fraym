import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "thisisfraym@gmail.com";
const FROM = "onboarding@resend.dev";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, phone, company, industry, system, services, brief } =
      body as {
        name?: string;
        email?: string;
        phone?: string;
        company?: string;
        industry?: string;
        system?: string;
        services?: string[];
        brief?: string;
      };

    if (!name || !email || !brief) {
      return NextResponse.json(
        { error: "Name, email, and case details are required." },
        { status: 400 }
      );
    }

    const serviceList =
      services && services.length > 0 ? services.join(", ") : "None";

    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="margin: 0 0 4px; font-size: 18px;">New Case File Inquiry</h2>
        <p style="margin: 0 0 20px; font-size: 13px; color: #666;">Fraym Studio — Contact Form</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #888; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;">${phone || "Not specified"}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Company</td><td style="padding: 8px 0;">${company || "Not specified"}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Industry</td><td style="padding: 8px 0;">${industry || "Not specified"}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Target System</td><td style="padding: 8px 0;">${system || "Not specified"}</td></tr>
          <tr><td style="padding: 8px 0; color: #888;">Services</td><td style="padding: 8px 0;">${serviceList}</td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f5f5f0; border-left: 3px solid #2d5016; font-size: 14px; line-height: 1.6;">
          <strong style="display: block; margin-bottom: 6px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">Case Details</strong>
          ${brief}
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Case Inquiry — ${name}`,
      html,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
