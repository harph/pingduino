var ioWeb = require('socket.io').listen(8001);
var ioArduino = require('socket.io').listen(8002);
var arduinos = [];
var clients = [];

var arduinoStatus = 'offline';
var buttonEventCount = 0;
var dataPotentiometer = {value: null};
var dataLightSensor = {value: null;

function updateClients(socket) {
    socket.emit('updateClients', {clients: clients.length});
}

function updateButtonEvents(socket) {
     socket.emit('updateButtonEvents', {buttonEventCount: buttonEventCount});
}

function updatePotentiometerValue(socket, data) {
     socket.emit('updatePotentiometerValue', data);
}

function updateLightSensorValue(socket, data) {
     socket.emit('updateLightSensorValue', data);
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
    updateArduinoStatus(socket, arduinoStatus);
    updateClients(ioWeb.sockets);
    updateButtonEvents(socket);
    updatePotentiometerValue(ioWeb.sockets, dataPotentiometer);
    updateLightSensorValue(ioWeb.sockets, dataLightSensor);

    socket.on('disconnect', function(data) {
        clients.pop(socket);
        updateClients(socket.broadcast);
    });

    socket.on('beep', function(data) {
        beep();
    });
});


ioArduino.sockets.on('connection', function(socket) {
    arduinos.push(socket);

    if (arduinos.length == 1) {
        arduinoStatus = 'online';
        updateArduinoStatus(ioWeb.sockets, arduinoStatus);
    }

    socket.on('buttonPush', function(data) {
        buttonEventCount++;
        updateButtonEvents(ioWeb.sockets);
    });
   
    socket.on('potentiometerChanged', function(data) {
        dataPotentiometer = data;
        updatePotentiometerValue(ioWeb.sockets, data);
    });

    socket.on('lightSensorChanged', function(data) {
        dataLightSensor = data;
        updateLightSensorValue(ioWeb.sockets, data);
    });

    socket.on('disconnect', function(data) {
        arduinos.pop(socket);
        if (arduinos.length == 0) {
            updateArduinoStatus(ioWeb.sockets);
        }
    });
});

