import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function guestbookEmailHtml({
  id,
  name,
  email,
  image,
  message,
  isAnonymous,
  createdAt,
  rawText,
}: {
  id: string;
  name: string;
  email: string | null;
  image: string | null;
  message: string;
  isAnonymous: boolean;
  createdAt: Date;
  rawText: string;
}) {
  const siteUrl = process.env.SITE_URL ?? "https://mankesh.in";
  const dateStr = createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const sansFont = "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";
  const monoFont = "'SFMono-Regular',Menlo,Consolas,'Liberation Mono',monospace";

  const avatarHtml =
    !isAnonymous && image
      ? `<img src="${escapeHtml(image)}" width="40" height="40" style="border-radius:9999px;display:block;object-fit:cover;" />`
      : `<div style="width:40px;height:40px;border-radius:9999px;background:#e7e1d3;color:#78716c;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;font-family:${sansFont};">${escapeHtml(
          name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?",
        )}</div>`;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;">
    <div style="font-family:${sansFont};max-width:480px;margin:0 auto;padding:16px;">
      <div style="border:1px solid #e7e5e4;border-radius:14px;background:#fdfbf6;padding:18px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">
          <tr>
            <td>
              <a href="${siteUrl}" style="font-family:${monoFont};font-weight:700;font-size:13px;color:#1c1917;text-decoration:none;letter-spacing:0.02em;">mankesh.in</a>
            </td>
            <td align="right">
              <span style="font-family:${monoFont};font-size:11px;color:#a8a29e;">${dateStr}</span>
            </td>
          </tr>
        </table>

        <div style="height:1px;background:#e7e5e4;margin:14px 0;"></div>

        <p style="margin:0 0 8px;font-family:${monoFont};font-size:10px;font-weight:700;letter-spacing:0.08em;color:#b45309;text-transform:uppercase;">New Guestbook Entry</p>
        <h1 style="margin:0 0 14px;font-size:19px;line-height:1.3;font-weight:700;color:#1c1917;">${escapeHtml(name)} left a note awaiting your approval.</h1>

        <div style="border-left:4px solid #d97706;background:#f3ede1;border-radius:0 8px 8px 0;padding:12px 14px;margin-bottom:16px;">
          <p style="margin:0;color:#292524;font-size:14px;white-space:pre-line;">${escapeHtml(message)}</p>
        </div>

        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
          <tr>
            <td style="vertical-align:middle;padding-right:10px;">${avatarHtml}</td>
            <td style="vertical-align:middle;">
              <div style="font-weight:600;color:#1c1917;font-size:13px;">${escapeHtml(name)}</div>
              ${email ? `<div style="font-family:${monoFont};font-size:12px;color:#b45309;">${escapeHtml(email)}</div>` : ""}
            </td>
          </tr>
        </table>

        <a href="${siteUrl}/api/admin/approve-guestbook?id=${id}" style="display:block;text-align:center;background:#b45309;color:#fdfbf6;font-weight:700;font-size:13px;padding:12px;border-radius:9px;text-decoration:none;margin-bottom:8px;">Approve this Entry</a>
        <a href="${siteUrl}/guestbook" style="display:block;text-align:center;background:#fdfbf6;border:1px solid #d6d3d1;color:#44403c;font-weight:600;font-size:13px;padding:11px;border-radius:9px;text-decoration:none;">View all Guestbook Entries</a>
      </div>

      <div style="margin-top:14px;padding-top:12px;border-top:1px solid #e7e5e4;">
        <p style="font-size:11px;color:#a8a29e;margin:0 0 6px;">Unable to see the message above? Raw text:</p>
        <p style="font-size:11px;color:#a8a29e;margin:0 0 10px;white-space:pre-line;">${escapeHtml(rawText)}</p>
        <p style="font-size:11px;color:#a8a29e;margin:0;font-family:${monoFont};">mankesh.in</p>
      </div>
    </div>
  </body>
</html>`;
}

export async function sendGuestbookNotification({
  id,
  name,
  email,
  image,
  message,
  isAnonymous,
  createdAt,
}: {
  id: string;
  name: string;
  email: string | null;
  image: string | null;
  message: string;
  isAnonymous: boolean;
  createdAt: Date;
}) {
  if (!resend || !process.env.ADMIN_EMAIL) return;

  const rawText = `${name}${email ? ` <${email}>` : ""}${isAnonymous ? " (posted anonymously)" : ""} wrote:\n\n${message}`;

  try {
    await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Guestbook <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: `New guestbook entry from ${isAnonymous ? "Anonymous" : name}`,
      text: rawText,
      html: guestbookEmailHtml({ id, name, email, image, message, isAnonymous, createdAt, rawText }),
    });
  } catch (err) {
    console.error("Failed to send guestbook notification email", err);
  }
}
