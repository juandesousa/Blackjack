
// 2C = 2 de Treboles
// 2D = 2 de Diamante
// 2H = 2 de Corazon
// 2S = 2 de Espada


let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];
let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const total = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//Esta funcion crea un nuevo deck
const crearDeck = () => {

    for( let i=2; i<=10; i++ ) {
        for( let tipo of tipos ) { 
            deck.push( i + tipo );
        }
    }

    for( let tipo of tipos ) {
        for( let especial of especiales ) {
            deck.push( especial + tipo );
        }
    }

    // console.log(deck)
    deck = _.shuffle( deck )
    console.log( deck )

    return deck;
}

crearDeck()

//Esta funcion toma una nueva carta

const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop()
   
    return carta;
}

// pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring( 0, carta.length - 1 );
    
    return ( isNaN(valor) ) ? 
            ( valor === 'A') ? 11 : 10
            : valor * 1;

}

const turnoComputadora = (puntosMinimos) => {

    do {

        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta( carta );

        total[1].innerText = puntosComputadora;
        
        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${ carta }.png`;

        imgCarta.classList.add('carta');

        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ){
            break;
        }

    }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout( () => {
        if( puntosComputadora === puntosMinimos ){
            alert('Empate!!!!!')
        }else if( puntosMinimos > 21 ){
            alert('Computadora Gana!!!!!')
        }else if( puntosComputadora > 21){
            alert('Jugador Gana!!!!!')
        }else {
            alert('Computadora Gana!!!!!')
        }
    },100)

}

//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta( carta );

    total[0].innerText = puntosJugador;
    
    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${ carta }.png`;

    imgCarta.classList.add('carta');

    divCartasJugador.append( imgCarta );

    if( puntosJugador > 21){
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if( puntosJugador === 21){
        console.warn('Genial');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

})

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador )

})

btnNuevo.addEventListener('click', () => {
    console.clear();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0;
    puntosComputadora = 0;
    total[0].innerText = 0;
    total[1].innerText = 0;
    divCartasComputadora.innerText = '';
    divCartasJugador.innerText = '';
    deck = [];
    crearDeck();
})