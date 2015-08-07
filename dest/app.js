"use strict";

var express = require("express"),
    app = express(),
    port = process.env.PORT || 5000;

app.use(express["static"](__dirname + "/public"));

app.get("/", function (req, res) {
    res.sendFile("/index.html");
});

app.listen(port);