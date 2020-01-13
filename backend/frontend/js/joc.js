$().ready(() => {
    // Guardar el id del jugador aquí para enviarlo en el POST del AJAX
    // Guardar el id de la sala

    const tablero = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, 0, 1, 2, 0, -1, -1],
        [-1, -1, 0, 2, 1, 0, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1]
    ];
    
    let mida = 8;

    function generacionTablero() {

        for (let i = 0; i < 8; i++) {
            let row = document.createElement('tr');
            row.id = i;
            $('table')[0].append(row);


            for (let j = 0; j < 8; j++) {

                let col = document.createElement('td');
                col.id = i + '' + j;
                console.log(`colId: ${col.id}`)
                let fitxa = document.createElement('img');

                if (tablero[i][j] === 2) {
                    /**** fitxes negres inicials ****/
                    fitxa.setAttribute('src', '../img/fitxa-negra.png');
                    fitxa.draggable = false;
                    col.appendChild(fitxa);
                } else if (tablero[i][j] === 1) {
                    /**** fitxes blanques inicials ****/
                    fitxa.setAttribute('src', '../img/fitxa-blanca.png');
                    fitxa.draggable = false;
                    col.appendChild(fitxa);
                } else if (tablero[i][j] === 0) {
                    /**** afegeix els eventlisteners de drag&&drop a les columnes que envolten les fitxes ****/
                    col.addEventListener('drop', drop);
                    col.addEventListener('dragover', allowDrop);
                }

                //col.innerText = `${String.fromCharCode(r)+c}`;
                $(`tr#${i}`).append(col);

            }

            /**** afegeix les fitxes de cada jugador ****/

            let fb = document.createElement('img');
            fb.setAttribute('src', '../img/fitxa-blanca.png');
            fb.setAttribute('draggable', 'true');
            fb.id = `b`;
            //console.log(`FITXA BLANCA DRAG: ${fb.getAttribute('draggable')}`);
            fb.addEventListener('dragstart', drag);
            $('.blanques').append(fb);

            let fn = document.createElement('img');
            fn.setAttribute('src', '../img/fitxa-negra.png');
            fn.setAttribute('draggable', 'true');
            fn.id = `n`;
            //console.log(`FITXA NEGRA DRAG: ${fn.getAttribute('draggable')}`);
            fn.addEventListener('dragstart', drag);
            $('.negres').append(fn);
        }
    }
    

    /**** funcions drag&drop ****/
    let allowDrop = ev => {
        ev.preventDefault();
    };

    let drag = ev => {
        ev.dataTransfer.setData('text', ev.target.id);
        console.log(`DRAGGED: ${ev.target.id}`);
    };

    let drop = ev => {
        ev.preventDefault();
        console.log(`Dropped disc at: ${ev.target.id}`);
        var data = ev.dataTransfer.getData('text');
        if (ev.target.children.length == 0) ev.target.appendChild(document.getElementById(data).cloneNode(true));
        document.getElementById(data).draggable = false; // un cop s'ha deixat la fitxa al tauler ja no es pot moure

        /**** desactivar drop a les caselles que ho tenen amb fitxa ****/
        /**** i activar-lo a les caselles que ho tenen sense fitxa ****/

        console.log(`${JSON.stringify(data)}`);
        let colorFitxa = data == 'n' ? 2 : 1;

        /**** Row i Col on s'ha posat la fitxa ****/
        let rowId = ev.target.id.split('')[0] * 1;
        let colId = ev.target.id.split('')[1] * 1;

        tablero[rowId][colId] = colorFitxa;

        let surroundingCells = [
            rowId + '' + (colId - 1),
            rowId + '' + (colId + 1),
            (rowId + 1) + '' + (colId + 1),
            (rowId - 1) + '' + (colId + 1),
            (rowId + 1) + '' + (colId - 1),
            (rowId - 1) + '' + (colId - 1),
            (rowId + 1) + '' + colId,
            (rowId - 1) + '' + colId
        ];

        surroundingCells.forEach(cell => {

            /**** comprova si la cel·la és a dins del taulell ****/
            if (cell[0] >= 0 &&
                cell[0] <= mida - 1) {
                let cellElement = document.getElementById(`${cell}`);

                if (tablero[cell[0]][cell[1]] != 1 && tablero[cell[0]][cell[1]] != 2) {
                    tablero[cell[0]][cell[1]] = 0;
                }

                /**** comprova si la cel·la és buida ****/
                if (tablero[cell[0]][cell[1]] == 0) {

                    cellElement.addEventListener('drop', drop, true);
                    cellElement.addEventListener('dragover', allowDrop, true);

                } else if (tablero[cell[0]][cell[1]] == 1) {

                    /**** comprova si la cel·la té una fitxa del color contrari ****/

                    if (colorFitxa == 2) {
                        tablero[cell[0]][cell[1]] = 2;
                        cellElement.children[0].setAttribute('src', '../img/fitxa-negra.png');
                    }
                    cellElement.removeEventListener('drop', drop, true);
                    cellElement.removeEventListener('dragover', allowDrop, true);
                    
                } else if (tablero[cell[0]][cell[1]] == 2) {
                    /**** comprova si la cel·la té una fitxa del color contrari ****/
                    console.log(`\n\n\n THIS CELL (${cell}) HAS A DISC\n`);
                    console.log(`DISC COLOR: ${cellElement.children[0].getAttribute('src').includes('negra') ? 'negra' : 'blanca'}\n\n\n`);

                    if (colorFitxa == 1) {
                        tablero[cell[0]][cell[1]] = 1;
                        cellElement.children[0].setAttribute('src', '../img/fitxa-blanca.png');
                    }

                    cellElement.removeEventListener('drop', drop, true);
                    cellElement.removeEventListener('dragover', allowDrop, true);
                }
            }
        });

        /* POST AJAX CON EL EV.TARGET.ID  


        
        */
        let coordenadaId = ev.target.id;
        console.log(`${JSON.stringify(tablero)}`);


        /*$.post("/moverPieza", { jugador: jugadorId, partida: partidaId, coordenada: coordenadaId }, function() {

        });*/

    };

    function regenerarTablero(colorFitxa) {
        let tableroTemp = tablero;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (tablero[i][j]) {

                }
            }
        }
    }

    /**** addEventListeners botons dificultat ****/
    $('#bt-easy').click(() => {
        // neteja el tauler inicial
        $('.othello-board').empty();
        $('.othello-board').html(othelloBoard);
        mida = 4;
        generarTauler(mida);
    });

    $('#bt-normal').click(() => {
        // neteja el tauler inicial
        $('.othello-board').empty();
        $('.othello-board').html(othelloBoard);
        mida = 8;
        generarTauler(mida);
    });

    $('#bt-hard').click(() => {
        // neteja el tauler inicial
        $('.othello-board').empty();
        $('.othello-board').html(
            '<div class="fitxes blanques"></div><table></table><div class="fitxes negres"></div>'
        );
        mida = 12;
        generarTauler(mida);
    });

    /**** funció per generar el tauler i les fitxes, donat un mida ****/


    /**** primera inicialització tauler ****/
    generacionTablero();
});