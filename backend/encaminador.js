let encaminar = (manegadorPeticions, pathname, resposta, dades) => {
    if (typeof manegadorPeticions[pathname] === 'function') {
        return manegadorPeticions[pathname](resposta, dades);
    } else {
        console.log(`No s'ha trobat manegador per a ${pathname}`);
        return '404 Not found';
    }
}

exports.encaminar = encaminar;