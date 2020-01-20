/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */

$().ready(() => {
    const nomSala = prompt('Escriu el nom de la sala');
    let torn = 'n';
    let jugador = '';
    let isPaused = false;
    let tauler = [
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, 0, 1, 2, 0, -1, -1],
        [-1, -1, 0, 2, 1, 0, -1, -1],
        [-1, -1, 0, 0, 0, 0, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1],
    ];

    $(document).ajaxComplete(function(event, xhr, settings) {
        if (settings.url === '/canviaTornJugador') {
            console.log(`Triggered ajaxComplete handler. The result is ${xhr.responseText}`);

            console.log(`isPaused: ${isPaused}`);
            isPaused = false;
        }
    });

    $.ajax({
        url: '/iniciaPartida',
        type: 'POST',
        contentType: 'application/json',
        data: {
            usuari: `${localStorage.getItem('usuari')}`,
            nomSala: nomSala,
        },
        dataType: 'application/json',
        complete: (result, status, xhr) => {
            const data = JSON.parse(result.responseText);
            console.log(`Fitxes: ${data.fitxes}`);
            if (data.ok == 0) {
                window.alert('Aquesta sala ja està plena!');
                window.location.replace('/');
            } else if (data.ok == 1) {
                // eslint-disable-next-line no-use-before-define
                generarFitxesJugadorColor(data.fitxes);
                jugador = data.fitxes;
            }
        },
    });

    /* funcions drag&drop  */
    const allowDrop = ev => {
        ev.preventDefault();
    };

    const drag = ev => {
        ev.dataTransfer.setData('fitxa', ev.target.id);
        console.log(`DRAGGED: ${ev.target.id}`);
    };

    const drop = ev => {
        ev.preventDefault();
        isPaused = true;

        const data = ev.dataTransfer.getData('fitxa');

        // comprova que no hi ha ja una fitxa i després la mou
        if (ev.target.children.length == 0) ev.target.appendChild(document.getElementById(data).cloneNode(true));
        $(`.fitxes #${data}`).remove();

        document.getElementById(data).draggable = false; // un cop s'ha deixat la fitxa al tauler ja no es pot moure

        /* desactivar drop a les caselles que ho tenen amb fitxa  */
        /* i activar-lo a les caselles que ho tenen sense fitxa  */

        const colorFitxa = data.includes('n') ? 2 : 1;

        /* Row i Col on s'ha posat la fitxa  */
        const rowId = ev.target.id.split('')[0] * 1;
        const colId = ev.target.id.split('')[1] * 1;

        tauler[rowId][colId] = colorFitxa;

        const surroundingCells = [
            `${rowId}${colId - 1}`,
            `${rowId}${colId + 1}`,
            `${rowId + 1}${colId + 1}`,
            `${rowId - 1}${colId + 1}`,
            `${rowId + 1}${colId - 1}`,
            `${rowId - 1}${colId - 1}`,
            `${rowId + 1}${colId}`,
            `${rowId - 1}${colId}`,
        ];

        surroundingCells.forEach(cell => {
            /* comprova si la cel·la és a dins del taulell  */
            const row = cell[0];
            const col = cell[1];
            if (row >= 0 && row <= 7) {
                const cellElement = document.getElementById(`${cell}`);

                if (tauler[row][col] != 1 && tauler[row][col] != 2) {
                    tauler[row][col] = 0;
                }

                /* comprova si la cel·la és buida  */
                if (tauler[row][col] == 0) {
                    cellElement.addEventListener('drop', drop, true);
                    cellElement.addEventListener('dragover', allowDrop, true);
                } else if (tauler[row][col] == 1) {
                    /* comprova si la cel·la té una fitxa del color contrari  */

                    if (colorFitxa == 2) {
                        tauler[row][col] = 2;
                        cellElement.children[0].setAttribute('src', '../img/fitxa-negra.png');
                    }
                    cellElement.removeEventListener('drop', drop, true);
                    cellElement.removeEventListener('dragover', allowDrop, true);
                } else if (tauler[row][col] == 2) {
                    /* comprova si la cel·la té una fitxa del color contrari  */

                    if (colorFitxa == 1) {
                        tauler[row][col] = 1;
                        cellElement.children[0].setAttribute('src', '../img/fitxa-blanca.png');
                    }
                }
            }
        });

        // eslint-disable-next-line no-use-before-define
        regenerarTauler();

        if (torn == 'n') torn = 'b';
        else if (torn == 'b') torn = 'n';
        $('.fitxes').addClass('disabled');

        $.ajax({
            url: '/canviaTornJugador',
            type: 'POST',
            contentType: 'application/json',
            data: {
                torn: `${torn}`,
                tauler: tauler,
                nomSala: `${nomSala}`,
            },
        });
    };
    /* funcions per generar el tauler i les fitxes */

    const generarFitxesJugadorColor = fitxes => {
        /* afegeix les fitxes de cada jugador */

        for (let i = 0; i < 30; i++) {
            let src = '';
            let classe = '';
            if (fitxes == 'n') {
                src = '../img/fitxa-negra.png';
                classe = '.negres';
                document.getElementById('blanques').style.visibility = 'collapse';
            } else if (fitxes == 'b') {
                src = '../img/fitxa-blanca.png';
                classe = '.blanques';
                document.getElementById('negres').style.visibility = 'collapse';
            }
            const f = document.createElement('img');
            f.setAttribute('src', src);
            f.setAttribute('draggable', 'true');
            f.id = `${fitxes + i}`;
            f.addEventListener('dragstart', drag);

            $(classe).append(f);
        }
    };

    const regenerarTauler = () => {
        const board = document.getElementById('board');
        board.innerHTML = '';
        console.log(`REGENERACIÓ TAULER: ${tauler}`);
        for (let i = 0; i < 8; i++) {
            const row = board.insertRow(i);
            row.id = i;
            for (let j = 0; j < 8; j++) {
                const cell = row.insertCell(j);
                cell.id = `${i}${j}`;

                console.log(JSON.stringify(tauler[i][j]));
                if (tauler[i][j] == 0) {
                    /* afegeix els eventlisteners de drag&&drop a les columnes que envolten les fitxes  */
                    cell.addEventListener('drop', drop);
                    cell.addEventListener('dragover', allowDrop);
                    cell.style.backgroundColor = '#56c4aa';
                } else if (tauler[i][j] != -1) {
                    const fitxa = document.createElement('img');
                    if (tauler[i][j] == 1) {
                        fitxa.src = '../img/fitxa-blanca.png';
                        fitxa.draggable = false;
                        cell.appendChild(fitxa);
                    } else if (tauler[i][j] == 2) {
                        fitxa.src = '../img/fitxa-negra.png';
                        fitxa.draggable = false;
                        cell.appendChild(fitxa);
                    }
                }
            }
        }
    };

    /* primera inicialització tauler  */
    regenerarTauler();

    const interval = setInterval(() => {
        if (!isPaused) {
            $.ajax({
                url: '/tornJugador',
                type: 'POST',
                contentType: 'application/json',
                data: {
                    nomSala: `${nomSala}`,
                },
                dataType: 'application/json',
                complete: (result, status, xhr) => {
                    const data = JSON.parse(result.responseText);
                    torn = data.torn;
                    if (torn == 'n') {
                        $('#torn-jugador').innerHTML('<b>Negres</b>');
                    } else {
                        $('#torn-jugador').innerHTML('<b>Blanques</b>');
                    }

                    tauler = data.tauler;
                    if (jugador == data.torn) {
                        $('.fitxes').removeClass('disabled');
                    } else {
                        $('.fitxes').addClass('disabled');
                    }
                    regenerarTauler();
                },
            });
        }
    }, 500);

    $('#bt-acabar').click(() => {
        clearInterval(interval);
        let puntuacio = 0;

        tauler.forEach(fitxa => {
            if (jugador == 'n' && fitxa == 2) {
                puntuacio += 10;
            } else if (jugador == 'b' && fitxa == 1) {
                puntuacio += 10;
            }
        });

        $.post('/finalitzaPartida', JSON.stringify({ nomSala: nomSala, jugador: jugador, puntuacio: puntuacio }));
    });
});
