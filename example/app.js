"use strict";

var app = require('express')();
var pretty = require('./../index');

app.use(pretty({ query: 'pretty' }));

app.get('/', function(req, res) {
  res.json({ hello: 'world', body: 'This is pretty printed json' });
});

app.listen(3000);
