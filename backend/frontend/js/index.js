$().ready(() => {
    /* comprovació usuari loggejat */
    const usuari = localStorage.key('usuari');

    if (usuari != null) {
        /* usuari loggejat */
        $('#joc').removeClass('disabled');
        $('#signup').addClass('disabled');
        $('#login').addClass('disabled');
    }

    // $.get('/getTopPuntuacions', data => {
    //     const parsedData = JSON.parse(data);
    //     const taulaPunts = document.getElementById('puntuacions');

    //     parsedData.array.forEach(element => {});
    // });
});
