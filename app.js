const express = require('express');
const app = express();
const port = 3000;

const nodemailer = require('nodemailer');

// Configura el transporte de Nodemailer con tus credenciales
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Cambia esto a tu proveedor de correo electrónico
  auth: {
    user: 'carloschiva09@gmail.com', // Tu dirección de correo electrónico
    pass: 'jnhntflcpuaphpsr', // Tu contraseña de correo electrónico
  },
});


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/reservar', (req, res) => {
  const nombre = req.body.nombre;
  const fecha = req.body.fecha;
  const correo = req.body.correo;

  // Puedes procesar la reserva como desees, por ejemplo, almacenarla en una base de datos.

  // Envía un correo electrónico al usuario que ha realizado la reserva.
  const mailOptions = {
    from: 'carloschiva09@gmail.com',
    to: correo,
    subject: 'Confirmación de Reserva',
    text: `Hola ${nombre},\n\nTu reserva para la fecha ${fecha} ha sido confirmada.\nGracias por elegir nuestro servicio.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico de confirmación:', error);
      // Manejar el error y enviar una respuesta al cliente
      res.status(500).json({ error: 'Error al enviar el correo electrónico de confirmación' });
    } else {
      console.log('Correo electrónico de confirmación enviado:', info.response);
      // Envía una respuesta de éxito al cliente
      res.redirect('/confirmation');
        }
    });
});

// Agrega una ruta para la página de confirmación
app.get('/confirmation', (req, res) => {
    // Envía la página de confirmación al usuario
    res.sendFile(__dirname + '/confirmation.html');
});

app.listen(port, () => {
    console.log(`Servidor web en http://localhost:${port}`);
});
