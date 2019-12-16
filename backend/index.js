const server = require('./servidor');
const encaminador = require('./encaminador');
const manegadorPeticions = require('./manegadorPeticions');

const manegadors = {};
manegadors['/'] = manegadorPeticions.index;
manegadors['/index'] = manegadorPeticions.index;
manegadors['/favicon.ico'] = manegadorPeticions.favicon;
manegadors['/usuaris/signup'] = manegadorPeticions.signup;
manegadors['/usuaris/login'] = manegadorPeticions.login;
manegadors['/usuaris/iniciarPartida'] = manegadorPeticions.iniciarPartida;

server.iniciar(encaminador.encaminar, manegadors);
