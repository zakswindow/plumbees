import "server-only";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

let client: SESv2Client | undefined;
const ses = () => (client ??= new SESv2Client({ region: process.env.AWS_REGION || "eu-west-2" }));

type Message = { to: string[]; subject: string; html: string; text: string; replyTo?: string[] };

export async function sendEmail(m: Message): Promise<void> {
  const from = process.env.SES_FROM;
  if (!from) {
    if (process.env.NODE_ENV === "production") throw new Error("SES_FROM is not configured");
    console.info(`[email:dev] to=${m.to.join(",")} subject="${m.subject}"`);
    return;
  }
  await ses().send(
    new SendEmailCommand({
      FromEmailAddress: from,
      Destination: { ToAddresses: m.to },
      ReplyToAddresses: m.replyTo,
      Content: {
        Simple: {
          Subject: { Data: m.subject, Charset: "UTF-8" },
          Body: {
            Html: { Data: m.html, Charset: "UTF-8" },
            Text: { Data: m.text, Charset: "UTF-8" },
          },
        },
      },
    }),
  );
}
