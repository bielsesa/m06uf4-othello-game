const http = require('http');
const url = require('url');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

const iniciar = (encaminar, manegadorPeticions) => {
    const onReq = (req, res) => {
        const { pathname } = url.parse(req.url);

        let dataPOST = '';
        req.setEncoding('utf8');
        req.addListener('data', data => {
            dataPOST += data;
        });

        req.addListener('end', () => {
            encaminar(manegadorPeticions, pathname, res, dataPOST);
        });
    };

    http.createServer(onReq).listen(port);
    console.log(`Iniciat servidor al port ${port}`);
};

exports.iniciar = iniciar;
