$().ready(() => {
    let othelloBoard = [];
    for (let r = 72; r >= 65; r--) {
        /**** afegeix la fila ****/
        let row = document.createElement('tr');
        row.id = `row-${String.fromCharCode(r)}`;
        $('table')[0].after(row);

        /**** afegeix les columnes a la fila ja inserida ****/
        for (let c = 1; c <= 8; c++) {
            let col = document.createElement('td');
            col.id = `${String.fromCharCode(r)+c}`;
            if (col.id == 'D4' || col.id == 'E5') {
                let fitxa = document.createElement('img');
                fitxa.setAttribute('src', 'img/fitxa-negra.png');
                col.appendChild(fitxa);
            } else if (col.id == 'D5' || col.id == 'E4') {
                let fitxa = document.createElement('img');
                fitxa.setAttribute('src', 'img/fitxa-blanca.png');
                col.appendChild(fitxa);
            } else {
                col.innerText = "1";
            }
            //col.innerText = `${String.fromCharCode(r)+c}`;
            $(`#row-${String.fromCharCode(r)}`).append(col);
        }
    }
});