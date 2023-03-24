"use strict";

//Arrow function

// const calcAge = (birthYear) => 2022 - birthYear;
// const age = calcAge(1997);
// console.log(age);

// const yearsUntilRetirement = (birthYear, firstName) => {
//   const age = 2022 - birthYear;
//   const retirement = 65 - age;
//   //   return retirement;
//   return `${firstName} retires in ${retirement} years.`;
// };

// console.log(yearsUntilRetirement(1997, "Bakir"));

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);

//   const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
//   return juice;
// }

// console.log(fruitProcessor(2, 3));

// const calcAge = function (birthYear) {
//   return 2022 - birthYear;
// };

// const yearsUntilRetirement = function (birthYear, firstName) {
//   const retirement = 65 - calcAge(birthYear);

//   if (retirement > 0) {
//     console.log(`${firstName} retires in ${retirement} years.`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired.`);
//     return -1;
//   }
//   return retirement;
// };

// console.log(yearsUntilRetirement(1997, "Bakir"));
// console.log(yearsUntilRetirement(1950, "Sejo"));

// const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

// const avgDolphins = calcAverage(85, 54, 41);
// const avgKoalas = calcAverage(23, 34, 27);

// function checkWinner(avgDolphins, avgKoalas) {
//   if (avgDolphins > avgKoalas * 2) {
//     console.log(`Dolphins win with an average score of ${avgDolphins}`);
//   } else if (avgKoalas > avgDolphins * 2) {
//     console.log(`Koalas win with an average score of ${avgKoalas}`);
//   } else {
//     console.log("No team wins!");
//   }
// }

// checkWinner(avgDolphins, avgKoalas);

// const haveri = ["Ajda", "Proho", "Alden"];
// console.log(haveri);

// const novi = new Array("Deni", "Keno", "Zoka");
// console.log(novi);

// console.log(novi[novi.length - 1]);

// const bakir = ["Bakir", "Kreco", 1997, haveri];
// console.log(bakir);

// const calcAge = function (birthYear) {
//   return 2022 - birthYear;
// };

// const years = [1990, 2001, 1997];

// console.log(calcAge(years[0]));
// console.log(calcAge(years[1]));
// console.log(calcAge(years[2]));

// const ages = [
//   calcAge(years[0]),
//   calcAge(years[1]),
//   calcAge(years[years.length - 1]),
// ];

// const friends = ["Ajda", "Proho", "Alden"];

// const newLength = friends.push("Deni"); //Velicina novog arraya je return value .push metode
// console.log(friends);
// console.log(newLength);

// friends.unshift("Dzaja"); //Doda element na pocetak
// console.log(friends);

// const popped = friends.pop(); //Vrijednost popped je removeani element
// console.log(friends);

// friends.shift(); //Ukloni element sa pocetka
// console.log(friends);

// console.log(friends.indexOf("Proho")); //Koja je pozicija neki clan
// console.log(friends.includes("Proho")); //Da li je element dio niza

// function calcTip(bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// }

// console.log(calcTip(100));

// const bills = [125, 555, 44];
// const tips = [
//   calcTip(bills[0]),
//   calcTip(bills[1]),
//   calcTip(bills[bills.length - 1]),
// ];
// const total = [
//   bills[0] + tips[0],
//   bills[1] + tips[1],
//   bills[tips.length - 1] + tips[tips.length - 1],
// ];
// console.log(tips, total);

// const bakir = {
//   firstName: "Bakir",
//   lastName: "Kreco",
//   age: 2022 - 1997,
//   job: "Investigator",
//   friends: ["Proho", "Ajda", "Deni"],
// };

// console.log(bakir);

// console.log(bakir.lastName);
// console.log(bakir["lastName"]);

// const nameKey = "Name";

// console.log(bakir["first" + nameKey]);
// console.log(bakir["last" + nameKey]);

// const interestedIn = prompt("What do you want to know about Bakir?");
// if (bakir[interestedIn]) {
//   console.log(bakir[interestedIn]);
// } else {
//   console.log("Wrong request");
// }

// bakir.location = "Sarajevo";
// bakir["gamerTag"] = "Craycho";
// console.log(bakir);

