const express = require('express');
const pool = require('../../config/database');

const router = express.Router();

router.get('/students', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM students';
  pool.query(sql, (err, data) => {
    if (err) {
      res.status(404).json({ message: err });
    }
    res.status(200).json(data);
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = router;
