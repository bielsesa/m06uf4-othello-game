const dadesBd = require('./dadesbd');
const debug = require('./helperFunctions');

class Jugador {
        nom;
        email;
        contrasenya;

        constructor(nom, email, contrasenya) {
                this.nom = nom;
                this.email = email;
                this.contrasenya = contrasenya;

                /* Registre base de dades */
                try {
                        debug.writeDebug(`URL bases de dades: ${dadesBd.bd}`);

                        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
                                if (err) throw err;

                                debug.writeDebug(`URL bases de dades: ${dadesBd.bd}`);

                                if (!this.existeixJugador) {
                                        db.db(dadesBd.bd)
                                                .collection(dadesBd.jugadorsCollection)
                                                .insertOne({
                                                        nom,
                                                        email,
                                                        contrasenya,
                                                });

                                        db.close();
                                } else {
                                        console.log('Aquest jugador ja existeix.');
                                }


                        });
                } catch (error) {
                        debug.writeDebug(`URL bases de dades: ${dadesBd.bd}`);
                        debug.writeDebug(
                                `Hi ha hagut un error a l'hora d'inserir el jugador a la base de dades.Error: ${error}`
                        );
                }
        }

        /* ATENCION IMPORTANT: Los métodos se ponen sin ENCAPSULACION ni FUNCTION */
        existeixJugador() {
                let existeix = false;
                try {
                        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
                                if (err) throw err;

                                db.db(dadesBd.bd)
                                        .collection(dadesBd.jugadorsCollection)
                                        .findOne({ nom: this.nom }, (err, res) => {
                                                if (err) throw err;
                                                if (res) existeix = true;
                                        });

                                db.close();
                        });

                        return existeix;
                } catch (error) {
                        debug.writeDebug(`Hi ha hagut un error a l'hora de consultar la base de dades.Error: ${error}`);
                }
        }
}

module.exports = Jugador;
