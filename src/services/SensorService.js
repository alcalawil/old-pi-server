const dthSensor = require('node-dht-sensor').promises;
const mqttClient = require('../services/MqttService');

const SENSOR_TYPE = 11;
const GPIO_NUMBER = 4;
const READ_INTERVAL = 2000;

class SensorReader {
  constructor() {
    this.interval = null;
  }

  async read() {
    const { temperature, humidity } = await dthSensor.read(
      SENSOR_TYPE,
      GPIO_NUMBER
    );

    return {
      temperature,
      humidity
    };
  }

  async startReader() {
    this.interval = setInterval(async () => {
      const { temperature, humidity } = await this.read();
      console.log(`temp: ${temperature}, hum: ${humidity}`);

      // Publish values
      mqttClient.sendMessage('temperature', temperature.toString());
      mqttClient.sendMessage('humidity', humidity.toString());
    }, READ_INTERVAL);
  }

  stopReader() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

module.exports = new SensorReader();
