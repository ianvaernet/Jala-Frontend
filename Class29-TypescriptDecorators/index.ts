type Move = {
  name: string;
  power: number;
};

const checkPP = (fight: any, prop: string, descriptor: PropertyDescriptor) => {
  console.log(descriptor.value);s
  if (this.ppAvailable < 1) console.log('Not enough PP');
};

class Pokemon {
  name: string;
  ppAvailable = 1;
  constructor(name: string, ppAvailable: number) {
    this.name = name;
    this.ppAvailable = ppAvailable;
  }

  @checkPP
  figth(move: Move) {
    console.log(`${this.name} used ${move?.name}!`);
    this.ppAvailable -= 1;
  }

  calculateDamage(move: any) {
    return move.power;
  }
}

const thunderbolt: Move = { name: 'thunderbolt', power: 90 };
const pikachu = new Pokemon('pikachu', 1);
pikachu.figth(thunderbolt);
pikachu.figth(thunderbolt);
