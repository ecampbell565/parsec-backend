'use strict';

module.exports = (req, res, next, err) => {
  res.json({
    code: res.statusCode,
    message: err.message,
  });
};
