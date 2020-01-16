class Partida {
    id;

    jugadorNegres;

    jugadorBlanques;

    constructor(id) {
        this.id = id;
    }

    get id() {
        return this.id;
    }

    get jugadorNegres() {
        return this.jugadorNegres;
    }

    get jugadorBlanques() {
        return this.jugadorBlanques;
    }

    set jugadorNegres(jugadorNegres) {
        this.jugadorNegres = jugadorNegres;
    }

    set jugadorBlanques(jugadorBlanques) {
        this.jugadorBlanques = jugadorBlanques;
    }
}

module.exports = Partida;
