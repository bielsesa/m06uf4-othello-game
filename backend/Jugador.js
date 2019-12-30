const dadesBd = require('./dadesbd');
const debug = require('./helperFunctions');

class Jugador {
        nom;

        email;

        password;

        constructor(nom, email, password) {
                this.nom = nom;
                this.email = email;
                this.password = password;

                /* Registre base de dades */
                try {
                        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
                                if (err) throw err;

                                // const j = { nom: nom, email: email, password: password };

                                db.db(dadesBd.bd)
                                        .collection(dadesBd.jugadorsCollection)
                                        .update(
                                                { nom: this.nom },
                                                { nom: nom, email: email, password: password },
                                                { upsert: true },
                                                (err, res) => {
                                                        debug.writeDebug(`Res: ${JSON.stringify(res)}.`);
                                                        if (res.result.nModified != 0) {
                                                                debug.writeDebug(`El jugador ja existeix.`);
                                                        } else {
                                                                debug.writeDebug(`Jugador nou registrat.`);
                                                        }
                                                }
                                        );
                                // UPSERT serveix per actualitzar si ja existeix, o inserir nou si no
                                // d'aquesta manera nosaltres assegurem que no s'insereix un jugador si ja existeix
                                // TODO si el jugador ja existeix, avisar de que existeix!

                                db.close();
                        });
                } catch (error) {
                        debug.writeDebug(`URL bases de dades: ${dadesBd.bd}`);
                        debug.writeDebug(
                                `Hi ha hagut un error a l'hora d'inserir el jugador a la base de dades.Error: ${error}`
                        );
                }
        }

        /* ATENCION IMPORTANT: Los métodos se ponen sin ENCAPSULACION ni FUNCTION */
}

module.exports = Jugador;
