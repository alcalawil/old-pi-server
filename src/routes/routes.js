const express = require('express');
const handlers = require('../handlers');
const mqttClient = require('../services/MqttService');
const router = express.Router();

router.get('/time', (req, res) => {
  res.status(200).json({
    date: new Date().toISOString()
  });
});

router.post('/set-led', (req, res) => {
  const value = req.body.value ? 1 : 0;
  handlers.setLed(value).then(() => {
    res.status(201).json({
      message: `LED status: ${value}`
    });
  });
});

router.post('/send-mqtt', (req, res) => {
  const topic = req.body.topic;
  const message = req.body.message;
  mqttClient.sendMessage(topic, message);
  res.status(200).send('Message sent to mqtt');
});

module.exports = router;
