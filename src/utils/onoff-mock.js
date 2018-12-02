const readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Gpio {

    constructor(number, direction) {
        this.number = number;
        this.direction = direction;
    }

    write(value, cb) {
        console.log(`GPIO${this.number}, value: ${value}`);
        cb(null);
    }

    watch(cb) {
        rl.prompt();
        rl.on('line', (input) => {
            switch (input) {
                case 'quit':
                    console.log('Quitting.. ');
                    rl.close();
                    break;
                case `${this.number} on`:
                    console.log(`GPIO${this.number} was set to 1`);
                    cb(null, 1);
                    break;
                case `${this.number} off`:
                    console.log(`GPIO${this.number} was set to 0`);
                    cb(null, 0);
                    break;
                default:
                    
                    break;
            }
        });
    }

    unwatch(cb) {
        rl.close();
        cb(null)
    }

}

module.exports = { Gpio }