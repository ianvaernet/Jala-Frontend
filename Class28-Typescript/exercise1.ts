type Rol = 'Admin' | 'User';

type Person = {
  name: string;
  age: number;
  rol: Rol;
};

const PI = Math.PI;
let age: Person['age'];
let PersonName: Person['name'];
let rol: Person['rol'];
let maybe: number | string;

rol = 'User';
maybe = 25;
PersonName = 'Alexander';
age = 24;
maybe = 'something else';
rol = 'Admin';

const person: Person = {
  name: PersonName,
  age: age,
  rol: rol,
};

console.log(person);
