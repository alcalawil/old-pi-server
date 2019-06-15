const express = require('express');
const handlers = require('./handlers');
const router = express.Router();

router.get('/time', (req, res) => {
  res.status(200).json({
    date: new Date().toISOString()
  });
});

router.post('/set-led', (req, res) => {
  const value = req.body.value;
  handlers.setLed(value).then(() => {
    res.status(201).json({
      message: `LED status: ${value}`
    });
  });
});

module.exports = router;
