var app = require('http').createServer(handler);
var io  = require('socket.io').listen(app);
var fs  = require('fs');

app.listen(3000);

function handler (req, res) {
    fs.readFile(__dirname + '/client.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading client.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

var openSockets = []; // TODO remove closed connections

var broadcast = function(data, sourceSocket) {
    for (var i = 0; i < openSockets.length; i++) {
        if (openSockets[i] != sourceSocket) openSockets[i].emit('message', data);
    }
};

io.sockets.on('connection', function (socket) {
    socket.emit('message', { user: 'Server', message: 'Welcome!' });

    socket.broadcast.emit('message', { user: 'Server', message: "User connected" });

    socket.on('message', function (data) {
        console.log(data);
        socket.broadcast.emit('message', data);
    });

    openSockets.push(socket);
});
