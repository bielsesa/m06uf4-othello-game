$().ready(() => {
    /* comprovació usuari loggejat */
    const usuari = localStorage.key('usuari');

    if (usuari != null) {
        /* usuari loggejat */
        $('#joc').removeClass('disabled');
        $('#signup').addClass('disabled');
        $('#login').addClass('disabled');
    }

    $.ajax({
        url: '/getTopPuntuacions',
        type: 'GET',
        dataType: 'application/json',
        complete: (result, status, xhr) => {
            const parsedData = JSON.parse(result.responseText);
            const taulaPunts = document.getElementById('puntuacions');

            console.log(JSON.stringify(parsedData.top));
        },
    });
});
