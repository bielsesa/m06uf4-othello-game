class Partida {
    id;

    jugadorNegres;

    jugadorBlanques;

    tauler;

    constructor(id) {
        this.id = id;
        this.tauler = [
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, 0, 0, 0, 0, -1, -1],
            [-1, -1, 0, 1, 2, 0, -1, -1],
            [-1, -1, 0, 2, 1, 0, -1, -1],
            [-1, -1, 0, 0, 0, 0, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1],
        ];
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

    get tauler() {
        return this.tauler;
    }

    set jugadorNegres(jugadorNegres) {
        this.jugadorNegres = jugadorNegres;
    }

    set jugadorBlanques(jugadorBlanques) {
        this.jugadorBlanques = jugadorBlanques;
    }

    set tauler(tauler) {
        this.tauler = tauler;
    }
}

module.exports = Partida;
