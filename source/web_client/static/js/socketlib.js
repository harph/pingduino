var socket = io.connect('http://localhost', {port: 8001});

function updateClients(data) {
    $('#onlineClients').html(data.clients);
}

function updateButtonEvents(data) {
    $('#buttonEventCount').html(data.buttonEventCount);
}

socket.on('updateClients', updateClients);
socket.on('updateButtonEvents', updateButtonEvents);
