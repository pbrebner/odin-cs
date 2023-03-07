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
        let root = nodeFactory(array[mid]);

        root.left = this.buildTree(array, start, mid - 1);
        root.right = this.buildTree(array, mid + 1, end);

        return root;
    }

    insert(value) {
        this.root = this.insertRec(this.root, value);
    }

    insertRec(root, value) {
        if (root == null) {
            root = nodeFactory(value);
            return root;
        } else if (value < root.value) {
            root.left = this.insertRec(root.left, value);
        } else if (value > root.value) {
            root.right = this.insertRec(root.right, value);
        }

        return root;
    }

    delete(value) {
        this.root = this.deleteRec(this.root, value);
    }

    deleteRec(root, value) {
        if (root == null) {
            return root;
        }

        if (value < root.value) {
            root.left = this.deleteRec(root.left, value);
        } else if (value > root.value) {
            root.right = this.deleteRec(root.right, value);
        } else {
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            // and set value to root's value
            root.value = this.minRoot(root.right);

            //delete inorder successor
            root.right = this.deleteRec(root.right, root.value);
        }

        return root;
    }

    minRoot(root) {
        let min = root.value;
        while (root.left != null) {
            min = root.left.value;
            root = root.left;
        }
        return min;
    }

    find() {}
}

const nodeFactory = (value = null, left = null, right = null) => {
    return { value, left, right };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree([1, 50, 4, 30, 40]);

tree.insert(80);
tree.delete(30);

prettyPrint(tree.root);
