// generate-secret.js
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
console.log('Tu JWT_SECRET seguro:');
console.log(secret);