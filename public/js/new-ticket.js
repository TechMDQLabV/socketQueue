const lblNewTicket = document.querySelector('#lblNewTicket');
const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado')
    btnCreate.disabled = false;

});

socket.on('last-ticket', (lastTicket) => {
    lblNewTicket.innerText = "Ticket "+lastTicket; 
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    btnCreate.disabled = true;
});


socket.on('send-mensaje', (payload) => {
    console.log( payload );
});


btnCreate.addEventListener( 'click', () => {

    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});