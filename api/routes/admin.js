const express = require('express');
const pool = require('../../config/database');
const verifyToken = require('./verifyToken');

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

router.get('/recall-listening', verifyToken, (req, res) => {
  const sql = 'SELECT * FROM tests';
  pool.query(sql, (err, data) => {
    if (err) {
      res.status(404).json({ message: err });
    }
    res.status(200).json(data);
  });
});

module.exports = router;
