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
