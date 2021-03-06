'use strict';

var express = require('express');
var app = require('express')();
var bodyParser = require('body-parser');

var server = require('http').createServer(app);
var axios = require('axios');
var socket = require('socket.io')(server);
var port = process.env.PORT || 3000;

var BOT_URL = 'https://bot-froggy.herokuapp.com/bot';


var backData;
app.use(bodyParser.json());


server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

app.post('/value', function(req, rep){
  console.log(req.body.message);
  socket.emit("serverMessage", req.body);
});

socket.on('connection', function (client) {

    console.log("server");
    socket.emit("connectionSuccess", "You have been connected!");
    // socket.emit("serverMessage", "wit message");
    client.on("apiCall", function(data){
      console.log("apiCall");
      socket.emit("messageSuccess", data);
      axios.post(BOT_URL,{message: data});
    })

    client.on('disconnect', function () {
        console.log("disconnected");
    });

});
