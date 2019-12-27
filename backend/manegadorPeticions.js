const querystring = require('querystring');
const fs = require('fs');
const { exec } = require('child_process');
const Jugador = require('./Jugador');

const rootPath = './frontend/';

const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt',
};

let child;
const debug = require('./helperFunctions');

const index = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}index.html` });

const signup = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}signup.html` });
const signupScript = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}/js/signup.js` });
const signupUsuari = (res, dades) => {
        // OK 200
        //debug.writeDebug(`Dades jugador (split): nom = ${dadesSplit[0]}, email = ${dadesSplit[1]}, contrasenya = ${dadesSplit[2]} `);
        separarDades(dades);
        const jugador = new Jugador(dades.nom, dades.email, dades.password);
        //debug.writeDebug(`Objecte jugador BD: ${JSON.stringify(jugador)}`);
};

const login = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}login.html` });
const loginScript = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}/js/login.js` });

const joc = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}joc.html` });
const jocScript = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}js/joc.js` });

// const iniciarPartida = res => 'iniciar partida';

/* funció per llegir un arxiu */
/* const llegirArxiu = pathArxiu => {  
        fs.exists(pathArxiu, function(exist) {
                if (!exist) {
                        // if the file is not found, return 404
                        res.statusCode = 404;
                        res.end(`File ${pathArxiu} not found!`);
                        return;
                }

                // if is a directory, then look for index.html
                // if (fs.statSync(pathname).isDirectory()) {
                //pathArxiu += '/index.html';
        } 

                // read file from file system
                fs.readFile(pathArxiu, function(err, data) {
                        if (err) {
                                res.statusCode = 500;
                                res.end(`Error getting the file: ${err}.`);
                        } else {
                                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                                const { ext } = path.parse(pathArxiu);
                                // if the file is found, set Content-type and send data
                                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                                res.end(data);
                        }
                });
        });
}; */

/* separar dades post */
const separarDades = (dadesPost) => {
        dadesArray = dadesPost.split('&');
        dadesArray.forEach(item => {
                console.log(`item indexof: ${item.indexOf('=')}`);
                item = item.slice(item.indexOf('='), (item.indexOf('=') + 1));
                console.log(`ITEM SPLICEADO: ${item}`);
        })
}

/* arxius estatics */
const favicon = res => ({ tipus: 'arxiu', nomArxiu: 'favicon.ico' });
const othelloLogo = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}img/othello.png` });
const fitxaBlanca = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}img/fitxa-blanca.png` });
const fitxaNegra = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}img/fitxa-negra.png` });
const styles = res => ({ tipus: 'arxiu', nomArxiu: `${rootPath}css/styles.css` });

exports.index = index;
exports.signup = signup;
exports.signupScript = signupScript;
exports.signupUsuari = signupUsuari;
exports.login = login;
exports.loginScript = loginScript;
exports.joc = joc;
exports.jocScript = jocScript;
// exports.iniciarPartida = iniciarPartida;
exports.favicon = favicon;
exports.styles = styles;
exports.othelloLogo = othelloLogo;
exports.fitxaBlanca = fitxaBlanca;
exports.fitxaNegra = fitxaNegra;
