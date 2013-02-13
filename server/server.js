var io = require('socket.io').listen(8001);


var clients = [];
var buttonEventCount = 0;


function updateClients(socket) {
    socket.emit('updateClients', {clients: clients.length});
}

function updateButtonEvents(socket) {
     socket.emit('updateButtonEvents', {buttonEventCount: buttonEventCount});
}


io.sockets.on('connection', function(socket) {
    clients.push(socket);
    updateClients(io.sockets);
    updateButtonEvents(socket);

    socket.on('buttonPush', function() {
        buttonEventCount++;
        updateButtonEvents(io.sockets);
    });

    
    socket.on('disconnect', function() {
        clients.pop(socket);
        updateClients(socket.broadcast);
    });
});
