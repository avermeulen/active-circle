var express = require('express'); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require("johnny-five"),
  board, ping;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('a user connected');
});

board = new five.Board();

board.on("ready", function() {

  // Create a new `ping` hardware instance.
  ping = new five.Ping(7);

  http.listen(3000, function(){
  	console.log('listening on *:3000');
  });


  // Ping Event API
  var size = 50;
  ping.on("change", function(err, value) {

    if (this.inches >= 10){
    	size = 50;
    }
    else if (this.inches >= 7.5){
    	size = 100
    } else if (this.inches >= 5){
    	size = 200
    } else if (this.inches >= 2.5){
    	size = 300;
    }
    else if (this.inches >= 1){
    	size = 400;
    }
    else{
    	size = 500;
    }

    io.emit("circle-size", size);

  });
});
