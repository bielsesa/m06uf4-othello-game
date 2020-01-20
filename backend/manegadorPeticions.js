/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const dadesBd = require('./dadesbd');
const Partida = require('./Partida');
const Jugador = require('./Jugador');

const rootPath = './frontend';

let torn = 'n';
const partides = [];
const tauler = [
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 0, 0, 0, 0, -1, -1],
    [-1, -1, 0, 1, 2, 0, -1, -1],
    [-1, -1, 0, 2, 1, 0, -1, -1],
    [-1, -1, 0, 0, 0, 0, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1],
];

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

/* funció lectura arxius */
const sendFile = (res, pathname) => {
    fs.exists(pathname, exist => {
        if (!exist) {
            // if the file is not found, return 404
            res.statusCode = 404;
            return res.end(`File index.html not found!`);
        }

        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname += './index.html';
        }

        // read file from file system
        fs.readFile(pathname, function(err, data) {
            if (err) {
                res.statusCode = 500;
                return res.end(`Error getting the file: ${err}.`);
            }
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const { ext } = path.parse(pathname);
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            return res.end(data);
        });
    });
};

/* arxius estatics */

const index = res => {
    sendFile(res, `${rootPath}/index.html`);
};

const indexScript = res => {
    sendFile(res, `${rootPath}/js/index.js`);
};

const signup = res => {
    sendFile(res, `${rootPath}/signup.html`);
};
const signupScript = res => {
    sendFile(res, `${rootPath}/js/signup.js`);
};

const login = res => {
    sendFile(res, `${rootPath}/login.html`);
};
const loginScript = res => {
    sendFile(res, `${rootPath}/js/login.js`);
};

const joc = res => {
    sendFile(res, `${rootPath}/joc.html`);
};
const jocScript = res => {
    sendFile(res, `${rootPath}/js/joc.js`);
};

const othelloLogo = res => {
    sendFile(res, `${rootPath}/img/othello.png`);
};
const fitxaBlanca = res => {
    sendFile(res, `${rootPath}/img/fitxa-blanca.png`);
};
const fitxaNegra = res => {
    sendFile(res, `${rootPath}/img/fitxa-negra.png`);
};

const favicon = res => {
    sendFile(res, `${rootPath}/favicon.ico`);
};
const styles = res => {
    sendFile(res, `${rootPath}/css/styles.css`);
};
const jquery = res => {
    sendFile(res, `${rootPath}/jslibs/jquery-3.4.1.js`);
};

/* consultes ajax */
const signupUsuari = (res, data) => {
    const parsedData = querystring.parse(data); // <-- HACE EL PARSE DE LOS DATOS DEL POST!
    console.log(`Parsed data: 
        nom = ${parsedData.nom}
        email = ${parsedData.email}
        psswd = ${parsedData.password}
        `);

    /* connexió BD i registre */
    // const nouJugador = new Jugador(parsedData.nom, parsedData.email, parsedData.password);
    try {
        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
            if (err) throw err;

            db.db(dadesBd.bd)
                .collection(dadesBd.jugadorsCollection)
                .updateOne(
                    {
                        $or: [{ nom: parsedData.nom }, { email: parsedData.email }],
                    },
                    {
                        $setOnInsert: {
                            nom: parsedData.nom,
                            email: parsedData.email,
                            password: parsedData.password,
                        },
                    },
                    { upsert: true },
                    (err, dbRes) => {
                        console.log(`Result: ${dbRes}.`);
                        // if (dbRes != null) console.log(`nModified: ${dbRes.result.nModified}.`);
                        if (dbRes != null) console.log(`MatchedCount: ${dbRes.matchedCount}.`);
                        if (err != null) console.log(`Error: ${JSON.stringify(err)}`);
                        if (dbRes.matchedCount != 0) {
                            console.log(`El jugador ja existeix.`);
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            return res.end(JSON.stringify({ ok: 0 }));
                        }
                        console.log(`Jugador nou registrat.`);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        return res.end(
                            JSON.stringify({
                                ok: 1,
                                nom: parsedData.nom,
                                email: parsedData.email,
                                password: parsedData.password,
                            })
                        );
                    }
                );
            // UPSERT serveix per actualitzar si ja existeix, o inserir nou si no
            // d'aquesta manera nosaltres assegurem que no s'insereix un jugador si ja existeix
            // TODO si el jugador ja existeix, avisar de que existeix!

            db.close();
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error intern del servidor');
    }
};

