$().ready(() => {
    /* comprovació usuari loggejat */
    const usuari = localStorage.key('usuari');

    if (usuari != null) {
        /* usuari loggejat */
        window.location.replace('/joc');
    }

    $('button[type="submit"]').on('click', e => {
        e.preventDefault();
        console.log(`${$('#username').val()} - ${$('#password').val()}`);

        // CONSULTA AJAX PER ENVIAR LES DADES I GUARDAR-LES A LA BD
        $.ajax({
            url: '/loginUsuari',
            type: 'POST',
            contentType: 'application/json',
            data: {
                usuari: `${$('#username').val()}`,
                password: `${$('#password').val()}`,
            },
            dataType: 'application/json',
            complete: (result, status, xhr) => {
                const data = JSON.parse(result.responseText);
                if (data.ok == '1') {
                    document.getElementsByClassName('centre')[0].innerHTML = '<p>Login correcte</p>';
                    localStorage.setItem('usuari', data.usuari);
                    window.location.replace('/joc');
                } else if (data.ok == '0') {
                    document.getElementsByClassName('centre')[0].innerHTML = '<p>Login incorrecte</p>';
                }
            },
        });
    });
});
