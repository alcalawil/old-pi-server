var awsIot = require('aws-iot-device-sdk');

class MqttService {
  constructor() {
    this.mqttClient = null;
    this.host = 'YOUR_HOST';
    this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    this.password = 'YOUR_PASSWORD';
  }

  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = awsIot.device({
      keyPath: './certs/mm',
      certPath: './certs/m',
      caPath: './certs/t',
      clientId: '',
      host: ''
    });

    // Mqtt error calback
    this.mqttClient.on('error', err => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log('connect');
      this.mqttClient.subscribe('topic_1');
    });

    // When a message arrives, console.log it
    this.mqttClient.on('message', function(topic, message) {
      console.log(message.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }
}

module.exports = MqttService;
