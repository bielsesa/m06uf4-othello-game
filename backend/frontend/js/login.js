$().ready(() => {
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
                console.log(`Result: ${JSON.stringify(result)}`);
                $('#sent-data').html(result.responseText);
                if (result.ok == 1) {
                    document.getElementsByClassName('centre')[0].innerHTML = 'Login correcte';
                } else if (result.ok == 0) {
                    document.getElementsByClassName('centre')[0].innerHTML = 'Login incorrecte';
                }
            },
        });
    });
});
