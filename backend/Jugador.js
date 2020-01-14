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

        get nom() {
                return this.nom;
        }

        get email() {
                return this.email;
        }

        get password() {
                return this.password;
        }

        set nom(nom) {
                this.nom = nom;
        }

        set email(email) {
                this.email = email;
        }

        set password(password) {
                this.password = password;
        }

        /* ATENCION IMPORTANT: Los métodos se ponen sin ENCAPSULACION ni FUNCTION */
        static loginUsuari(usuari, password) {
                try {
                        dadesBd.mongoClient.connect(dadesBd.url, (err, db) => {
                                if (err) throw err;

                                const cursor = db
                                        .db(dadesBd.bd)
                                        .collection(dadesBd.jugadorsCollection)
                                        .find({
                                                $or: [{ nom: usuari }, { email: usuari }],
                                                $and: [{ password: password }],
                                        });

                                cursor.each(function(err, doc) {
                                        if (doc != null) {
                                                console.log(`Usuari: ${doc.nom} Contrasenya: ${doc.password}`);
                                                return true;
                                        }
                                        console.log(`Final`);
                                });

                                db.close();
                        });
                } catch (error) {
                        debug.writeDebug(`URL bases de dades: ${dadesBd.bd}`);
                        debug.writeDebug(
                                `Hi ha hagut un error a l'hora d'inserir el jugador a la base de dades.Error: ${error}`
                        );
                }
        }
}

module.exports = Jugador;
