const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const mqttClient = require('./services/MqttService');
const sensor = require('./services/SensorService');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// hardware configs
mqttClient.connect();
sensor.startReader();

// Routes
app.use('/', routes);

app.use((req, res, next) => {
  let err = new Error('Route not found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
