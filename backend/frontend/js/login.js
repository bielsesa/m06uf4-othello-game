$().ready(() => {
    $('#username').bind('keyup', e => {
            // CONSULTA AJAX PER MIRAR SI EL USERNAME JA ESTÀ AGAFAT
    });

    $('#email').bind('keyup', e => {
            // CONSULTA AJAX PER MIRAR SI EL CORREU JA ESTÀ AGAFAT
    });

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
                    dataType: 'text/html',
                    complete: (result, status, xhr) => {
                            console.log(`Result: ${JSON.stringify(result)}`);
                            $('#sent-data').html(result.responseText);
                    },
            });
    });
});
