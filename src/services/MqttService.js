var awsIot = require('aws-iot-device-sdk');
const config = process.env;
class MqttService {
  constructor() {
    this.mqttClient = null;
  }

  connect() {
    if (this.mqttClient) {
      return;
    }

    this.mqttClient = awsIot.device({
      keyPath: './certs/node-private-key.pem',
      certPath: './certs/node-cert.pem',
      caPath: './certs/root-CA.crt',
      clientId: config.CLIENT_ID,
      host: config.HOST
    });

    this.mqttClient.on('error', err => {
      console.log(err);
      this.mqttClient.end();
    });

    this.mqttClient.on('connect', () => {
      console.log('connect');
      this.mqttClient.subscribe('topic_1');
    });

    this.mqttClient.on('message', function(topic, message) {
      console.log(topic, message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }
}

module.exports = new MqttService();
