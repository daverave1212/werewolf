export function percentChance(chance){	/* Ex: percentChance(20) = 20% chance to return true; */
    var c = randomInt(1, 100);
    if(c <= chance) return true;
    return false;
}
export function randomInt(low, high){
    return Math.floor(Math.random() * (high - low + 1) + low);
}
export function randomOf(...args){
    return args[randomInt(0, args.length - 1)];
}





export function sum(arr) {
    return arr.reduce((partialSum, a) => partialSum + a, 0)
}
export function randomizeArray(array_a){
    var iRandomize;
    for(iRandomize = 0; iRandomize < array_a.length; iRandomize++){
        var randomizeArrayIndex = randomInt(0, array_a.length - 1);
        var auxRandomize = array_a[iRandomize];
        array_a[iRandomize] = array_a[randomizeArrayIndex];
        array_a[randomizeArrayIndex] = auxRandomize;
    }
    return array_a
}
export function popArrayElementAt(arr, index) {
    const elem = arr[index]
    arr.splice(index, 1)
    return elem
}
export function popArrayElementFind(arr, findFunc) {
    const index = arr.findIndex(findFunc)
    const elem = arr[index]
    arr.splice(index, 1)
    return elem
}
export function times(n, func) {
    for (let i = 0; i < n; i++) {
        func(i)
    }
}
export function arrayFindIndexLowest(arr, getValue) {
    if (arr.length == 0) return null
    let lowestSoFar = getValue(arr[0])
    let lowestIndex = 0
    for (let i = 0; i < arr.length; i++) {
        if (getValue(arr[i]) < lowestSoFar) {
            lowestSoFar = getValue(arr[i])
            lowestIndex = i
        }
    }
    return lowestIndex
}
export function arrayFindIndexHighest(arr, getValue) {
    if (arr.length == 0) return null
    let highestSoFar = getValue(arr[0])
    let highestIndex = 0
    for (let i = 0; i < arr.length; i++) {
        if (getValue(arr[i]) > highestSoFar) {
            highestSoFar = getValue(arr[i])
            highestIndex = i
        }
    }
    return highestIndex
}
export function arrayFindLowest(arr, getValue) {
    const index = arrayFindIndexLowest(arr, getValue)
    return arr[index]
}
export function arrayFindHighest(arr, getValue) {
    const index = arrayFindIndexHighest(arr, getValue)
    return arr[index]
}