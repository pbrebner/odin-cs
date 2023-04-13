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
        let pathTaken = [start];
        let currentNode = NodeFactory(start, pathTaken);

        while (currentNode.pos[0] !== end[0] || currentNode.pos[1] !== end[1]) {
            let potenialMoves = [
                [currentNode.pos[0] + 2, currentNode.pos[1] - 1],
                [currentNode.pos[0] + 2, currentNode.pos[1] + 1],
                [currentNode.pos[0] - 2, currentNode.pos[1] - 1],
                [currentNode.pos[0] - 2, currentNode.pos[1] + 1],
                [currentNode.pos[0] + 1, currentNode.pos[1] - 2],
                [currentNode.pos[0] + 1, currentNode.pos[1] + 2],
                [currentNode.pos[0] - 1, currentNode.pos[1] - 2],
                [currentNode.pos[0] - 1, currentNode.pos[1] + 2],
            ];

            potenialMoves.forEach((move) => {
                let newNode = NodeFactory(
                    move,
                    currentNode.pathTaken.concat([move])
                );
                if (newNode) {
                    queue.push(newNode);
                }
            });

            currentNode = queue.shift();
        }

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

class Board {
    constructor() {}
}

const knight = new Knight();
knight.knightMoves([3, 3], [7, 7]);
