const server = require('./servidor');
const encaminador = require('./encaminador');
const manegadorPeticions = require('./manegadorPeticions');

const manegadors = {};

/* consultes ajax */
manegadors['/signupUsuari'] = manegadorPeticions.signupUsuari;
manegadors['/loginUsuari'] = manegadorPeticions.loginUsuari;
manegadors['/iniciaPartida'] = manegadorPeticions.iniciaPartida;
manegadors['/tornJugador'] = manegadorPeticions.tornJugador;
manegadors['/canviaTornJugador'] = manegadorPeticions.canviaTornJugador;
manegadors['/getTopPuntuacions'] = manegadorPeticions.getTopPuntuacions;

/* arxius estatics */
manegadors['/'] = manegadorPeticions.index;
manegadors['/index'] = manegadorPeticions.index;
manegadors['/js/index.js'] = manegadorPeticions.indexScript;
manegadors['/signup'] = manegadorPeticions.signup;
manegadors['/js/signup.js'] = manegadorPeticions.signupScript;
manegadors['/login'] = manegadorPeticions.login;
manegadors['/js/login.js'] = manegadorPeticions.loginScript;
manegadors['/joc'] = manegadorPeticions.joc;
manegadors['/js/joc.js'] = manegadorPeticions.jocScript;
manegadors['/img/othello.png'] = manegadorPeticions.othelloLogo;
manegadors['/img/fitxa-blanca.png'] = manegadorPeticions.fitxaBlanca;
manegadors['/img/fitxa-negra.png'] = manegadorPeticions.fitxaNegra;
manegadors['/css/styles.css'] = manegadorPeticions.styles;
manegadors['/favicon.ico'] = manegadorPeticions.favicon;

server.iniciar(encaminador.encaminar, manegadors);
