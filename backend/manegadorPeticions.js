/* eslint-disable no-param-reassign */
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const Jugador = require('./Jugador');
const dadesBd = require('./dadesbd');

const rootPath = './frontend';

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
    console.log(`PATHNAME: ${pathname}`);

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

const moureFitxa = (res, postData) => {
    const { jugadorId } = postData;
    const { salaId } = postData;

    res = { tipus: 'pasaTorn', jugadorId: jugadorId, salaId: salaId };
};

// const iniciarPartida = res => 'iniciar partida';

/* arxius estatics */

const index = res => {
    sendFile(res, `${rootPath}/index.html`);
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

/* exports */
exports.signupUsuari = signupUsuari;
exports.loginUsuari = loginUsuari;

exports.index = index;
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