// console.log(
//   `${bakir.firstName} has ${bakir.friends.length} friends, and his best friend is called ${bakir.friends[0]}.`
// );

// const bakir = {
//   firstName: "Bakir",
//   lastName: "Kreco",
//   birthYear: 1997,
//   job: "Investigator",
//   friends: ["Proho", "Ajda", "Deni"],
//   hasDriversLicense: true,

//   //   calcAge: function (birthYear) {
//   //     return 2022 - birthYear;
//   //   },

//   //   calcAge: function () {
//   //     return 2022 - this.birthYear;
//   //   },

//   calcAge: function () {
//     this.age = 2022 - this.birthYear;
//     return this.age; //Nije obavezno, al dobra praksa
//   },

//   getSummary: function () {
//     console.log(
//       `${this.firstName} is a ${this.calcAge()}-year old ${
//         this.job
//       }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license`
//     );
//   },
// };
// // console.log(bakir.calcAge());
// // console.log(bakir.age); //age ne postoji dok se calcAge ne pozove makar jednom

// bakir.getSummary();

// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,

//   calcBMI: function () {
//     this.BMI = this.mass / this.height ** 2;
//     return this.BMI;
//   },
// };

// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,

//   calcBMI: function () {
//     this.BMI = this.mass / this.height ** 2;
//     return this.BMI;
//   },
// };

// console.log(
//   mark.calcBMI() > john.calcBMI()
//     ? `Mark's BMI (${mark.BMI}) is higher than John's (${john.BMI}).`
//     : `John's BMI (${john.BMI}) is higher than Mark's (${mark.BMI}).`
// );

// const bakir = [
//   "Bakir",
//   "Kreco",
//   1997,
//   "Istrazitelj",
//   ["Proho", "Ajda", "Deni"],
// ];

// // const types = [];

// // for (let i = 0; i < bakir.length; i++) {
// //   console.log(bakir[i], typeof bakir[i]);
// //   //   types[i] = typeof bakir[i];
// //   types.push(typeof bakir[i]);
// // }

// // console.log(types);

// // const years = [1991, 1997, 2001, 1973];
// // const age = [];

// // for (let i = 0; i < years.length; i++) {
// //   age.push(2022 - years[i]);
// //   console.log(age[i]);
// // }
// console.log("CONTINUE");
// for (let i = 0; i < bakir.length; i++) {
//   if (typeof bakir[i] != "string") continue;
//   console.log(bakir[i], typeof bakir[i]);
// }
// console.log("BREAK");
// for (let i = 0; i < bakir.length; i++) {
//   if (typeof bakir[i] == "number") break;
//   console.log(bakir[i], typeof bakir[i]);
// }

// const bakir = [
//   "Bakir",
//   "Kreco",
//   1997,
//   "Istrazitelj",
//   ["Proho", "Ajda", "Deni"],
// ];

// for (let i = bakir.length - 1; i >= 0; i--) {
//   console.log(bakir[i]);
// }

// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`Starting exercise ${exercise} `);
//   for (let set = 1; set <= 3; set++) {
//     console.log(`Set ${set}`);
//   }
// }

// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`Starting exercise ${exercise}:`);
//   for (let set = 1; set <= 3; set++) {
//     console.log(`Set ${set}!`);
//   }
// }

// let rep = 1;
// while (rep <= 10) {
//   console.log(`Lifting shit, rep ${rep}!`);
//   rep++;
// }

// let dice = Math.trunc(Math.random() * 6) + 1;

// while (dice != 6) {
//   console.log(`You rolled a ${dice}`);
//   dice = Math.trunc(Math.random() * 6) + 1;
// }
// console.log("Congratulations, you rolled a 6!");

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bill) {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

for (let i = 0; i < bills.length; i++) {
  tips.push(calcTip(bills[i]));
  totals.push(bills[i] + tips[i]);
}
console.log(tips, totals);

const calcAverage = function (arr) {
  let average = 0;
  for (let i = 0; i < arr.length; i++) {
    average += arr[i];
    console.log(average);
  }
  return average / arr.length;
};

const average = calcAverage(totals);
console.log(`The given array's average is ${average}`);
