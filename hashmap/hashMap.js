import { LinkedList } from "./linkedList";

class HashMap {
    capacity = 16;
    loadFactor = 0.75;
    buckets = new Array(this.capacity);

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode;
    }

    checkCapacity() {
        // Checks the capacity of the HashMap and increases size if neccessary
        let loadCapacity = this.capacity * this.loadFactor;

        if (this.length() > loadCapacity) {
            // Double size of hashMap
            this.capacity = this.capacity * 2;
            let entries = this.entries();

            this.buckets = new Array(this.capacity);

            entries.forEach((entry) => {
                let key = Object.keys(entry)[0];
                let value = entry[key];
                this.set(key, value);
            });
        }
    }

    set(key, value) {
        this.checkCapacity();

        let hashCode = this.hash(key);
        let index = hashCode % this.capacity;

        // Check if index is within bucket
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.buckets[index]) {
            // Create linked list, with value as head node, and add to bucket array
            let list = new LinkedList();
            list.append({ key: value });

            this.buckets[index] = list;
        } else {
            // Linked list with node(s) already at this index
            // Check if key is same as existing node (replace if true)
            // If not true, create new node and add to end
            const listAtBucketIndex = this.buckets[index];
            if (listAtBucketIndex.containsKey(key)) {
                let listIndex = listAtBucketIndex.findKey(key);
                listAtBucketIndex.replaceValue({ key, value }, listIndex);
            } else {
                listAtBucketIndex.append({ key, value });
            }
        }
    }

    get(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.capacity;

        // Check if index is within bucket
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.buckets[index]) {
            return null;
        } else {
            const listAtBucketIndex = this.buckets[index];
            if (listAtBucketIndex.containsKey(key)) {
                let listIndex = listAtBucketIndex.findKey(key);
                let value = listAtBucketIndex.at(listIndex);
                return value[key];
            } else {
                return null;
            }
        }
    }

    has(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.capacity;

        // Check if index is within bucket
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.buckets[index]) {
            return false;
        } else {
            const listAtBucketIndex = this.buckets[index];
            if (listAtBucketIndex.containsKey(key)) {
                return true;
            } else {
                return false;
            }
        }
    }

    remove(key) {
        let hashCode = this.hash(key);
        let index = hashCode % this.capacity;

        // Check if index is within bucket
        if (index < 0 || index >= buckets.length) {
            throw new Error("Trying to access index out of bound");
        }

        if (!this.buckets[index]) {
            return false;
        } else {
            const listAtBucketIndex = this.buckets[index];
            if (listAtBucketIndex.containsKey(key)) {
                let listIndex = listAtBucketIndex.findKey(key);
                listAtBucketIndex.removeAt(listIndex);
                return true;
            } else {
                return false;
            }
        }
    }

    length() {
        let length = 0;
        this.buckets.forEach((element) => {
            if (element) {
                length += element.size();
            }
        });

        return length;
    }

    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    }

    keys() {
        let keys = [];

        this.buckets.forEach((element) => {
            if (element) {
                let size = element.size();
                for (let i = 0; i < size; i++) {
                    let value = element.at(i);
                    keys.concat(Object.keys(value)[0]);
                }
            }
        });

        return keys;
    }

    values() {
        let values = [];

        this.buckets.forEach((element) => {
            if (element) {
                let size = element.size();
                for (let i = 0; i < size; i++) {
                    let value = element.at(i);
                    values.concat(Object.values(value)[0]);
                }
            }
        });

        return values;
    }

    entries() {
        let entries = [];

        this.buckets.forEach((element) => {
            if (element) {
                let size = element.size();
                for (let i = 0; i < size; i++) {
                    let value = element.at(i);
                    entries.concat(value);
                }
            }
        });

        return entries;
    }
}

const hashMap = new HashMap();
