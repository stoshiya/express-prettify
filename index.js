"use strict";

/**
 * pretty json middleware.
 *
 *  - `always`: prettify response without query, if it's specified true. (default: false)
 *  - `query`: query-string parameter name for pretty response. (default: none)
 *  - `spaces`: pretty print spaces. (default: 2)
 *
 * @param {object} option
 * @return {function}
 */
module.exports = function(option) {
  option = option || {};
  var always = option.always || false;
  var query = option.query;
  var spaces = option.spaces || 2;

  return function(req, res, next) {
    if (always === true || typeof req.query[query] !== 'undefined') {
      res.json = function(body) {
        // content-type
        if (!res.get('Content-Type')) {
          res.set('Content-Type', 'application/json');
        }
        return res.send(JSON.stringify(body, null, spaces));
      }
    }
    next();
  }
};
