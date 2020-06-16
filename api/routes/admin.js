const express = require('express');
const pool = require('../../config/database');

const router = express.Router();

router.get('/students', (req, res) => {
  const sql = 'SELECT * FROM students';
  pool.query(sql, (err, data) => {
    if (err) {
      res.status(404).json({ message: err });
    }
    res.status(200).json(data);
  });
});

module.exports = router;
