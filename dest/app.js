"use strict";

var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var bodyParser = require("body-parser");
var Chain = require("chain-node");
var config = require("../config");
var chain = new Chain(config);
var port = process.env.PORT || 5000;

app.use(express["static"](__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile("/index.html");
});

app.post("/new_transaction", function (req, res) {
  io.sockets.emit("new_transaction", req.body);
  res.end();
});

app.post("/query", function (req, res) {
  var query = req.body.query;

  if (+query) {
    chain.getBlock(+query, function (err, resp) {
      res.json(resp);
    });
  } else {
    chain.getAddress(query, function (err, resp) {
      res.json(resp);
    });
  }
});

server.listen(port);