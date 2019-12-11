$().ready(() => {
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
    console.log(`Event target: ${ev.target}`);
    ev.target.appendChild(document.getElementById(data));
  };

  let othelloBoard = [];
  for (let r = 72; r >= 65; r--) {
    /**** afegeix la fila ****/
    let row = document.createElement('tr');
    row.id = `row-${String.fromCharCode(r)}`;
    $('table')[0].after(row);

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
        col.ondrop = drop;
        col.ondragover = allowDrop;

        fitxa.setAttribute('src', '../frontend/img/fitxa-buida.png');
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
    fb.ondragstart = drag;
    $('.blanques').append(fb);

    let fn = document.createElement('img');
    fn.setAttribute('src', '../frontend/img/fitxa-negra.png');
    fn.setAttribute('draggable', 'true');
    fn.ondragstart = drag;
    $('.negres').append(fn);
  }
});
