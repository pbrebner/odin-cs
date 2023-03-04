// Fibonacci Practice

function fibs(num) {
    let fibArray = [0, 1];

    for (let i = 2; i < num; i++) {
        fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
    }

    return fibArray;
}

function fibsRec(num) {
    if (num < 2) {
        return [0, 1];
    } else {
        let fibArray = fibsRec(num - 1);
        fibArray.push(
            fibArray[fibArray.length - 1] + fibArray[fibArray.length - 2]
        );
        return fibArray;
    }
}

let arr = fibs(7);
let arrRecursive = fibsRec(1);

console.log(arr);
console.log(arrRecursive);
