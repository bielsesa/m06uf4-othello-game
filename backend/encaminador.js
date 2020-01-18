const debug = require('./helperFunctions');

const encaminar = (manegadorPeticions, pathname, resposta, dades) => {
    if (typeof manegadorPeticions[pathname] === 'function') {
        return manegadorPeticions[pathname](resposta, dades);
    }
    debug.writeDebug(`No s'ha trobat manegador per a ${pathname}`);
    return '404 Not found';
};

exports.encaminar = encaminar;
