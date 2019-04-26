'use strict';

const http = require('http');
const HTTPStatus = require('http-status');
const express = require('express');
const config = require('config');
const _ = require('lodash');
const morgan = require('morgan');
const helper = require('./common/helper');
const error = require('./common/error');

const app = express();
const router = express.Router();

//Load routes
_.forEach(require('./routes'), (verbs, url) => {
  _.forEach(verbs, (def, verb) => {
    const actions = [
      function (req, res, next) {
        req.signature = `${def.controller}#${def.method}`;
        next();
      },
    ];
    const method = require(`./controllers/${def.controller}`)[def.method];
    if (!method) {
      throw new Error(`${def.method} is undefined, for controller ${def.controller}`);
    }
    actions.push(method);
    router[verb](`/api${url}`, helper.autoWrapExpress(actions));
  });
});

app.use(morgan('dev'));
app.use('/', router);
app.use((req, res) => {
  res.status(HTTPStatus.BAD_REQUEST).json({
    code: HTTPStatus.BAD_REQUEST,
    message: 'Route not found',
  });
});
app.use(error);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
