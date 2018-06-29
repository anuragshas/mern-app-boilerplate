import path from 'path';
import dotenv from 'dotenv';
import http from 'http';
import utils from "./helpers/utils.js";

global.path = path;
global.dotenv = dotenv;

utils.loadENV();
const app = require('./app');
const server = http.createServer(app);

server.listen(process.env.port, () => {
    utils.log(`Server has started and is listening on port ${process.env.port}!`)
});