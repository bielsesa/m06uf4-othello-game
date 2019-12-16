const querystring = require('querystring');
const fs = require('fs');
const { exec } = require('child_process');

let child;
const debug = require('./helperFunctions');

const index = res => ({ tipus: 'arxiu', nomArxiu: 'index.html' });
const signup = res =>
        // TODO registrar usuari a la BD i retornar missatge d'OK o no

        ({ tipus: 'n', res: 'signup' });
const login = res =>
        // TODO verificar login i retornar missatge d'OK o no
        // i pàgina principal amb la info de l'usuari i el botó
        // d'iniciar partida
        'login';
const iniciarPartida = res =>
        // TODO retornar pàgina de partida
        'iniciar partida';
const favicon = res => ({ tipus: 'arxiu', nomArxiu: 'favicon.ico' });

exports.index = index;
exports.signup = signup;
exports.login = login;
exports.iniciarPartida = iniciarPartida;
exports.favicon = favicon;
