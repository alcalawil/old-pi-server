const Gpio = require('onoff').Gpio;
const led = new Gpio(17, 'out');

const setLed = (value) => {
        led.writeSync(value);
}

module.exports = {
    setLed
}