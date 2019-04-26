'use strict';

module.exports = {
  test,
};

/**
 * Returns test values for the /test endpoint
 * @param {Request} req the request
 * @param {Response} res the response
 */
function test(req, res) {
  res.json({
    success: true,
  });
}
