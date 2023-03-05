// Linked List Practice

class LinkedList {
    length = 0;
    listHead = null;

    append(value) {
        const newNode = nodeFactory(value);
        this.length += 1;

        if (this.listHead === null) {
            this.listHead = newNode;
            return;
        }

        let pointer = this.listHead;
        while (pointer.nextNode !== null) {
            pointer = pointer.nextNode;
        }
        pointer.nextNode = newNode;
    }

    prepend(value) {
        const newNode = nodeFactory(value, this.listHead);
        this.length += 1;

        this.listHead = newNode;
    }

    size() {
        return this.length;
    }

    head() {
        return this.listHead;
    }

    tail() {
        let pointer = this.listHead;

        while (pointer.nextNode !== null) {
            pointer = pointer.nextNode;
        }

        return pointer;
    }
}

const nodeFactory = (value = null, nextNode = null) => {
    return { value, nextNode };
};

let list = new LinkedList();
list.append(5);
list.append("test");
list.prepend("first");
console.log(list.size());
console.log(list.head());
console.log(list.tail());