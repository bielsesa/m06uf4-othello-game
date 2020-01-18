$().ready(() => {
    /* comprovació usuari loggejat */
    const usuari = localStorage.key('usuari');

    if (usuari != null) {
        /* usuari loggejat */
        $('#joc').removeClass('disabled');
        $('#signup').addClass('disabled');
        $('#login').addClass('disabled');
    }
});
