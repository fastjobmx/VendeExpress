const nodemailer = require('nodemailer');

// Configurar el transportador de Nodemailer usando variables de entorno
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Variable de entorno para el correo
    pass: process.env.EMAIL_PASS, // Variable de entorno para la contraseña
  },
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, phone, plan, message } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER, // Usamos la misma variable de entorno
      to: process.env.EMAIL_USER,   // El correo de destino también puede ser una variable si lo deseas
      subject: `Nuevo mensaje de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Teléfono: ${phone}
        Plan de interés: ${plan}
        Mensaje: ${message}
      `,
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