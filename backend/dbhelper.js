let mongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/othello'; // connecta a la base de dades 'othello' dins d'una bd MongoDB local al port 27017

let connexiobd = () => {
  mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('Connexió a la base de dades.');
    db.close();
  });
};

let registraJugador = nouJugador => {
  try {
    mongoClient.connect(url, (err, db) => {
      if (err) throw err;
  
      db.db('othello')
        .collection('jugadors')
        .insertOne({ nom: nouJugador.nom, email: nouJugador.email, contrasenya: nouJugador.contrasenya });
  
      db.close();
    });
  } catch(error) {
    console.log(`Hi ha hagut un error a l'hora d'inserir el jugador a la base de dades.
      Error: ${error}`);
  }
};

/****** Insereix una puntuació ******/
let inserirPuntuacio = (jugador, puntsJugador) => {
  try {
    mongoClient.connect(url, (err, db) => {
      if (err) throw err;
  
      db.db('othello')
        .collection('jugadors')
        .insertOne({ punts: puntsJugador, nom: jugador.nom });
  
      db.close();
    });
  } catch(error) {
    console.log(`Hi ha hagut un error a l'hora d'inserir la puntuació a la base de dades.
      Error: ${error}`);
  }
};

let actualitzaJugador = jugador => {};

let actualitzaPuntuacio = (jugador, punts) => {};

/****** Comprova si el nom d'usuari ja existeix ******/
let nomJugadorExistent = nouNom => {
  let existeix = false;
  try {
    mongoClient.connect(url, (err, db) => {
      if (err) throw err;
  
      db.db('othello')
        .collection('jugadors')
        .findOne({ nom: nouNom }, (err, res) => {
          if (err) throw err;
          if (res) existeix = true;
        });
  
      db.close();
    });

    return existeix;
  } catch(error) {
    console.log(`Hi ha hagut un error a l'hora de consultar la base de dades.
      Error: ${error}`);
  }
};

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
