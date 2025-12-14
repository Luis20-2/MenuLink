const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('📧 [emailService] Inicializando con:');
console.log('   EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
console.log('   EMAIL_USER:', process.env.EMAIL_USER);
console.log('   EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : 'NO DEFINIDA');
console.log('   EMAIL_FROM:', process.env.EMAIL_FROM);

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificar conexión al servidor SMTP al iniciar
transporter.verify()
  .then(() => console.log('✅ [SMTP] Conexión verificada - Listo para enviar emails'))
  .catch(err => {
    console.error('❌ [SMTP] Error de conexión:', err.message);
  });

const sendVerificationEmail = async (restaurantName, email, verificationCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@menulink.com',
      to: email,
      subject: '🔐 Código de Verificación - MenuLink',
      html: `<p>Hola ${restaurantName}, tu código: <b>${verificationCode}</b></p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado a ${email}`, info.response || info);
    return true;
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    throw error;
  }
};

const sendPasswordResetEmail = async (restaurantName, email, resetLink) => {
  console.log('📧 [sendPasswordResetEmail] Iniciando envío a:', email);
  console.log('📧 [sendPasswordResetEmail] Link:', resetLink);
  
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@menulink.com',
      to: email,
      subject: '🔐 Restablecer Contraseña - MenuLink',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🍽️ MenuLink</h1>
          </div>
          
          <div style="background: #f7f7f7; padding: 30px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #333; margin-top: 0;">Restablecer Contraseña</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Hola <strong>${restaurantName}</strong>,<br><br>
              Recibimos una solicitud para restablecer tu contraseña. 
              Haz clic en el botón de abajo para crear una nueva contraseña.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 50px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;
                        font-size: 16px;
                        border: none;
                        cursor: pointer;">
                🔐 Restablecer Contraseña
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #666; font-size: 13px; line-height: 1.6;">
              <strong>Si el botón no funciona, copia y pega este enlace en tu navegador:</strong><br>
              <code style="background: white; padding: 10px; border-radius: 3px; word-break: break-all; display: block; margin-top: 10px;">
                ${resetLink}
              </code>
            </p>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <p style="color: #856404; margin: 0; font-size: 12px;">
                ⏰ <strong>Importante:</strong> Este enlace expira en <strong>1 hora</strong> por seguridad.
              </p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Si <strong>NO</strong> solicitaste restablecer tu contraseña, ignora este email y no compartas el enlace con nadie.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 11px; text-align: center;">
              © 2025 MenuLink. Todos los derechos reservados.<br>
              Este es un email automático, por favor no responder.
            </p>
          </div>
        </div>
      `
    };

    console.log('📧 [sendPasswordResetEmail] Opciones:', { 
      from: mailOptions.from, 
      to: mailOptions.to, 
      subject: mailOptions.subject 
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ [sendPasswordResetEmail] Email enviado exitosamente');
    console.log('   MessageID:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ [sendPasswordResetEmail] Error al enviar:', error.message);
    console.error('   Código:', error.code);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};