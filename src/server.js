const http = require('http');
const app = require('./app');
const PORT = process.argv[2] || 3000

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server listening at port: ', PORT);
});
