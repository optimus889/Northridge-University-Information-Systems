import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { env } from "../../config/env.js";

const sesClient = new SESClient({ region: env.aws.region });

export async function sendEmailThroughAws({ from, to, subject, body }) {
  if (!env.aws.enabled) {
    return {
      success: true,
      message: "Mock mode: email message was prepared. Enable AWS to send through Amazon SES or WorkMail."
    };
  }

  const command = new SendEmailCommand({
    Source: from || env.aws.sesFromEmail,
    Destination: { ToAddresses: [to] },
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: { Text: { Data: body, Charset: "UTF-8" } }
    }
  });

  await sesClient.send(command);
  return { success: true, message: "Email sent through Amazon SES." };
}
