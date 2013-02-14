from serial import Serial
from socketIO_client import SocketIO

old_value = 0

serial_port = Serial('/dev/cu.usbmodem1a21', 9600)
socket = SocketIO('localhost', 8001)
count = 0
while 1:
    value = serial_port.read()
    socket.emit('buttonPush', {})
    count += 1
    if count % 10 == 0:
        print "writing"
        serial_port.write("RED");
socket.close()
