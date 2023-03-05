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

    at(index) {
        if (index >= this.length) {
            return "Invalid Index";
        }

        let i = 0;

        let pointer = this.listHead;

        while (i < index) {
            pointer = pointer.nextNode;
            i += 1;
        }

        return pointer;
    }

    pop() {
        if (this.length === 0) {
            return;
        }

        let pointer = this.listHead;
        let previousNode;

        while (pointer.nextNode !== null) {
            previousNode = pointer;
            pointer = pointer.nextNode;
        }

        previousNode.nextNode = null;

        if (this.length === 1) {
            this.listHead = null;
        }

        this.length -= 1;
    }

    contains(value) {
        let pointer = this.listHead;

        if (pointer.value === value) return true;

        while (pointer.nextNode !== null) {
            pointer = pointer.nextNode;
            if (pointer.value === value) return true;
        }

        return pointer.value === value ? true : false;
    }

    find(value) {
        let pointer = this.listHead;
        let index = 0;

        if (pointer.value === value) return index;

        while (pointer.nextNode !== null) {
            pointer = pointer.nextNode;
            index += 1;
            if (pointer.value === value) return index;
        }

        return pointer.value === value ? true : null;
    }
}

const nodeFactory = (value = null, nextNode = null) => {
    return { value, nextNode };
};

let list = new LinkedList();
list.append(5);
list.append("test");
list.prepend("first");
list.append(8);
list.append("last");
console.log(list.size());
console.log(list.head());
console.log(list.tail());
console.log(list.at(2));
