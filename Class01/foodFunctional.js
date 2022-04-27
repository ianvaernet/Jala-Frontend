const primalFood = ['🐮', '🥔', '🐔', '🌽'];
const cookedFood = [
  { food: '🍔', isVegetarian: false },
  { food: '🍟', isVegetarian: true },
  { food: '🍗', isVegetarian: false },
  { food: '🍿', isVegetarian: true },
];
const food = {};

const cook = (primal) => cookedFood[primalFood.indexOf(primal)].food;
const isVegetarian = (searchedFood) => cookedFood.find(({ food }) => food === searchedFood).isVegetarian;
const hasMeet = (food) => !isVegetarian(food);
const eatAll = (foodArray) =>
  foodArray.reduce((array, food, index) => {
    if (index === array.length - 1) return '🤤';
    else {
      console.log('Eating ' + food);
      return array;
    }
  }, foodArray);

console.log(['🐮', '🥔', '🐔', '🌽'].map(cook));
console.log(isVegetarian('🍔'));
console.log(isVegetarian('🍟'));
console.log(hasMeet('🍗'));
console.log(hasMeet('🍿'));
console.log(eatAll(['🍔', '🍟', '🍗', '🍿']));
