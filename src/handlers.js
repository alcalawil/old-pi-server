const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

const setLed = (value) => {
    return new Promise((resolve, reject) => {
        led.write(value, (err) => {
            if (err) {
                return reject(err);
            }
            resolve('Success!');
        });
    });
}

module.exports = {
    setLed
}