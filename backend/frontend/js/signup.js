$().ready(() => {
  $('#username').bind('keyup', e => {
    // CONSULTA AJAX PER MIRAR SI EL USERNAME JA ESTÀ AGAFAT
  });
  
  $('#email').bind('keyup', e => {
    // CONSULTA AJAX PER MIRAR SI EL CORREU JA ESTÀ AGAFAT
  });

  let comprovaContrasenya = e => {
    if ($('#password-repeat').val() != $('#password').val()) {
      console.log(
        `Passwds no coincideix. Valors: ${$('#password').val()} , ${$(
          '#password-repeat'
        ).val()}`
      );

      if ($('#span-notice').length == 0) {
        let spanNotice = document.createElement('span');
        spanNotice.id = 'span-notice';
        spanNotice.classList.add('badge');
        spanNotice.classList.add('badge-danger');
        spanNotice.innerText = 'La contrasenya no coincideix';
        $('#password-repeat').after(spanNotice);
      }

      return false;
    } else {
      console.log('Passwds coincideix');
      $('.badge-danger').remove();
      return true;
    }
  };

  $('#password').bind('keyup', comprovaContrasenya);
  $('#password-repeat').bind('keyup', comprovaContrasenya);

  $('form').on('submit', e => {
    console.log(`${$('#username').val()} || ${$('#email').val()} || ${$('#password').val()}`);

    e.preventDefault();

    // CONSULTA AJAX PER ENVIAR LES DADES I GUARDAR-LES A LA BD
  });
});
