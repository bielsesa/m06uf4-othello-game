$().ready(() => {
  const othelloBoard =
    '<div class="fitxes blanques"></div><table></table><div class="fitxes negres"></div>';
  let iniciFiles = 65; // LLETRA A
  let tamany = 8;

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
    ev.target.appendChild(document.getElementById(data));
    document.getElementById(data).draggable = false; // un cop s'ha deixat la fitxa al tauler ja no es pot moure

    /**** desactivar drop a les caselles que ho tenen amb fitxa ****/
    /**** i activar-lo a les caselles que ho tenen sense fitxa ****/
    let rowId = ev.target.id.charCodeAt(0);
    let colId = ev.target.id.split('')[1] * 1;

    let newDroppableCells = [
      String.fromCharCode(rowId) + (colId - 1),
      String.fromCharCode(rowId) + (colId + 1),
      String.fromCharCode(rowId + 1) + (colId + 1),
      String.fromCharCode(rowId - 1) + (colId + 1),
      String.fromCharCode(rowId + 1) + (colId - 1),
      String.fromCharCode(rowId - 1) + (colId - 1),
      String.fromCharCode(rowId + 1) + colId,
      String.fromCharCode(rowId - 1) + colId
    ];

    newDroppableCells.forEach(cell => {
      /**** comprova si la cel·la és a dins de la taula ****/
      if (
        cell.charCodeAt(0) >= iniciFiles &&
        cell.charCodeAt(0) <= iniciFiles + tamany - 1
      ) {
        let cellElement = document.getElementById(`${cell}`);
        /**** comprova si la cel·la és buida (no té una fitxa ja) ****/
        if ($(`#${cell}`).children().length == 0) {
          /*$(`#${cell}`).on('drop', drop);
          $(`#${cell}`).on('dragover', allowDrop);    AMB AIXÒ NO FUNCIONA!!!!!!!!! NOMÉS AMB ADDEVENTLISTENER :(*/
          cellElement.addEventListener('drop', drop, true);
          cellElement.addEventListener('dragover', allowDrop, true);
        } else {
          /**** comprova si la cel·la té una fitxa del color contrari ****/
          console.log(`\n\n\n THIS CELL (${cell}) HAS A DISC\n`);
          console.log(`DISC COLOR: ${cellElement.children[0].getAttribute('src').includes('negra') ? 'negra' : 'blanca'}\n\n\n`);
        }
      }
    });
  };

  /**** addEventListeners botons dificultat ****/
  $('#bt-easy').click(() => {
    // neteja el tauler inicial
    $('.othello-board').empty();
    $('.othello-board').html(othelloBoard);
    tamany = 4;
    generarTauler(tamany);
  });

  $('#bt-normal').click(() => {
    // neteja el tauler inicial
    $('.othello-board').empty();
    $('.othello-board').html(othelloBoard);
    tamany = 8;
    generarTauler(tamany);
  });

  $('#bt-hard').click(() => {
    // neteja el tauler inicial
    $('.othello-board').empty();
    $('.othello-board').html(
      '<div class="fitxes blanques"></div><table></table><div class="fitxes negres"></div>'
    );
    tamany = 12;
    generarTauler(tamany);
  });

  /**** funció per generar el tauler i les fitxes, donat un tamany ****/
  let generarTauler = tamany => {
    let numFitxes = Math.pow(tamany, 2);
    console.log(
      `El tamany escollit pel tauler és: ${tamany} x ${tamany} = ${numFitxes}`
    );

    let fitxesNegresInicials = [
      `${String.fromCharCode(iniciFiles + tamany / 2) + tamany / 2}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 - 1) + (tamany / 2 + 1)}`
    ];

    let fitxesBlanquesInicials = [
      `${String.fromCharCode(iniciFiles + tamany / 2) + (tamany / 2 + 1)}`,
      `${String.fromCharCode(iniciFiles + (tamany / 2 - 1)) + tamany / 2}`
    ];

    let droppableCellsInicials = [
      `${String.fromCharCode(iniciFiles + tamany / 2 + 1) + (tamany / 2 - 1)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 + 1) + tamany / 2}`,
      `${String.fromCharCode(iniciFiles + tamany / 2) + (tamany / 2 - 1)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 - 1) + (tamany / 2 + 2)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 - 2) + (tamany / 2 + 1)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 - 2) + (tamany / 2 + 2)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 + 1) + (tamany / 2 + 1)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2 + 1) + (tamany / 2 + 2)}`,
      `${String.fromCharCode(iniciFiles + tamany / 2) + (tamany / 2 + 2)}`,
      `${String.fromCharCode(iniciFiles + (tamany / 2 - 1)) +
        (tamany / 2 - 1)}`,
      `${String.fromCharCode(iniciFiles + (tamany / 2 - 2)) +
        (tamany / 2 - 1)}`,
      `${String.fromCharCode(iniciFiles + (tamany / 2 - 2)) + tamany / 2}`
    ];

    for (let r = iniciFiles; r <= iniciFiles + tamany - 1; r++) {
      /**** afegeix la fila ****/
      let row = document.createElement('tr');
      row.id = `row-${String.fromCharCode(r)}`;
      $('table')[0].append(row);

      /**** afegeix les columnes a la fila ja inserida ****/
      for (let c = 1; c <= tamany; c++) {
        let col = document.createElement('td');
        col.id = `${String.fromCharCode(r) + c}`;
        let fitxa = document.createElement('img');

        if (fitxesNegresInicials.includes(col.id)) {
          /**** fitxes negres inicials ****/
          fitxa.setAttribute('src', '../frontend/img/fitxa-negra.png');
          fitxa.draggable = false;
          col.appendChild(fitxa);
        } else if (fitxesBlanquesInicials.includes(col.id)) {
          /**** fitxes blanques inicials ****/
          fitxa.setAttribute('src', '../frontend/img/fitxa-blanca.png');
          fitxa.draggable = false;
          col.appendChild(fitxa);
        } else if (droppableCellsInicials.includes(col.id)) {
          /**** afegeix els eventlisteners de drag&&drop a les columnes que envolten les fitxes ****/
          col.addEventListener('drop', drop);
          col.addEventListener('dragover', allowDrop);
        }

        //col.innerText = `${String.fromCharCode(r)+c}`;
        $(`#row-${String.fromCharCode(r)}`).append(col);
      }
    }

    /**** afegeix les fitxes de cada jugador ****/
    for (let i = 0; i < numFitxes / 2 - 2; i++) {
      let fb = document.createElement('img');
      fb.setAttribute('src', '../frontend/img/fitxa-blanca.png');
      fb.setAttribute('draggable', 'true');
      fb.id = `b-${i}`;
      //console.log(`FITXA BLANCA DRAG: ${fb.getAttribute('draggable')}`);
      fb.addEventListener('dragstart', drag);
      $('.blanques').append(fb);

      let fn = document.createElement('img');
      fn.setAttribute('src', '../frontend/img/fitxa-negra.png');
      fn.setAttribute('draggable', 'true');
      fn.id = `n-${i}`;
      //console.log(`FITXA NEGRA DRAG: ${fn.getAttribute('draggable')}`);
      fn.addEventListener('dragstart', drag);
      $('.negres').append(fn);
    }
  };

  /**** primera inicialització tauler ****/
  generarTauler(tamany);
});
