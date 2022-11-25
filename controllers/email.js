const send = async (req, res, next) => {
  return res.status(200).send(`EMAIL SENT`);
};

module.exports = send;
