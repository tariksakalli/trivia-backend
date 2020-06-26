require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../../config/database');

const router = express.Router();

router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM students WHERE name=? AND password=?';
  pool.query(sql, [req.body.username, req.body.password], (err, data) => {
    if (err) {
      res.status(404).json({ message: err });
    }

    if (data.length === 0) {
      res.status(401).json({
        message: 'Kullanıcı adı / şifre hatalı',
      });
    } else {
      const loginInfo = {
        name: data[0].name,
        password: data[0].password,
      };
      const userInfo = data[0];
      const token = jwt.sign({ loginInfo }, process.env.JWT_KEY, { expiresIn: '90m' });
      res.json({
        token,
        userInfo,
      });
    }
  });
});

module.exports = router;
