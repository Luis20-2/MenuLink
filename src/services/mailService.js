const nodemailer = require('nodemailer');

async function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && port && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass }
    });
  }

  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
}

async function sendMail(opts) {
  const transporter = await createTransporter();
  const info = await transporter.sendMail(opts);
  const previewUrl = nodemailer.getTestMessageUrl(info);
  return { info, previewUrl };
}

async function sendVerificationEmail(restaurant, token) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const confirmUrl = `${frontendUrl}/confirm?token=${token}`;

  const mailOptions = {
    from: process.env.FROM_EMAIL || 'no-reply@menulink.local',
    to: restaurant.email,
    subject: 'Confirma tu cuenta en MenuLink',
    html: `
      <p>Hola <strong>${restaurant.name}</strong>,</p>
      <p>Gracias por registrarte en MenuLink. Por favor confirma tu cuenta haciendo clic en el siguiente enlace:</p>
      <p><a href="${confirmUrl}">Confirmar mi cuenta</a></p>
      <p>Si no solicitaste este correo, ignóralo.</p>
    `
  };

  return sendMail(mailOptions);
}

async function sendPasswordResetEmail(restaurant, token) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

  const mailOptions = {
    from: process.env.FROM_EMAIL || 'no-reply@menulink.local',
    to: restaurant.email,
    subject: 'Recupera tu contraseña en MenuLink',
    html: `
      <p>Hola <strong>${restaurant.name}</strong>,</p>
      <p>Hemos recibido una solicitud para cambiar la contraseña de tu cuenta. Haz clic en el siguiente enlace para elegir una nueva contraseña (válido 1 hora):</p>
      <p><a href="${resetUrl}">Restablecer contraseña</a></p>
      <p>Si no solicitaste este cambio, ignora este correo.</p>
    `
  };

  return sendMail(mailOptions);
}

module.exports = {
  sendVerificationEmail,
  sendMail,
  sendPasswordResetEmail
};
