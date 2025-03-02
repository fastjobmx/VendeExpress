const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Configurar el transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'walylosada@gmail.com',
    pass: 'pfxn ihee okge tcgy'  // Usa la contraseña de aplicación generada
  }
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, phone, plan, message } = req.body;

    const mailOptions = {
      from: 'walylosada@gmail.com',
      to: 'walylosada@gmail.com',
      subject: `Nuevo mensaje de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone}
        Plan de interés: ${plan}
        Mensaje: ${message}
      `
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error al enviar el correo');
      } else {
        return res.status(200).send('Correo enviado exitosamente');
      }
    });
  } else {
    res.status(405).send('Método no permitido');
  }
};
