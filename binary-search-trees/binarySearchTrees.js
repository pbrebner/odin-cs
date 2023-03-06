// Practice building binary search trees

class Tree {
    constructor(array) {
        this.array = array;
        this.sortedArray = this.mergeSort(this.array);
        this.root = this.buildTree(
            this.sortedArray,
            0,
            this.sortedArray.length - 1
        );
    }

    mergeSort(array) {
        // Sorts the array and also removes duplicates
        let len = array.length;

        if (len < 2) {
            return array;
        } else {
            //sort left half of array
            let leftSort = this.mergeSort(array.slice(0, Math.floor(len / 2)));
            //sort right half of array
            let rightSort = this.mergeSort(array.slice(Math.floor(len / 2)));
            //merge sorted array
            let sortedArray = [];
            let i = 0;
            let j = 0;

            while (i < leftSort.length || j < rightSort.length)
                if (leftSort[i] < rightSort[j] || !rightSort[j]) {
                    if (sortedArray[sortedArray.length - 1] === leftSort[i]) {
                        i += 1;
                    } else {
                        sortedArray.push(leftSort[i]);
                        i += 1;
                    }
                } else {
                    if (sortedArray[sortedArray.length - 1] === rightSort[j]) {
                        j += 1;
                    } else {
                        sortedArray.push(rightSort[j]);
                        j += 1;
                    }
                }
            console.log(sortedArray);
            return sortedArray;
        }
    }

    buildTree(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = Math.ceil((start + end) / 2);
        let newNode = nodeFactory(array[mid]);

        newNode.left = this.buildTree(array, start, mid - 1);
        newNode.right = this.buildTree(array, mid + 1, end);

        return newNode;
    }
}

const nodeFactory = (data, left = null, right = null) => {
    return { data, left, right };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(testArray);

prettyPrint(tree.root);
