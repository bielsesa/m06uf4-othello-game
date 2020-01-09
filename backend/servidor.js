const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const debug = require('./helperFunctions');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

/* Info de les partides */
var partides = [{ 'jugadorN': {}, 'jugadorB': {}, 'torn': 'N' }];

partides[0].jugadorB = { jugadorId = 1, fitxes: 'B' };
partides[0].jugadorN = { jugadorId = 0, fitxes: 'N' };
partides[0].torn = 'N';

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

const iniciar = (encaminar, manegadorPeticions) => {
    const onreq = (req, res) => {
        debug.writeDebug(`${req.method} ${req.url}`);

        // parseja la URL
        // const parsedUrl = url.parse(req.url);
        const { pathname } = url.parse(req.url);

        // extract URL path
        // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
        // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
        // by limiting the path to current directory only
        /* const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
        const pathname = path.join(__dirname, sanitizePath); */

        // body data the client might send us
        let dadesPOST = '';

        // we'll save the response here
        // will depend on the request (since there'll be AJAX requests too)
        let resposta;

        // set encoding of response to UTF-8
        req.setEncoding('utf8');

        req.addListener('data', post => {
            dadesPOST += post;
            debug.writeDebug(`Rebut part del POST: ${post}`);
        });

        req.addListener('end', () => {
            resposta = encaminar(manegadorPeticions, pathname, res, dadesPOST);

            debug.writeDebug(`Contingut resposta: ${JSON.stringify(resposta)}`);

            if (resposta !== undefined) {
                if (resposta.tipus === 'arxiu') {
                    debug.writeDebug(`Nom arxiu de la resposta: ${resposta.nomArxiu}`);
                    fs.exists(resposta.nomArxiu, function(exist) {
                        if (!exist) {
                            // if the file is not found, return 404
                            res.statusCode = 404;
                            res.end(`File ${resposta.nomArxiu} not found!`);
                            return;
                        }

                        // if is a directory, then look for index.html
                        /* if (fs.statSync(pathname).isDirectory()) {
                                resposta.nomArxiu += '/index.html';
                        } */

                        // read file from file system
                        fs.readFile(resposta.nomArxiu, function(err, data) {
                            if (err) {
                                res.statusCode = 500;
                                res.end(`Error getting the file: ${err}.`);
                            } else {
                                // based on the URL path, extract the file extention. e.g. .js, .doc, ...
                                const { ext } = path.parse(resposta.nomArxiu);
                                // if the file is found, set Content-type and send data
                                res.setHeader(
                                    'Content-type',
                                    mimeType[ext] || 'text/plain'
                                );
                                res.end(data);
                            }
                        });
                    });
                } else if (resposta.tipus === 'pasaTorn') {
                    partides[]
                } else {
                    // AJAX and other kinds of petitions

                    res.writeHead(200, {
                        'Content-Type': 'text/plain; charset=utf-8',
                    });

                    res.write(resposta.res);
                    res.end();
                }
            } else {
                debug.writeDebug('ContingutResposta ÉS undefined');
                res.writeHead(500, {
                    'Content-Type': 'text/plain; charset=utf-8',
                }); // TODO CAMBIAR
                res.end();
            }
        });
    };

    http.createServer(onreq).listen(port);
    debug.writeDebug(`Servidor iniciat al port ${port}.`);
};

exports.iniciar = iniciar;