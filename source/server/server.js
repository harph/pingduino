var ioWeb = require('socket.io').listen(8001);
var ioArduino = require('socket.io').listen(8002);
var arduinos = [];
var clients = [];

var buttonEventCount = 0;


function updateClients(socket) {
    socket.emit('updateClients', {clients: clients.length});
}

function updateButtonEvents(socket) {
     socket.emit('updateButtonEvents', {buttonEventCount: buttonEventCount});
}

function updateArduinoStatus(socket, arduinoStatus) {
    var arduinoStatus;
    if (arduinos.length == 0) {
        arduinoStatus = 'offline';
    } else {
        arduinoStaus = 'online';
    }
    socket.emit('updateArduinoStatus', {status: arduinoStatus});
}

function beep() {
    ioArduino.sockets.emit('beep', {}); 
}

ioWeb.sockets.on('connection', function(socket) {
    clients.push(socket);
    updateArduinoStatus(socket);
    updateClients(ioWeb.sockets);
    updateButtonEvents(socket);

    socket.on('disconnect', function() {
        clients.pop(socket);
        updateClients(socket.broadcast);
    });

    socket.on('beep', function() {
        beep();
    });
});


ioArduino.sockets.on('connection', function(socket) {
    arduinos.push(socket);

    if (arduinos.length == 1) {
        updateArduinoStatus(ioWeb.sockets, 'online');
    }

    socket.on('buttonPush', function() {
        buttonEventCount++;
        updateButtonEvents(ioWeb.sockets);
    });
    
    socket.on('disconnect', function() {
        arduinos.pop(socket);
        if (arduinos.length == 0) {
            updateArduinoStatus(ioWeb.sockets);
        }
    });
});

