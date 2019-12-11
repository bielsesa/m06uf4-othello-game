let http = require('http');
let url = require('url');
let debug = require('./helperFunctions.js');
let fs = require('fs');
let path = require('path');

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
  '.ttf': 'aplication/font-sfnt'
};

let iniciar = (encaminar, manegadorPeticions) => {
  let onRequest = (request, response) => {
    let pathname = url.parse(request.url).pathname;
    let dadesPOST = '';
    let resposta;

    request.setEncoding('utf8');

    request.addListener('data', post => {
      dadesPOST += post;
      debug.writeDebug(`Rebut part del POST: ${post}`);
    });

    request.addListener('end', () => {
      debug.writeDebug('Entro a END');

      resposta = encaminar(manegadorPeticions, pathname, response, dadesPOST);

      debug.writeDebug(`Contingut resposta: ${resposta}`);

      if (resposta != undefined) {
        debug.writeDebug('Contingut resposta NO és undefined');

        if (resposta.tipus == 'arxiu') {
          fs.readFile('./frontend/index.html', (err, contingut) => {
            if (!err) {
              let ext = path.parse(resposta.nomArxiu).ext;
              response.writeHead(200, {
                'Content-Type': `${mimeType[ext]}; charset=utf-8`
              });
              response.write(contingut);
              response.end();
            } else {
              console.log(`S'ha produït un error: ${err}`);
              response.writeHead(500, {
                'Content-Type': 'text/plain; charset=utf-8'
              });
              response.write('Error 500');
              response.end();
            }
          });
        } else {
          response.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8'
          });
          
          response.write(resposta.res)
          response.end();
        }
      } else {
        debug.writeDebug('ContingutResposta ÉS undefined');
        response.writeHead(500, {
          'Content-Type': 'text/plain; charset=utf-8'
        }); //TODO CAMBIAR
        response.end();
      }
    });
  };

  http.createServer(onRequest).listen(8888);
  console.log(`Servidor iniciat al port 8888`);
};

exports.iniciar = iniciar;
