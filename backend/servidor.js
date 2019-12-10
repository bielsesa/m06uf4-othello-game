let http = require('http');
let url = require('url');
let debug = require('./helperFunctions.js');

let iniciar = (encaminar, manegadorPeticions) => {
  let onRequest = (request, response) => {
    let pathname = url.parse(request.url).pathname;
    let dadesPOST = '';
    let contingutResposta;

    request.setEncoding('utf8');

    request.addListener('data', post => {
      dadesPOST += post;
      debug.writeDebug(`Rebut part del POST: ${post}`);
    });

    request.addListener('end', () => {
      debug.writeDebug('Entro a END');

      contingutResposta = encaminar(
        manegadorPeticions,
        pathname,
        response,
        dadesPOST
      );

      debug.writeDebug(`Contingut resposta: ${contingutResposta}`);

      if (contingutResposta != undefined) {
        debug.writeDebug('Contingut resposta NO és undefined');

        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); //TODO CAMBIAR
        response.write(contingutResposta);
      } else {
        debug.writeDebug('ContingutResposta ÉS undefined');  
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); //TODO CAMBIAR
      }

      response.end();
    });
  };

  http.createServer(onRequest).listen(8888);
  console.log(`Servidor iniciat al port 8888`);
};

exports.iniciar = iniciar;
