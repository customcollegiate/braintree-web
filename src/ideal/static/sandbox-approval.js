'use strict';

var querystring = require('../../lib/querystring');
var isWhitelistedDomain = require('../../lib/is-whitelisted-domain');

var REQUIRED_PARAMS = ['redirect_url'];

function verifyParams(data) {
  REQUIRED_PARAMS.forEach(function (param) {
    if (typeof data[param] !== 'string') {
      throw new Error(param + ' param must be a string');
    }
  });

  if (!isWhitelistedDomain(data.redirect_url)) {
    throw new Error(data.redirect_url + ' is not a valid whitelisted url');
  }
}

function populateDom(data) {
  var link;

  link = document.getElementById('redirect_url');
  link.href = data.redirect_url;
}

function start() {
  var params = querystring.parse();

  verifyParams(params);
  populateDom(params);
}

module.exports = {
  start: start
};
