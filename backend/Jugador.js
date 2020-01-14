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
}

module.exports = Jugador;
