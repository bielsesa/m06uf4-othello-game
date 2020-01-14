$().ready(() => {
    /* comprovació usuari loggejat */
    const usuari = localStorage.key('usuari');

    if (usuari != null) {
        /* usuari loggejat */
        console.log('loggejat');
        $('#joc').toggleClass('disabled');
    }
});
