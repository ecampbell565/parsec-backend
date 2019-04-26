'use strict';

const co = require('co');
const _ = require('lodash');

module.exports = {
  wrapExpress,
  autoWrapExpress,
};

/**
 * Wrap generator function to express function with co
 * @param {Function} func  the generator function
 * @returns {Function} wrapped express function
 */
function wrapExpress(func) {
  return function (req, res, next) {
    co(func(req, res, next)).catch(next);
  };
}

/**
 * Wrap all generators from object
 * @param {Object} obj object to be wrapped
 * @returns {Object|Array} wrapped object
 */
function autoWrapExpress(obj) {
  if (_.isArray(obj)) {
    return obj.map(autoWrapExpress);
  }
  if (_.isFunction(obj)) {
    if (obj.constructor.name === 'GeneratorFunction') {
      return wrapExpress(obj);
    }
    return obj;
  }
  _.forEach(obj, (value, key) => {
    obj[key] = autoWrapExpress(value);
  });
  return obj;
}
