const express = require('express');
const app = express();
const PORT = 3000;

app.get('/test', (req, res) => {
  res.json({ success: true, message: 'Test OK' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

// Prevenir que el proceso se cierre
process.on('SIGINT', () => {
  console.log('SIGINT recibido');
  server.close(() => {
    process.exit(0);
  });
});

// Mantener el proceso vivo
process.stdin.resume();

