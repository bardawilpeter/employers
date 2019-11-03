// Imports
import * as nodemailer from "nodemailer";

const credentials = {
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
const transporter = nodemailer.createTransport(credentials);

export function send(to: any, emailContent: any): Promise<any> {
  const contacts = {
    from: process.env.SMTP_EMAIL,
    to
  };

  const email = { ...emailContent, ...contacts };

  try{
    return transporter.sendMail(email);
  }
  catch(err){
    console.log(err);
  }
}
