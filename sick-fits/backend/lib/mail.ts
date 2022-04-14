import { createTransport } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string) {
  return `<div style="
    border:1px solid black;
    padding:20px;
    fond-family: sans-serif;
    line-heigh: 2;
    font-size: 20px
    ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>- R</p>
    </div>
    `;
}

export async function SendPasswordResetEmail(
  resetToken,
  to: string
): Promise<void> {
  const info = await transport.sendMail({
    to,
    from: 'test@example',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your password reset token!
        <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>`),
  });
  console.log(info);
}
