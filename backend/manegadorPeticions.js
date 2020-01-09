const querystring = require('querystring');
const fs = require('fs');
const { exec } = require('child_process');
const rootPath = './frontend/';

let child;
const debug = require('./helperFunctions');

const index = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'index.html' });

const signup = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'signup.html' });
const signupScript = res => ({ tipus: 'arxiu', nomArxiu: rootPath + '/js/signup.js' });

const login = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'login.html' });
const loginScript = res => ({ tipus: 'arxiu', nomArxiu: rootPath + '/js/login.js' });

const joc = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'joc.html' });
const jocScript = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'js/joc.js' });

const mourePieza = (res, postData) {
    var jugadorId = postData.jugadorId;
    var salaId = postData.salaId;

    res = { tipus: 'pasaTorn', 'jugadorId': jugadorId, 'salaId': salaId };
}

//const iniciarPartida = res => 'iniciar partida';

/* arxius estatics */
const favicon = res => ({ tipus: 'arxiu', nomArxiu: 'favicon.ico' });
const othelloLogo = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'img/othello.png' });
const fitxaBlanca = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'img/fitxa-blanca.png' });
const fitxaNegra = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'img/fitxa-negra.png' });
const styles = res => ({ tipus: 'arxiu', nomArxiu: rootPath + 'css/styles.css' });

exports.index = index;
exports.signup = signup;
exports.signupScript = signupScript;
exports.login = login;
exports.loginScript = loginScript;
exports.joc = joc;
exports.jocScript = jocScript;
//exports.iniciarPartida = iniciarPartida;
exports.favicon = favicon;
exports.styles = styles;
exports.othelloLogo = othelloLogo;
exports.fitxaBlanca = fitxaBlanca;
exports.fitxaNegra = fitxaNegra;