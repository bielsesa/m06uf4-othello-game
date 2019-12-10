let server = require('./servidor');
let encaminador = require('./encaminador');
let manegadorPeticions = require('./manegadorPeticions');

let manegadors = {};
manegadors['/'] = manegadorPeticions.index;
manegadors['/favicon.ico'] = manegadorPeticions.favicon;
manegadors['/usuaris/signup'] = manegadorPeticions.signup;
manegadors['/usuaris/login'] = manegadorPeticions.login;
manegadors['/usuaris/iniciarPartida'] = manegadorPeticions.iniciarPartida;

server.iniciar(encaminador.encaminar, manegadors);