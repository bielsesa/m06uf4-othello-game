const dadesBd = require('./dadesbd');
const debug = require('./helperFunctions');

class Puntuacio {
        punts;

        jugador;

        constructor(punts, jugador) {
                this.punts = punts;
                this.jugador = jugador;

                try {
                        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
                                if (err) throw err;

                                db.db(dadesBd.bd)
                                        .collection(dadesBd.puntuacionsCollection)
                                        .insertOne({ punts, jugador: jugador.id });

                                db.close();
                        });
                } catch (error) {
                        debug.writeDebug(
                                `Hi ha hagut un error a l'hora d'inserir la puntuació a la base de dades. Error: ${error}`
                        );
                }
        }
}
