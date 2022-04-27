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

console.log(['🐮', '🥔', '🐔', '🌽'].map(cook));
console.log(isVegetarian('🍔'));
console.log(isVegetarian('🍟'));
console.log(hasMeet('🍗'));
console.log(hasMeet('🍿'));
