const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Habilitar CORS
app.use(cors());

// Middleware para parsear los datos JSON
app.use(bodyParser.json());

// Crear un transportador de Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'walylosada@gmail.com',  // Usa tu correo de Gmail
    pass: 'pfxn ihee okge tcgy'   // Usa la contraseña de aplicación generada
  }
});

// Ruta para recibir el formulario de contacto y enviar el correo
app.post('/send-contact-email', (req, res) => {
  const { name, email, phone, plan, message } = req.body;

  const mailOptions = {
    from: 'walylosada@gmail.com',
    to: 'walylosada@gmail.com',  // Cambia a tu correo de destino
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
});

// Iniciar el servidor en el puerto 3001
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
