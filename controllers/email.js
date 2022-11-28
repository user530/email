const nodemailer = require(`nodemailer`);

const send = async (req, res, next) => {
  const { name, email } = req.user;

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"EmailAPI" <foo@bar.com>',
    to: `${email}`,
    subject: `Hello, ${name}✔`,
    text: `Hello, ${name}! This is a plain text of the message`,
    html: `<h2>Hello, ${name}!</h2><p>This is an HTML message</p>`,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json(info);
};

module.exports = send;
