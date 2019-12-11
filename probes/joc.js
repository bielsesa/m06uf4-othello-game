/**** funcions drag&drop ****/
function allowDrop (ev) {
  ev.preventDefault();
};

function drag (ev) {
  console.log('DRAG');
  ev.dataTransfer.setData('text', ev.target.id);
};

function drop (ev) {
  ev.preventDefault();
  console.log(`${ev.target.tagName}`);
  var data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
};


$().ready(() => {
  
  let othelloBoard = [];
  let files, columnes = 8;
  let inici = 65; // LLETRA A
  
  for (let r = 72; r >= 65; r--) {
    /**** afegeix la fila ****/
    let row = document.createElement('tr');
    row.id = `row-${String.fromCharCode(r)}`;
    $('table')[0].append(row);

    /**** afegeix les columnes a la fila ja inserida ****/
    for (let c = 1; c <= 8; c++) {
      let col = document.createElement('td');
      col.id = `${String.fromCharCode(r) + c}`;
      let fitxa = document.createElement('img');

      if (col.id == 'D4' || col.id == 'E5') {
        /**** fitxes negres inicials ****/
        fitxa.setAttribute('src', '../frontend/img/fitxa-negra.png');
      } else if (col.id == 'D5' || col.id == 'E4') {
        /**** fitxes blanques inicials ****/
        fitxa.setAttribute('src', '../frontend/img/fitxa-blanca.png');
      } else {
        /**** llocs buits inicials ****/
        /**** s'ha de poder fer drop a aquestes columnes ****/
        col.addEventListener('drop', drop);
        col.addEventListener('dragover', allowDrop);

        //fitxa.setAttribute('src', '../frontend/img/fitxa-buida.png');
      }
      col.appendChild(fitxa);

      //col.innerText = `${String.fromCharCode(r)+c}`;
      $(`#row-${String.fromCharCode(r)}`).append(col);
    }
  }

  /**** afegeix les fitxes de cada jugador ****/
  for (let i = 0; i < 30; i++) {
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
});
