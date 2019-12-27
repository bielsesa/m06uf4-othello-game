$().ready(() => {
        $('#username').bind('keyup', e => {
                // CONSULTA AJAX PER MIRAR SI EL USERNAME JA ESTÀ AGAFAT
        });

        $('#email').bind('keyup', e => {
                // CONSULTA AJAX PER MIRAR SI EL CORREU JA ESTÀ AGAFAT
        });

        const comprovaContrasenya = e => {
                if ($('#password-repeat').val() !== $('#password').val()) {
                        console.log(
                                `Passwds no coincideix. Valors: ${$('#password').val()} , ${$(
                                        '#password-repeat'
                                ).val()}`
                        );

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

        $('form').on('submit', e => {
                e.preventDefault();
                console.log(`${$('#username').val()} || ${$('#email').val()} || ${$('#password').val()}`);
                // CONSULTA AJAX PER ENVIAR LES DADES I GUARDAR-LES A LA BD
                /* $.post(
                        '/signupUsuari',
                        {
                                nom: $('#username').val(),
                                email: $('#email').val(),
                                password: $('#password').val(),
                        },
                        function(data, status) {
                                alert(`Data: ${data}\nStatus: ${status}`);
                        }
                ); */

                $.ajax({
                        contentType: 'application/json',
                        data: {
                                nom: $('#username').val(),
                                email: $('#email').val(),
                                password: $('#password').val(),
                        },
                        dataType: 'json',
                        success(data) {
                                console.log('device control succeeded');
                        },
                        error() {
                                console.log('Device control failed');
                        },
                        processData: false,
                        type: 'POST',
                        url: '/signupUsuari',
                });
        });
});
