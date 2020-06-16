require('dotenv').config();
const express = require('express');

const app = express();
const adminRoutes = require('./api/routes/admin');

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/admin', adminRoutes);

app.listen(process.env.APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server runing on port: ${process.env.APP_PORT}`);
});
