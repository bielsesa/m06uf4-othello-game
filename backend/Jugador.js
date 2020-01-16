class Jugador {
    nom;

    puntuacio;

    constructor(nom) {
        this.nom = nom;
    }

    get nom() {
        return this.nom;
    }

    get puntuacio() {
        return this.puntuacio;
    }

    set nom(nom) {
        this.nom = nom;
    }

    set puntuacio(puntuacio) {
        this.puntuacio = puntuacio;
    }

    /* ATENCION IMPORTANT: Los métodos se ponen sin ENCAPSULACION ni FUNCTION */
}

module.exports = Jugador;
