# Pi Server

Raspberry pi server in nodejs+express to control hardware through an API

### Usage 

1. `git clone https://github.com/alcalawil/pi-server.git`
2. `cd pi-server`
3. `npm i`
4. `npm start`

### .Env file

Set `USE_GPIO=TRUE` to use in a Raspberry pi. If it's false, leds will be mocked by printing its status in console