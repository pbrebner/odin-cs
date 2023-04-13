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

    // Represent the graph as an Adjancency List (With nested indexes)
    makeGraph() {
        let newGraph = [];

        for (let i = 0; i <= 7; i++) {
            newGraph[i] = [];
            for (let j = 0; j <= 7; j++)
                newGraph[i][j] = this.getGraphMove([i, j]);
        }
        return newGraph;
    }

    //Based on current position, get all moves available
    getGraphMove(pos) {
        let moves = [];

        this.legalMoves.forEach((move) => {
            let newX = pos[0] + move[0];
            let newY = pos[1] + move[1];

            if (newX > 0 && newX < 7 && newY > 0 && newY < 7) {
                moves.push([newX, newY]);
            }
        });

        return moves;
    }
}

function NodeFactory(pos, pathTaken) {
    return { pos, pathTaken };
}

class Knight {
    constructor(graph) {
        this.graph = graph;
    }

    knightMoves(start, end) {
        if (
            !Array.isArray(start) ||
            !Array.isArray(end) ||
            start.length !== 2 ||
            end.length !== 2
        ) {
            console.log(
                "ERROR: Must provide an array of length 2 for both start and end with values from 0 to 7"
            );
            return;
        }

        if (start[0] < 0 || start[0] > 7 || start[1] < 0 || start[1] > 7) {
            console.log("ERROR: Start array values must be from 0 to 7");
            return;
        }

        if (end[0] < 0 || end[0] > 7 || end[1] < 0 || end[1] > 7) {
            console.log("ERROR: End array values must be from 0 to 7");
            return;
        }

        // Find shortest path using breadth first search
        let queue = [];
        let pathTaken = [start];

        let currentNode = NodeFactory(start, pathTaken);

        // WHile not at end position, go through each move available at current position,
        // create new node with move as posiiton, and add to queue
        while (currentNode.pos[0] !== end[0] || currentNode.pos[1] !== end[1]) {
            this.graph[currentNode.pos[0]][currentNode.pos[1]].forEach(
                (move) => {
                    let newNode = NodeFactory(
                        move,
                        currentNode.pathTaken.concat([move])
                    );
                    queue.push(newNode);
                }
            );

            currentNode = queue.shift();
        }

        // Print out the results
        console.log(
            `=> You made it in ${
                currentNode.pathTaken.length - 1
            } moves! Here's your path:`
        );
        currentNode.pathTaken.forEach((path) => {
            console.log(path);
        });
    }
}

const board = new GameBoard();
const knight = new Knight(board.graph);

knight.knightMoves([3, 3], [4, 3]);
