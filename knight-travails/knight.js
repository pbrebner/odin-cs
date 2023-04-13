function NodeFactory(pos, pathTaken) {
    if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
        return null;
    }

    return { pos, pathTaken };
}

class Knight {
    constructor() {}

    knightMoves(start, end) {
        let queue = [];
    }
}

class Board {
    constructor() {}
}
