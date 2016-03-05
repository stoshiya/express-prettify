"use strict";

var assert = require('assert');
var express = require('express');
var request = require('supertest');
var pretty = require('..');

var chars = 'abcdefghijklmnopqrstuvwxyz';
function generateRandomString() {
  var s = '';
  for (var i = 0; i < 20; i++) {
    s += chars.charAt(Math.floor(chars.length * Math.random()));
  }
  return s;
}
var path = '/' + generateRandomString();
var query = generateRandomString();
var json = { hello: 'world', body: 'json' };

describe('express-prettify', function() {
  it('responds pretty printed json with 2 spaces.', function(callback) {
    var app = express();
    app.use(pretty({ query: query }));
    app.get(path, function(req, res) {
      res.json(json);
    });

    request(app)
      .get(path + '?' + query)
      .expect('Content-Type', /application\/json/)
      .end(function(err, res) {
        assert.strictEqual(res.text, JSON.stringify(json, null, 2));
        callback(err);
      });
  });

  it('responds pretty printed json with 4 spaces.', function(callback) {
    var app = express();
    app.use(pretty({ query: query, spaces: 4 }));
    app.get(path, function(req, res) {
      res.json(json);
    });

    request(app)
      .get(path + '?' + query)
      .expect('Content-Type', /application\/json/)
      .end(function(err, res) {
        assert.strictEqual(res.text, JSON.stringify(json, null, 4));
        callback(err);
      });
  });

  it('responds ugly json without query.', function(callback) {
    var app = express();
    app.use(pretty());
    app.get(path, function(req, res) {
      res.json(json);
    });

    request(app)
      .get(path + '?pretty')
      .expect('Content-Type', /application\/json/)
      .end(function(err, res) {
        assert.strictEqual(res.text, JSON.stringify(json));
        callback(err);
      });
  });
});
