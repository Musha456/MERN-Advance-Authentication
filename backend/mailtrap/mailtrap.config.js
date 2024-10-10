import dotenv from 'dotenv';
import { MailtrapClient } from "mailtrap";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Syed Mushahid",
};

// const recipients = [
//   {
//     email: "syedmushahidhussain456@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);