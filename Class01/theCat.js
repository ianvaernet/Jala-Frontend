class Cat {
  #hunger;
  #loneliness;
  #tiredness;
  constructor(hunger, loneliness, tiredness) {
    this.#hunger = hunger;
    this.#loneliness = loneliness;
    this.#tiredness = tiredness;
  }

  getHunger() {
    return this.#hunger;
  }

  getLoneliness() {
    return this.#loneliness;
  }

  getTiredness() {
    return this.#tiredness;
  }

  eat() {
    this.#hunger--;
  }

  run() {
    this.#hunger++;
    this.#tiredness++;
  }

  playWith(anotherCat) {
    this.#loneliness--;
    anotherCat.#loneliness--;
  }

  sleep() {
    this.#tiredness--;
    this.#loneliness++;
  }

  logStatus() {
    console.log('\n===== THE CAT STATS =====');
    console.log(`Hunger: ${this.#hunger}`);
    console.log(`Loneliness: ${this.#loneliness}`);
    console.log(`Tiredness: ${this.#tiredness}\n`);
  }

  whatTheCatNeeds() {
    const isHunger = this.#hunger >= 7;
    const isLonely = this.#loneliness >= 7;
    const isTired = this.#tiredness >= 7;
    if (!isHunger && !isLonely && !isTired) console.log("The cat doesn't need anything");
    else {
      if (this.#hunger >= 7) console.log('The cat needs to eat');
      if (this.#loneliness >= 7) console.log('The cat is lonely, give it some love');
      if (this.#tiredness >= 7) console.log('The cat is tired and should sleep');
    }
  }

  static feedCats(...cats) {
    cats.forEach((cat) => cat.eat());
  }
}
