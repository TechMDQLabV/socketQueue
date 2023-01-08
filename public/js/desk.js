const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendings = document.querySelector('#lblPendings');

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('desk') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;
divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;
});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('last-ticket', (lastTicket) => {
    //lblNewTicket.innerText = "Ticket "+lastTicket; 
});

socket.on( 'pending-tickets', ( cant ) => {
    if(cant === 0){
        lblPendings.style.display = 'none';
    }else{
        lblPendings.style.display = '';
        lblPendings.innerText = cant;
    }

});

btnAttend.addEventListener( 'click', () => {
    
    socket.emit( 'attend-ticket', { desk }, ( { ok, ticket, msg } ) => {
        if( !ok ){
            lblTicket.innerText = `Nadie`;
            divAlert.style.display = '';
            return;
        }
        lblTicket.innerText = `Ticket ${ticket.number}`;

    });

});