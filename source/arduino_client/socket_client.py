import sys
import struct
import glob
from serial import Serial
from socketIO_client import SocketIO, BaseNamespace


BEEP = struct.pack('B', 12)

def _get_arduino_port():
    # TODO: find a better way to do this.
    serial_port = None
    cu_ports = glob.glob('/dev/cu.usbmodemfd*')
    port = None
    if cu_ports:
        port = cu_ports[0]
    else:
        tty_ports = glob.glob('/dev/tty.usbmodemfd*')
        if tty_ports:
            port = tty_ports[0]
    if not port:
        raise Exception('Arduino port not found')
    return Serial(port, 9600)


serial_port = _get_arduino_port()


class ArduinoNameSpace(BaseNamespace):
    
    serial_port = serial_port

    def __init__(self, *args, **kwargs):
        super(ArduinoNameSpace, self).__init__(*args, **kwargs)

    def on_beep(self, *args):
        print '[BEEP]'
        self.serial_port.write(BEEP)


if __name__ == '__main__':
    socket_host = 'localhost';
    if len(sys.argv) > 1:
        socket_host = sys.argv[1]
    print 'Creating socket with:', socket_host
    socket = SocketIO(socket_host, 8002, Namespace=ArduinoNameSpace)
    while 1:
        serial_port.read()
        socket.emit('buttonPush', {})
    socket.close()
