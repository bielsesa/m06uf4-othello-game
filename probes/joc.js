$().ready(() => {
  const othelloBoard =
    '<div class="fitxes blanques"></div><table></table><div class="fitxes negres"></div>';
  let iniciFiles = 65; // LLETRA A

  /**** funcions drag&drop ****/
  let allowDrop = ev => {
    ev.preventDefault();
  };

  let drag = ev => {
    ev.dataTransfer.setData('text', ev.target.id);
  };

  let drop = ev => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));

    /**** desactivar drop a les caselles que ho tenen amb fitxa ****/
    /**** i activar-lo a les caselles que ho tenen sense fitxa ****/
    console.log(`Dropped disc at: ${ev.target.id}`);
    let rowId = ev.target.id.charCodeAt(0);
    let colId = ev.target.id.split("")[1] * 1;


    let newDroppableCells = [
      String.fromCharCode(rowId) + (colId - 1),
      String.fromCharCode(rowId) + (colId + 1),
      String.fromCharCode(rowId + 1) + (colId + 1),
      String.fromCharCode(rowId - 1) + (colId + 1),
      String.fromCharCode(rowId + 1) + colId,
      String.fromCharCode(rowId - 1) + colId,
    ];

    for(cell in newDroppableCells) {
      console.log(`New droppable cell check, children length: ${$(`#${cell}`).children().length}`);
      console.log(`New droppable cell check, children: ${$(`#${cell}`).children()}`);
      if($(`#${cell}`).children().length == 0) {
        console.log(`NEW DROPPABLE CELL id: ${JSON.stringify($(`#${cell}`))}`);
        $(`#${cell}`).bind('drop', drop);
        $(`#${cell}`).bind('dragover', allowDrop);
      }
    }
  };

  /**** addEventListeners botons dificultat ****/
  $('#bt-easy').click(() => {
    // neteja el tauler inicial
    $('.othello-board').empty();
    $('.othello-board').html(othelloBoard);
    generarTauler(4);
  });

  $('#bt-normal').click(() => {
    // neteja el tauler inicial
    $('.othello-board').empty();
    $('.othello-board').html(othelloBoard);
    generarTauler(8);
  });

  $('#bt-hard').click(() => {
    // neteja el tauler inicial
    $('.othello-board').empty();
    $('.othello-board').html(
      '<div class="fitxes blanques"></div><table></table><div class="fitxes negres"></div>'
    );
    generarTauler(12);
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

    console.log(
      `DROPPABLE CELLS ID: ${JSON.stringify(droppableCellsInicials)}`
    );

    for (let r = iniciFiles + tamany - 1; r >= iniciFiles; r--) {
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
        } else if (fitxesBlanquesInicials.includes(col.id)) {
          /**** fitxes blanques inicials ****/
          fitxa.setAttribute('src', '../frontend/img/fitxa-blanca.png');
          fitxa.draggable = false;
        } else if (droppableCellsInicials.includes(col.id)) {
          /**** afegeix els eventlisteners de drag&&drop a les columnes que envolten les fitxes ****/
          col.addEventListener('drop', drop);
          col.addEventListener('dragover', allowDrop);
        }
        col.appendChild(fitxa);

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

  generarTauler(8);
});
