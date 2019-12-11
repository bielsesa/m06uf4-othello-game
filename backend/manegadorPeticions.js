let querystring = require('querystring');
let fs = require('fs');
let exec = require('child_process').exec,
  child;
let debug = require('./helperFunctions');

let index = res => {
  //TODO retornar pàgina d'inici

  return { tipus: 'arxiu', nomArxiu: 'index.html' };
};

let signup = res => {
  //TODO registrar usuari a la BD i retornar missatge d'OK o no

  return { tipus: 'n', res: 'signup' };
};

let login = res => {
  //TODO verificar login i retornar missatge d'OK o no
  //i pàgina principal amb la info de l'usuari i el botó
  //d'iniciar partida
  return 'login';
};

let iniciarPartida = res => {
  //TODO retornar pàgina de partida
  return 'iniciar partida';
};

let favicon = res => {
  console.log('Petició a favicon');
};

exports.index = index;
exports.signup = signup;
exports.login = login;
exports.iniciarPartida = iniciarPartida;
exports.favicon = favicon;
