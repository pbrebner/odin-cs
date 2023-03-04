// MergeSort Algorithm

function mergeSort(array) {
    let len = array.length;

    if (len < 2) {
        return array;
    } else {
        //sort left half of array
        let leftSort = mergeSort(array.slice(0, Math.floor(len / 2)));
        //sort right half of array
        let rightSort = mergeSort(array.slice(Math.floor(len / 2)));
        //merge sorted array
        let newArray = [];
        let i = 0;
        let j = 0;

        while (i < leftSort.length || j < rightSort.length)
            if (leftSort[i] < rightSort[j] || !rightSort[j]) {
                newArray.push(leftSort[i]);
                i += 1;
            } else {
                newArray.push(rightSort[j]);
                j += 1;
            }

        return newArray;
    }
}

let array = [4, 7, 3, 5, 1, 6, 8, 2];
let newArray = mergeSort(array);

console.log(newArray);
console.log("Node Test");
