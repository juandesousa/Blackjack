(() => {
    'use strict'

    //Variables
    let deck = [];
    const tipos = ['C','D','H','S'];
    const especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    //Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');

    const total = document.querySelectorAll('small');

    const divCartasJugadores = document.querySelectorAll('.divCartas')


    // Funcion que inicia el juego
    const iniciarJuego = ( numJugadores = 2 ) => {

        console.clear();

        deck = crearDeck();

        puntosJugadores = [];

        for( let i = 0; i < numJugadores; i++ ) {
            puntosJugadores.push(0);
        }

        total.forEach( element => element.innerText = 0 );

        divCartasJugadores.forEach( element => element.innerText = '' );
       
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
    }


    //Esta funcion crea un nuevo deck
    const crearDeck = () => {
        
        deck = [];

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

        return _.shuffle( deck );
    }


    //Esta funcion toma una nueva carta
    const pedirCarta = () => {

        if( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
    
        return deck.pop();
    }


    //Esta funcion devuelve el valor de cada carta
    const valorCarta = ( carta ) => {

        const valor = carta.substring( 0, carta.length - 1 );
        
        return ( isNaN(valor) ) ? 
                ( valor === 'A') ? 11 : 10
                : valor * 1;

    }


    //Turno 0 = primer jugador y el ultimo se la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );

        total[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }


    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');

        imgCarta.src = `assets/cartas/${ carta }.png`;

        imgCarta.classList.add('carta');

        divCartasJugadores[turno].append( imgCarta );

    } 


    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

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
        },1000)

    }


    //Turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            
            puntosComputadora = acumularPuntos( carta,puntosJugadores.length-1 )
            
            crearCarta( carta, puntosJugadores.length-1 )

        }while( ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 ) );

        determinarGanador();
    }

    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        
        const puntosJugador = acumularPuntos( carta, 0 );
        
        crearCarta( carta, 0)

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
        turnoComputadora( puntosJugadores[0] )

    })

    btnNuevo.addEventListener('click', () => {
        
        iniciarJuego();
        
    })

})();