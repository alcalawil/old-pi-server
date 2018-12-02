const Gpio = require('./onoffSelector').Gpio;

const getLedInstance = (number) => {
    const accessible = false;

    if (accessible) {
        return new Gpio(number, 'out');
    } else {
        return {
            write: (value, callback) => {
                console.log(`LED value: ${value}`);
                callback(null);
            }
        }
    }
}

module.exports = { getLedInstance }