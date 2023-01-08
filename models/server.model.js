const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller.sockets');

class Server {
    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')( this.server );

        this.paths = {
        };

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();

        // configuración de sockets
        this.sockets();
    }

    middlewares(){
        // cors
        this.app.use( cors() );

        // directorio publico
        this.app.use( express.static('public') );
    }

    routes(){
    //    this.app.use( this.paths.users, require('../routes/users.routes'));        
    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ' + this.port);
        });        
    }
}

module.exports = Server;