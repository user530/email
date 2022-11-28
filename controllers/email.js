const sgMail = require(`@sendgrid/mail`);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { StatusCodes } = require(`http-status-codes`);
const { BadRequestError } = require(`../errors`);

const send = async (req, res, next) => {
  const { name, email } = req.user;

  const msg = {
    to: email,
    from: process.env.MY_EMAIL,
    subject: `Testing EmailAPI with SendGrid!`,
    text: `This is message in plain text...`,
    html: `<h2>This is message in HTML form.</h2><p>Here should be some content...</p>`,
  };

  const info = await sgMail.send(msg, false, (mailErr, mailRes) => {
    if (!mailErr) return { msg: `Message sent!`, mailRes };

    return null;
  });

  if (!info) throw new BadRequestError(`Failed to deliver the email!`);

  return res.status(StatusCodes.OK).json(info);
};

module.exports = send;
