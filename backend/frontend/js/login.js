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
                console.log(`OK: ${result.ok}`);
                if (result.responseText.ok == '1') {
                    document.getElementById('info').innerHTML = '<p>Login correcte</p>';
                    $('#info').html('<p>Login correcte</p>');
                    console.log('Login correcte');
                } else if (result.responseText.ok == '0') {
                    document.getElementById('info').innerHTML = '<p>Login incorrecte</p>';
                    $('#info').html('<p>Login incorrecte</p>');
                    console.log('Login incorrecte');
                }
            },
        });
    });
});
