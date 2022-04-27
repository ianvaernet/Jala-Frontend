// 1. Write a JavaScript program to find the most frequent item of an array
const mostFrecuentIn = (array) =>
  Object.entries(
    array.reduce((carry, element) => {
      carry[element] ? carry[element]++ : (carry[element] = 1);
      return carry;
    }, {})
  ).sort(([elementA, timesRepeatedA], [elementB, timesRepeatedB]) => timesRepeatedB - timesRepeatedA)[0];
console.log(mostFrecuentIn([3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3]));

// 2. Write a JavaScript program to find the sum of squares of a numeric vector
const sumOfSquares = (array) => array.reduce((carry, number) => carry + number ** 2, 0);
console.log(sumOfSquares([0, 1, 2, 3, 4]));

// 3. Write a JavaScript function to remove 'null', 0, "", false, undefined, and NaN values from an array
const removeFalsy = (array) => array.filter((element) => element);
console.log(removeFalsy([NaN, 0, 15, false, -22, '', undefined, 47, null]));
