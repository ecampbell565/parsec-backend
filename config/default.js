'use strict';

const cfenv = require('cfenv');

//Load port and host variables
const appEnv = cfenv.getAppEnv();
const port = appEnv.isLocal ? 3000 : appEnv.port;
const host = appEnv.isLocal ? 'localhost' : appEnv.bind;

module.exports = {
  PORT: process.env.PORT || port,
  HOST: process.env.HOST || host,
};
