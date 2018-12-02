const utils = require('./utils/utils');
const led = utils.getLedInstance(17);

const setLed = (value) => {
    return new Promise((resolve, reject) => {
        led.write(value, (err) =>{
            if(err) {
                return reject(err);
            }
            resolve('Success!');
        });
    });
}

module.exports = {
    setLed    
}