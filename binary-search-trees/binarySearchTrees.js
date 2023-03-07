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
        // finds minimum root below provide root
        let min = root.value;
        while (root.left != null) {
            min = root.left.value;
            root = root.left;
        }
        return min;
    }

    find(value, root = this.root) {
        if (root == null) {
            return "Value not in Tree";
        } else if (value === root.value) {
            return root;
        } else if (value < root.value) {
            return this.find(value, root.left);
        } else if (value > root.value) {
            return this.find(value, root.right);
        }
    }

    levelOrder(callback) {
        if (!this.root) return [];
        let queue = [this.root];
        const result = [];
        while (queue.length > 0) {
            let node = queue.shift();
            result.push(node.value);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
            if (callback) return callback(node);
        }
        if (!callback) return result;
    }

    inorder(callback, root = this.root, result = []) {
        if (root == null) return;
        // Left, Data, Right
        if (root != null) {
            this.inorder(callback, root.left, result);
            result.push(root.value);
            this.inorder(callback, root.right, result);
            if (callback) callback(root);
        }

        if (!callback) return result;
    }

    preorder(callback, root = this.root, result = []) {
        if (!this.root) return [];
        // Data, Left, Right

        if (root != null) {
            result.push(root.value);
            this.preorder(callback, root.left, result);
            this.preorder(callback, root.right, result);
            if (callback) callback(root);
        }

        if (!callback) return result;
    }

    postorder(callback, root = this.root, result = []) {
        if (!this.root) return [];
        // Left, Right, Data

        if (root != null) {
            this.postorder(callback, root.left, result);
            this.postorder(callback, root.right, result);
            result.push(root.value);
            if (callback) callback(root);
        }

        if (!callback) return result;
    }

    height(node = this.root) {
        // longest distance from node to leaf node below
        if (node === null) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        // Distance from node to root node
        let root = this.root;
        if (node === root) return 0;

        let distance = 0;
        while (root != null) {
            if (node.value < root.value) {
                root = root.left;
                distance += 1;
            } else if (node.value > root.value) {
                root = root.right;
                distance += 1;
            } else {
                return distance;
            }
        }

        return "Node not in Tree";
    }
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
let tree = new Tree(testArray);

tree.insert(80);
console.log(tree.find(324));
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.height(tree.find(3)));
console.log(tree.depth(tree.find(3)));

prettyPrint(tree.root);
