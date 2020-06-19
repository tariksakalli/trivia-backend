require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const adminRoutes = require('./api/routes/admin');
const authRoutes = require('./api/routes/auth');
const userRoutes = require('./api/routes/user');

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

https.createServer({
  key: fs.readFileSync('./config/cert/localhost.local-key.pem'),
  cert: fs.readFileSync('./config/cert/localhost.local.pem'),
}, app).listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server runing on port: ${process.env.APP_PORT}`);
});
