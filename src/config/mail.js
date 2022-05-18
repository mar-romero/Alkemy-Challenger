const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const nodemailerSendgrid = require("nodemailer-sendgrid");

const createTrans = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey:process.env.apiKey,
    })
  );
  return transport;
};

const sendMail = async (email) => {
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from: "romero-ar@hotmail.com",
    to: email,
    subject: "Registro",
    text: "Registro con exito",
  });
  return;
};

exports.sendMail = (email) => sendMail(email);
