// Fibonacci Practice

function fibs(num) {
    let fibArray = [];

    if (num == 1) {
        fibArray = [0];
    } else if (num == 2) {
        fibArray = [0, 1];
    } else if (num > 2) {
        fibArray = [0, 1];
        for (let i = 2; i < num; i++) {
            fibArray[i] = fibArray[i - 1] + fibArray[i - 2];
        }
    }

    return fibArray;
}

function fibsRec(num) {
    if (num <= 1) {
        return num;
    } else {
        return fibsRec(num - 1) + fibsRec(num - 2);
    }
}

let arr = fibs(8);
console.log(arr);

let n = 8;
for (let i = 0; i < n; i++) {
    console.log(fibsRec(i));
}
