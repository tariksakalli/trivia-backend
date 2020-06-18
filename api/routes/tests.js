const express = require('express');
const pool = require('../../config/database');
const verifyToken = require('./verifyToken');

const router = express.Router();

router.post('/recall-listening', verifyToken, (req, res) => {
  const sql = `INSERT INTO tests (studentname, testname, date, totaltime, answers)
    VALUES (?, ?, ?, ?, JSON_ARRAY(?))`;
  const params = { ...req.body };
  const answersJSON = JSON.stringify(params.answers);
  pool.query(sql,
    [params.username, params.testName, params.date, params.totalTime, answersJSON],
    (err, result) => {
      if (err) {
        res.status(404).json({ message: err });
      } else if (result) {
        res.send(result);
      }
    });
});

module.exports = router;
