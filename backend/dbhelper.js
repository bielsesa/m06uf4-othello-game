let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/othello'; // connecta a la base de dades 'othello' dins d'una bd MongoDB local al port 27017

let connexiobd = () => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('Connexió a la base de dades.');
    db.close();
  });
};

let inserirJugador = nouJugador => {};

let inserirPuntuacio = (jugador, punts) => {};

let actualitzaJugador = jugador => {};

let actualitzaPuntuacio = (jugador, punts) => {};

let trobaJugador = jugador => {};

let mostraMillorsPuntuacions = num => {
  let puntuacionsResultat;
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;

    puntuacionsResultat = db
      .db('othello')
      .collection('puntuacions')
      .find()
      .sort({ punts: 1 })
      .limit(num);

    db.close();
  });

  return puntuacionsResultat;
};

// EXPORTACIONS
exports.connexiobd = connexiobd;
exports.inserirJugador = inserirJugador;
exports.inserirPuntuacio = inserirPuntuacio;
exports.actualitzaJugador = actualitzaJugador;
exports.actualitzaPuntuacio = actualitzaPuntuacio;
exports.trobaJugador = trobaJugador;
