require('dotenv').config();
let gpioSupport = (process.env['USE_GPIO'] || 'FALSE').toLocaleUpperCase() === 'TRUE';

module.exports = gpioSupport
    ? require('onoff')
    : require('./onoff-mock');