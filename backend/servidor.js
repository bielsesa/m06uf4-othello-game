let http = require('http');
let url = require('url');
let dbhelper = require('./dbhelper');

let iniciar = () => {
    let onRequest = (req, res) => {
        let ruta = url.parse(req.url).pathname;

        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        res.write(`camí: ${ruta} \n`);

        let consulta = url.parse(req.url, true).query;
        res.write(`consulta: ${url.parse(req.url).query} \n`);
        res.write(`parametre: ${consulta.parametre} \n`);
        res.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log(`Servidor iniciat al port 8888`);
}

exports.iniciar = iniciar;