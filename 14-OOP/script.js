"use strict";

// -------------- Constructor functions --------------

/* const Person = function (firstName, birthYear) {
  // Instance properties, dostupne svim instances kreiranim kroz ovu funkciju
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create method inside of a constructor function, terrible for performance
  //   this.calcAge = function () {
  //     console.log(2022 - this.birthYear);
  //   };
};

const bakir = new Person("Bakir", 1997);
// KAKO NEW OPERATOR FUNKCIONISE OVDJE:
// 1. New {} is created (empty object)
// 2. Function is called (this u funkciji je set da pokazuje na taj novi empty object)
// 3. {} is linked to a prototype, tj bakir.__proto__ povezano sa Person.prototype
// 4. function automatically returns the new object (ne treba return)

const matilda = new Person("Matilda", 2012);
const jack = new Person("Jack", 1985);
// console.log(matilda, jack);

// console.log(bakir instanceof Person); // vraca true ili false

// ------------------- Prototypes --------------------

// Svi objekti kreirani kroz Person funkciju imaju pristup prototype property
Person.prototype.calcAge = function () {
  // console.log(2022 - this.birthYear);
};

bakir.calcAge(); // Ako se method ne moze naci u objektu, Javascript potrazi u njegovom prototype (Prototypal inheritance)
matilda.calcAge(); */
/*
console.log(bakir.__proto__);
VAZNO: "prototype" nije isto sto i "prototype property" nekog objekta.
Prototype bakir objekta je isti ko i prototype property njegove constructor funkcije*/
/*
console.log(bakir.__proto__ === Person.prototype);
/* VAZNO #2: bakir.__proto__ je prototype objekta bakir, dok je Person.prototype prototip 
SVIH objekata kreiranih od strane Person. A bakir.prototype je prototip "linked objekata"

console.log(Person.prototype.isPrototypeOf(bakir)); // True ili false
*/
// Person.prototype.species = "Homo Sapiens"; // Svaki objekat kreiran od Person ce imati .species
/*
console.log(bakir.species);

console.log(bakir.__proto__); // Isto sto i:
console.log(Object.getPrototypeOf(bakir)); // Object je built in constructor function

console.log(bakir.hasOwnProperty("firstName")); // Biti ce true, jer je firstName atribut samog objekta
console.log(bakir.hasOwnProperty("species")); // Biti ce false, jer species nije unutar objekta, vec unutar prototipa, a objekat samo ima pristup

/* Prototype chaining: Kada pozovemo npr .hasOwnProperty na bakir objekat, isti ocigledno
ne posjeduje navedenu metodu. Tada ide ka gore, u Person konstruktor (objekat), koji također
ne posjededuje. Konacno ide gore u Object konstruktor, koji u sebi sadrzi built-in .hasOwnProperty. */

// ----------- Prototypal inheritance ------------
/*
console.log(bakir.__proto__);

// Sami vrh prototype chaina, ne moze dalje
console.log(bakir.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1, 1, 2, 4, 5, 2, 7];
console.log(arr.__proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(x => x * 1);
*/
// ------------ CODING CHALLENGE #1 -------------

/* const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
bmw.accelerate();
bmw.brake();

mercedes.accelerate();
mercedes.brake();
mercedes.brake(); */

// -------------- ES6 Classes ----------------

// class expression
// const PersonCl = class {};

// class declaration
/* class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Sve metode koje napisemo van constructor ce biti na prototipu (added to .prototype propertyy), ne na samom objektu (za razliku od constructor function)
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    // _.imePropertya je convention, kreira se novi property jer u protivnom dolazi do errora (Maximum call stack size exceeded)
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static metode ce biti na samom objektu, za razliku od gornjih
  static hey() {
    console.log("Hey there");
  }
} */

// const jessica = new PersonCl("Jessica Davis", 1991);
// jessica.calcAge();
// jessica.greet();

/*
console.log(jessica.age);

// 1. Classes are not hoisted (ne mozemo ih koristiti prije deklaracije)
// 2. Like functions, classes are "first-class citizens" (mozemo ih pass u funkcije i returnati iz funkcija)
// 3. Classes are executed in strict mode (i da nije aktiviran)

const walter = new PersonCl("Walter", 1983);

const account = {
  owner: "Jonas",
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop(); // Zadnji clan niza
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

// Getter
console.log(account.latest);

// Setter
account.latest = 50;
console.log(account.movements);
*/
// ------------- Static methods --------------
/*
Person.hey = function () {
  console.log("Hey there!");
};

Person.hey();
// Ne naslijedjuju objekti, pa ne postoji bakir.hey()

PersonCl.hey();
// jessica.hey(); Ne moze jer je static funkcija
*/
// ------------ Object.create -------------
/*
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Object.create ce returnati novi objekat, kojem je prototip PersonProto
const steven = Object.create(PersonProto);
steven.name = "Steven";
steven.birthYear = "2000";
steven.calcAge();

// console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1989);
sarah.calcAge();
console.log(sarah);
*/

// ------------- CODING CHALLENGE #2 --------------
/* 
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log("Your speed is " + this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log("Your speed is " + this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
/*
const ford = new Car("Ford", 120);
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();

console.log(ford.speedUS);

ford.speedUS = 100;
console.log(ford.speed);
 */

