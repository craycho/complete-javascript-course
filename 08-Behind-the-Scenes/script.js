"use strict";

// function calcAge(birthYear) {
//   const age = 2022 - birthYear;

//   function printAge() {
//     const output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       var millenial = true;
//       const str = `Oh, and you're a millenial, ${firstName}`;
//       console.log(str);
//     }

//     console.log(millenial);
//   }
//   printAge();

//   return age;
// }

// const firstName = "Bakir";
// calcAge(1996);

// console.log(me);
// console.log(job);
// console.log(year);

// var me = "Bakir";
// let job = "Cop";
// const year = 1997;

// console.log(addDecl(2, 3));
// // console.log(addExpr(2, 3));
// // console.log(addArrow(2, 3));

// function addDecl(a, b) {
//   return a + b;
// }
// const addExpr = function (a, b) {
//   return a + b;
// };
// const addArrow = (a, b) => a + b;

// // Example
// if (!numProducts) deleteShoppingCart();

// var numProducts = 10;

// function deleteShoppingCart() {
//   console.log("All products deleted!");
// }

// var x = 1;
// let y = 2;
// const z = 3;

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2022 - birthYear);
//   console.log(this);
// };
// calcAge(1997);

// const calcAgeArrow = birthYear => {
//   console.log(2022 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(1997);

// const bakir = {
//   year: 1997,
//   calcAge: function () {
//     console.log(this);
//     console.log(2022 - this.year);
//   },
// };
// bakir.calcAge();

// const matilda = {
//   year: 2000,
// };
// matilda.calcAge = bakir.calcAge;
// matilda.calcAge();

// const f = bakir.calcAge;
// f();

// const bakir = {
//   firstName: "Bakir",
//   year: 1997,
//   calcAge: function () {
//     console.log(2022 - this.year);

//     // SOLUTION 1 (OLD SOLUTION PRE ES6)
//     // const self = this;

//     // const isMillenial = function () {
//     //     console.log(self);
//     //     console.log(self.year > 1981 && self.year < 1996);
//     //   }; //This ne radi u obicnim funkcijama, ovo je workaround
//     //   isMillenial();
//     // },

//     // SOLUTION 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year > 1981 && this.year < 1996);
//     }; //Arrow funkcija nasljedjuje this keyword od calcAge, zato jedino ona radi u ovom slucaju

//     isMillenial();
//   },

//   greet: function () {
//     console.log(this);
//     console.log(`Hey ${this.firstName}`);
//   }, // Ne koristi arrow funkcije ko metode
// };

// bakir.greet();
// bakir.calcAge();

// // Arguments keyword
// const addExpr = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };
// addExpr(2, 5);
// addExpr(2, 5, 8, 12);

// var addArrow = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addArrow(2, 5, 8);

// let age = 25;
// let oldAge = age;
// age = 31;

// console.log(age);
// console.log(oldAge);

// const me = {
//   name: "Bakir",
//   age: 25,
// };

// const friend = me;
// friend.age = 27;
// console.log("Friend", friend);
// console.log("Me", me);

// // Primitive types
// let lastName = "Hubanic";
// let oldLastName = lastName;
// lastName = "Kreco";
// console.log(lastName, oldLastName);
// // Ovo radi bez problema jer su primitivne varijable i stored u call stacku i imaju razlicite memorijske adrese

// // Reference types
// const emina = {
//   firstName: "Emina",
//   lastName: "Hubanic",
//   age: 25,
// };

// const marriedEmina = emina;
// marriedEmina.lastName = "Kreco";
// console.log("Prije ", emina);
// console.log("Poslije ", marriedEmina);

// Copying objects
const emina2 = {
  firstName: "Emina",
  lastName: "Hubanic",
  age: 25,
  family: ["Sejo", "Bahra"],
};

const eminaCopy = Object.assign({}, emina2);
eminaCopy.lastName = "Kreco";
console.log("Prije", emina2);
console.log("Poslije", eminaCopy);

eminaCopy.family.push("Dzenita");
eminaCopy.family.push("Amila");
console.log("Nakon pusha (emina2)", emina2);
console.log("Nakon pusha (eminaCopy)", eminaCopy);
// Family ostaje isti jer cak i .assign pravi "Shallow clone", tj u stanju je kopirati samo primitivne varijable unutar objekta, family i dalje pokazuje na iste adrese u heapu
