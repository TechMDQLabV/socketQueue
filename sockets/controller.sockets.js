const TicketControl = require("../models/ticket-control.model");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit( 'actual-state', ticketControl.lastFour );
    socket.emit( 'pending-tickets', ticketControl.tickets.length );

    socket.on('disconnect', () => { });

    socket.on('next-ticket', ( payload, callback ) => {
        const next = ticketControl.next();
        socket.emit( 'pending-tickets', ticketControl.tickets.length );        
        callback( next );

    });

    socket.on('attend-ticket', ({ desk }, callback) => {
        if( !desk ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.attendTicket(desk);

        socket.broadcast.emit( 'actual-state', ticketControl.lastFour);
        socket.emit( 'pending-tickets', ticketControl.tickets.length );
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length );

        if( !ticket ){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });            
        }else{
            callback({
                ok: true,
                ticket
            });             
        }
    });
};

module.exports = {
    socketController
};