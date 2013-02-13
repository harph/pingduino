from socketIO_client import SocketIO

s = SocketIO('localhost', 8001)
s.emit('buttonPush')

s.close()
