const findUnique = (array) => array.find((element) => array.indexOf(element) === array.lastIndexOf(element));
const findUnique2 = (array) => array.reduce((i, j) => i ^ j);

console.log(findUnique([1, 2, 4, 7, 4, 2, 1]));
console.log(findUnique2([1, 2, 4, 7, 4, 2, 1]));
