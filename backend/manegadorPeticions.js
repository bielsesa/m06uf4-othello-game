let querystring = require("querystring");
let fs = require('fs');
let exec = require('child_process').exec,
  child;
let debug = require('./helperFunctions');

let index = (res) => {
  //TODO retornar pàgina d'inici

  fs.readFile('../frontend/index.html', (err, data) => {
    if (!err) {
      //console.log(`Dades llegides d'arxiu: ${data}`);
      debug.writeDebug(`Llegint dades d'arxiu`);
      
      debug.writeDebug(`Dades llegides:\n${data}`);
      return data;
    } else {
      console.log(`S'ha produït un error: ${err}`);
    }
  });
};

let signup = (res) => {
  //TODO registrar usuari a la BD i retornar missatge d'OK o no
  

  return 'signup';
};

let login = (res) => {
  //TODO verificar login i retornar missatge d'OK o no
  //i pàgina principal amb la info de l'usuari i el botó
  //d'iniciar partida
  return 'login';
};

let iniciarPartida = (res) => {
  //TODO retornar pàgina de partida
  return 'iniciar partida';
};

let favicon = (res) => { };

exports.index = index;
exports.signup = signup;
exports.login = login;
exports.iniciarPartida = iniciarPartida;
exports.favicon = favicon;