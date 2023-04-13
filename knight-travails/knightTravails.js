// Knight Travails

class GameBoard {
    constructor() {
        this.graph = this.makeGraph();
    }

    legalMoves = [
        [-2, -1],
        [-2, 1],
        [2, -1],
        [2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
    ];

    makeGraph() {
        let newGraph = [];

        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++)
                newGraph[i][j] = this.getGraphMove([i, j]);
        }

        return newGraph;
    }

    getGraphMove(pos) {
        let moves = [];

        this.legalMoves.forEach((move) => {
            let newX = pos[0] + move[0];
            let newY = pos[1] + move[1];

            if (newX > 0 && newX < 7 && newY > 0 && newY < 7) {
                moves.push([newX, newY]);
            }
        });
    }
}

function NodeFactory(pos, path) {
    return { pos, path };
}

class Knight {
    constructor() {}

    knightMoves() {}
}