const loginUsuari = (res, data) => {
    const parsedData = querystring.parse(data); // <-- HACE EL PARSE DE LOS DATOS DEL POST!
    console.log(`Parsed data: 
        nom = ${parsedData.usuari}
        psswd = ${parsedData.password}
        `);

    /* connexió BD i comprovació login */
    try {
        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
            if (err) throw err;

            const cursor = db
                .db(dadesBd.bd)
                .collection(dadesBd.jugadorsCollection)
                .find({
                    $or: [{ nom: parsedData.usuari }, { email: parsedData.usuari }],
                    $and: [{ password: parsedData.password }],
                });

            cursor.each(function(err, doc) {
                if (doc != null) {
                    console.log(`Usuari: ${doc.nom} Contrasenya: ${doc.password}`);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ ok: 1, usuari: doc.nom, password: doc.password }));
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ ok: 0 }));
            });

            db.close();
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error intern del servidor');
    }
};

const iniciaPartida = (res, data) => {
    const parsedData = querystring.parse(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });

    console.log(`Nom sala: ${parsedData.nomSala}`);

    const partidaExisteix = partides.filter(partida => partida.id == parsedData.nomSala)[0];

    if (partidaExisteix != undefined) {
        console.log('Partida existeix');
        const jugadorBlanquesExisteix = partidaExisteix.jugadorBlanques;
        if (jugadorBlanquesExisteix == undefined) {
            partidaExisteix.jugadorBlanques = new Jugador(parsedData.usuari);
            console.log('Jugador blanques ha entrat');

            return res.end(JSON.stringify({ ok: 1, fitxes: 'b' }));
        }
        console.log('La sala ja està plena');
        return res.end(JSON.stringify({ ok: 0 }));
    }
    const novaPartida = new Partida(parsedData.nomSala);
    novaPartida.jugadorNegres = new Jugador(parsedData.usuari);
    partides.push(novaPartida);
    console.log('Jugador negres ha entrat');
    return res.end(JSON.stringify({ ok: 1, fitxes: 'n' }));
};

const tornJugador = (res, data) => {
    const partida = partides.filter(p => p.id == querystring.parse(data).nomSala)[0];

    if (partida != undefined) {
        // console.log(`TAULER: ${partida.tauler[0]}\nTYPE: ${typeof tauler}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ torn: torn, tauler: partida.tauler }));
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end("No s'ha trobat la partida");
};

const canviaTornJugador = (res, data) => {
    const parsedData = querystring.parse(data);
    console.log(`${parsedData.tauler}`);

    torn = parsedData.torn;
    partides.filter(partida => partida.id == parsedData.nomSala)[0].tauler = parsedData.tauler;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ torn: torn }));
};

const finalitzaPartida = (res, data) => {
    const parsedData = querystring.parse(data);
    const partida = partides.filter(p => p.id == parsedData.nomSala)[0];
    // const partidaIdx = partides.findIndex(p => p.id == parsedData.nomSala);

    try {
        let usuari = '';

        if (parsedData.jugador == 'n') {
            usuari = partida.jugadorNegres;
        } else {
            usuari = partida.jugadorBlanques;
        }

        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
            if (err) throw err;

            db.db(dadesBd.bd)
                .collection(dadesBd.jugadorsCollection)
                .update(
                    {
                        $or: [{ nom: usuari }, { email: usuari }],
                    },
                    { $push: { puntuacions: parsedData.puntuacio } }
                );

            db.close();
        });

        // partides.splice(partidaIdx, 1);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ ok: 1 }));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error intern del servidor');
    }
};

const getTopPuntuacions = res => {
    try {
        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
            if (err) throw err;

            const topPuntuacions = [];

            db.db(dadesBd.bd)
                .collection(dadesBd.jugadorsCollection)
                .find()
                .sort({ puntuacions: -1 })
                .each(doc => {
                    topPuntuacions.add(doc.puntuacions);
                });

            db.close();
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error intern del servidor');
    }
};

/* exports */
exports.signupUsuari = signupUsuari;
exports.loginUsuari = loginUsuari;
exports.iniciaPartida = iniciaPartida;
exports.tornJugador = tornJugador;
exports.canviaTornJugador = canviaTornJugador;
exports.finalitzaPartida = finalitzaPartida;
exports.getTopPuntuacions = getTopPuntuacions;

exports.index = index;
exports.indexScript = indexScript;
exports.signup = signup;
exports.signupScript = signupScript;
exports.login = login;
exports.loginScript = loginScript;
exports.joc = joc;
exports.jocScript = jocScript;
exports.favicon = favicon;
exports.styles = styles;
exports.othelloLogo = othelloLogo;
exports.fitxaBlanca = fitxaBlanca;
exports.fitxaNegra = fitxaNegra;
exports.jquery = jquery;
