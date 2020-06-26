const express = require('express');
const pool = require('../../config/database');
const verifyToken = require('./verifyToken');

const router = express.Router();

router.post('/survey', (req, res) => {
  const sql = 'UPDATE students SET age=?, gender=?, department=?, drugs=?, attention_level=?, memory_level=?, remember_level=? WHERE name=?';
  const params = { ...req.body };
  pool.query(sql,
    [params.age, params.gender, params.department, params.drugs,
      params.attentionLevel, params.memoryLevel, params.rememberLevel, params.username],
    (err, result) => {
      if (err) {
        res.status(404).json({ message: err });
      } else if (result) {
        res.send(result);
      }
    });
});

router.post('/test-result', verifyToken, (req, res) => {
  const sql = `INSERT INTO tests (studentname, testname, testtype, date, totaltime, answers)
    VALUES (?, ?, ?, ?, ?, ?)`;
  const params = { ...req.body };
  const answersJSON = JSON.stringify(params.answers);
  pool.query(sql,
    [params.username, params.testName, params.testType, params.date, params.totalTime, answersJSON],
    (err, result) => {
      if (err) {
        res.status(404).json({ message: err });
      } else if (result) {
        res.send(result);
      }
    });
});

module.exports = router;