// ------------ Class inheritance: Constructor functions ------------
/* 
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Pozovemo Person, ali je u funkcijama this = undefined, pa moramo set da pokazuje na Student objekat
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Na gornji nacin se naslijede properties, metode je potrebno izjednacavanjem prototypea:

Student.prototype = Object.create(Person.prototype); // Student.prototype postaje objekat koji nasljedjuje (posjeduje) Person.prototype, tj. Object.create returna prazan objekat sa prototipom Person.prototype
// Ne moze Student.prototype = Person.prototype, jer bi pokazivali na isti prototip. Nama treba da je Person.prototype bude prototip od Student.prototype, tj. da ih chainamo
// Ali je isto kao Student.prototype.__proto__ = Person.prototype;

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const mike = new Student("Mike", 2002, "Computer Science");
mike.introduce();
mike.calcAge();

// Potrebno jer je ranije koristen Object.create, pa je constructor Student.prototype set na Person, a ne na Student
Student.prototype.constructor = Student;
 */
// ------------- CODING CHALLENGE #3 -------------
/* 
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 20;
  console.log(`${this.make} going at ${this.speed}km/h.`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed}km/h.`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} going at ${this.speed}km/h, with a charge of ${this.charge}.`
  );
};

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
console.log(tesla);
 */

// ------------ ES6 Class inheritence ------------
/* 
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there");
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Uvijek prvo super() mora
    super(fullName, birthYear); // super() je constructor function parent klase
    this.course = course;
  } // Ako nam ne trebaju nove properties vec samo 1/1 kopija, uopste ne trebamo pisati constructor

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}.`);
  }

  calcAge() {
    // Overwritea istoimeni method iz parent class
    console.log(
      `I'm ${2022 - this.birthYear} years old, but I feel more like ${
        2022 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl("Marta Jones", 2010, "Computer science");
// const martha = new StudentCl("Marta Jones", 2010); Moze se pozvati i bez constructora u StudentCl
martha.introduce();
martha.calcAge();
console.log(martha); */

// ---------- Object.create() Class inheritance -----------
/* 
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);
// StudentProto sada inherita (chaina sa) prototip PersonProto, pa ce objekti kreirani sa StudentProto imati pristup PersonProto properties i methods
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}.`);
};

const jay = Object.create(StudentProto);
jay.init("Jay", 2000, "IT");
jay.introduce();
jay.calcAge();
 */

// ------------- More class examples --------------

/* class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected properties se oznacavaju sa "_"
    this._pin = pin;

    // Mogu se naravno set properties bez pocetnog inputa
    this._movements = [];
    this.locale = navigator.language;

    console.log("Thank you for opening a new account " + owner);
  }

  // Public interface objekta

  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val); // Method moze pozvati drugi method
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan appproved.");
    }
  }
}

const account1 = new Account("Jonas", "EUR", 1111);

// account1.movements.push(250);  Ne treba ovako raditi, vec unutar methods
// account1.movements.push(-140);

account1.deposit(250);
account1.withdraw(140);
account1.requestLoan(1000);
// account1.approveLoan(1000); Ne bi smjeli ovome moci pristupiti, a mozemo
console.log(account1.getMovements());

console.log(account1); */

// ------------ Encapsulation: Class fields and Methods ------------

// 1) Public fields - prisutni u svim INSTANCES koje se kreiraju pomocu klase
// 2) Private fields - nisu prisutni van methods unutar objekta
// 3) Public methods - standardne methods van constructora
// 4) Private methods - ne rade jos uvijek, tretirane ko private fields
/* 
class Account {
  // 1) Public fields
  locale = navigator.language; // U svakom objektu ce biti isti kod za locale

  // 2) Private fields
  #movements = [];
  #pin; // Da bi u constructor mogli set, moramo ovdje napraviti

  constructor(owner, currency, pin) { // Constructor se automatski poziva pomocu "new" keyworda
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // this.locale = navigator.language; Isto ko i Public fields

    console.log("Thank you for opening a new account " + owner);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this; // Returnamo objekat (instance), da bi se mogle chainati metode
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log("Loan appproved.");
      return this;
    }
  }

  // Static metode su dostupne samo na klasama, ne na kreiranim objektima (instances)
  static helper() {
    console.log("Helper function");
  }

  // 4) Private methods
  _approveLoan(val) {
    // Treba isto "#", ali ne radi jos uvijek, ne izbacuje error ali nije implemented u browsere
    return true;
  }
}

const account1 = new Account("Jonas", "EUR", 1111);

account1.deposit(250);
account1.withdraw(140);
account1.requestLoan(1000);

console.log(account1.getMovements());

// console.log(account1.#movements); Ne moze, jer je private class field
// console.log(account1.#pin); Isto
// console.log(account1.#approveLoan(1000)); Nije jos available

Account.helper(); // Static method

// ------------- Chaining class methods --------------

account1.deposit(300).deposit(500).withdraw(350).requestLoan(2500);
console.log(account1.getMovements());
 */

// --------------- CODING CHALLENGE #4 ----------------

class Carcl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 20;
    console.log(`${this.make} going at ${this.speed}km/h.`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed}km/h.`);
    return this;
  }
}

class EVcl extends Carcl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} going at ${this.speed}km/h, with a charge of ${
        this.#charge
      }.`
    );
    return this;
  }
}

const BMW = new Carcl("BMW", 140);
BMW.accelerate();
BMW.accelerate();
BMW.brake();

const rimac = new EVcl("Rimac", 180, 60);
rimac
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(100)
  .accelerate()
  .brake();
