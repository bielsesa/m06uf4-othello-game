$().ready(() => {
    $('#username').bind('keyup', e => {
        // CONSULTA AJAX PER MIRAR SI EL USERNAME JA ESTÀ AGAFAT
    });

    $('#email').bind('keyup', e => {
        // CONSULTA AJAX PER MIRAR SI EL CORREU JA ESTÀ AGAFAT
    });

    const comprovaContrasenya = e => {
        if ($('#password-repeat').val() !== $('#password').val()) {
            console.log(`Passwds no coincideix. Valors: ${$('#password').val()} , ${$('#password-repeat').val()}`);

            if ($('#span-notice').length === 0) {
                const spanNotice = document.createElement('span');
                spanNotice.id = 'span-notice';
                spanNotice.classList.add('badge');
                spanNotice.classList.add('badge-danger');
                spanNotice.innerText = 'La contrasenya no coincideix';
                $('#password-repeat').after(spanNotice);
            }

            return false;
        }
        console.log('Passwds coincideix');
        $('.badge-danger').remove();
        return true;
    };

    $('#password').bind('keyup', comprovaContrasenya);
    $('#password-repeat').bind('keyup', comprovaContrasenya);

    $('button[type="submit"]').on('click', e => {
        e.preventDefault();
        console.log(`${$('#username').val()} || ${$('#email').val()} || ${$('#password').val()}`);
        // CONSULTA AJAX PER ENVIAR LES DADES I GUARDAR-LES A LA BD
        $.ajax({
            url: '/signupUsuari',
            type: 'POST',
            contentType: 'application/json',
            data: {
                nom: `${$('#username').val()}`,
                email: `${$('#email').val()}`,
                password: `${$('#password').val()}`,
            },
            dataType: 'text/html',
            complete: (result, status, xhr) => {
                const data = JSON.parse(result.responseText);
                if (data.ok == '1') {
                    document.getElementsByClassName('centre')[0].innerHTML = '<p>Registre correcte</p>';
                } else if (data.ok == '0') {
                    document.getElementsByClassName('centre')[0].innerHTML = '<p>Registre incorrecte</p>';
                }
            },
        });
    });
});
