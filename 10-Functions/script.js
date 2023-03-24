"use strict";

// --------------- CODING CHALLENGE #2 ------------------
// (function () {
//   const header = document.querySelector("h1");
//   header.style.color = "red";

//   document.querySelector("body").addEventListener("click", function () {
//     header.style.color = "blue";
//   });
// })();

// ----------------- CLOSURES ------------------

// Example 1
// let f;

// const g = function () {
//   const a = 23;
//   f = function () {
//     console.log(a * 2);
//   }; // Cim smo define funkciju ona je "close over" postojeci variable environment u trenutku kad je napravljena
// };

// const h = function () {
//   const b = 777;
//   f = function () {
//     console.log(b * 2);
//   };
// };

// g();
// f();

// // Reassigning f function, new closure jer funkcija ima novi "birthplace"
// h();
// f();
// console.dir(f);

// // Example 2
// const boardPassengers = function (n, wait) {
//   const perGroup = n / 3;

//   setTimeout(function () {
//     console.log(`We are now boarding all ${n} passengers`);
//     console.log(`There are 3 groups, each with ${perGroup} passengers`);
//   }, wait * 1000);

//   console.log("Will start boarding in " + wait + " seconds");
// };

// // const perGroup = 1000; Nece se izvrsiti, closure ima prioritet nad scope chainom
// boardPassengers(180, 3);
// -----------------------------------

// const secureBooking = function () {
//   let passengerCount = 0;

//   return function () {
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// // Radi "closure" property, Variable environment funkcije booker ostaje identican ko kad je ona tek kreirana.
// // Postojece varijable u funkciji secureBooking (pa i argumenti funkcija, kojih ovdje nema) ostaju isti sve dok postoji booker funkcija, ne kreiraju se ispocetka svaki put
// booker();
// booker();
// booker();

// console.dir(booker);

// Immediately Invoked Function Expression - IIFE

// (function () {
//   console.log("This will never run again.");
//   const isPrivate = 23;
// })(); // Citava funkcija u zagradama, zatim () iza kao poziv, samo se na ovom mjestu moze pozvati i nigdje vise

// ------------ CODING CHALLENGE #1 -------------
// const poll = {
//   question: "What is your favorite programming language?",
//   options: ["0: Javascript", "1. Python", "2. Rust", "3. C++"],
//   // This generates [0,0,0,0]
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     // Get answer
//     const answer = Number(
//       prompt(
//         `${this.question}\n${this.options.join("\n")}\n(Write option number)`
//       )
//     );
//     // console.log(answer);

//     // Register answer
//     typeof answer === "number" &&
//       answer < this.answers.length - 1 &&
//       this.answers[answer]++; // Ako su prva 2 uslova tacna, izvrsi zadnji
//     this.displayResults();
//     this.displayResults("string");
//   },
//   // Default je array
//   displayResults(type = "array") {
//     if (type === "array") console.log(this.answers);
//     else if (type === "string")
//       console.log(`Poll results are ${this.answers.join(", ")}`); // Moglo je i [...this.answers]
//   },
// };

// document
//   .querySelector(".poll")
//   .addEventListener("click", poll.registerNewAnswer.bind(poll));

// poll.displayResults.call({ answers: [5, 2, 3] }, "string");

// displayResults trazi this.answers kao parametar. This se mora odnositi na objekat, pa prvi argument mora biti manuelno napravljen objekat koji ima answers varijablu

// ------------ BIND, CALL I APPLY METODE ------------

// const lufthansa = {
//   airline: "Lufthansa",
//   iataCode: "LH",
//   bookings: [],
//   // book: function() {}
//   book(flightNum, name) {
//     console.log(
//       `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
//     );
//     this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
//   },
// };
// lufthansa.book(239, "Bakir Kreco");
// lufthansa.book(123, "Ajda Karahasan");
// console.log(lufthansa);

// const euroWings = {
//   airline: "Eurowings",
//   iataCode: "EW",
//   bookings: [],
// };

// const book = lufthansa.book;

// // NE RADI jer u regular function call this keyword pokazuje na undefined
// // book(23, "Sarah Willis");

// // Call method - prvi argument definira tacno na sta ce THIS keyword pokazivati
// book.call(euroWings, 23, "Sarah Willis");
// console.log(euroWings);

// book.call(lufthansa, 239, "Myname Jeff");
// console.log(lufthansa);

// const swiss = {
//   airline: "Swiss Air Lines",
//   iataCode: "LX",
//   bookings: [],
// };

// book.call(swiss, 583, "Myname Jeff");

// // Apply method - isto ko i call, jedino se umjesto argumenata proslijedjuje array sa argumentima
// const flightData = [583, "George Cooper"];
// book.apply(swiss, flightData);
// console.log(swiss);

// // Ali umjesto toga, mnogo bolje call i spread operator
// book.call(swiss, ...flightData);

// // Bind method - isto call, ali nece odmah pozvati funkciju, vec vratiti novu funkciju gdje je this = euroWings

// // book.call(euroWings, 23, "Sarah Willis");

// // Sad su  this keywords "set in stone"
// const bookEW = book.bind(euroWings);
// const bookLH = book.bind(lufthansa);
// const bookLX = book.bind(swiss);

// bookEW(23, "Steven Willis");

// // Ako bindamo argument on ce uvijek biti unaprijed set
// const bookEW23 = book.bind(euroWings, 23);
// bookEW23("Tarik Proho");
// bookEW23("Ajla Omerbasic");

// // Moze se i odmah unutar objekta dodijeliti metoda iz drugog
// // const mehoLines = {
// //   airline: "Meho Air Lines",
// //   iataCode: "MA",
// //   bookings: [],
// //   book: lufthansa.book,
// // };
// // mehoLines.book.bind(mehoLines);
// // mehoLines.book(76, "Meho Bajraktarevic");

// // With Event Listeners
// lufthansa.planes = 300;
// lufthansa.buyPlane = function () {
//   console.log(this);
//   this.planes++;
//   console.log(this.planes);
// };

// // U event handler funkciji this postane sam element (.buy), pa moramo set rucno da pokazuje na lufthansa
// document
//   .querySelector(".buy")
//   .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

// // Partial application za bind method
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));
// // Sa bind mozemo pre-set i parametre, preskakajuci this keyword jer nam je nebitan (null npr)
// const addVAT = addTax.bind(null, 0.23);

// console.log(addVAT(100));
// console.log(addVAT(23));

// const addTaxRate = function (rate) {
//   return function (value) {
//     return value + value * rate;
//   };
// };

// const addVAT2 = addTaxRate(0.23);
// console.log(addVAT2(100));
// console.log(addVAT2(23));

// ------------ Functions returning functions --------------

// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

// const greet = greeting =>
//   function (name) {
//     console.log(`${greeting} ${name}`);
//   }; Radi i ovo, ali najpravilnije je 2 arrowa

// const greet = greeting => name => console.log(`${greeting} ${name}`);

// const greeterHey = greet("Hey");
// greeterHey("Bakir");
// greeterHey("Meho");

// greet("Oi")("Ajda");

// ------------ CALLBACK FUNCTIONS --------------

// const oneWord = function (str) {
//   return str.replace(/ /g, "").toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(" ");
//   //   console.log(others);
//   return [first.toUpperCase(), ...others].join(" ");
// };

// // Higher-order function
// const transformer = function (str, fn) {
//   console.log("Original string: " + str);
//   console.log(`Transformed string: ${fn(str)}`);

//   console.log(`Transformed by ${fn.name}`);
// };

// // Transformisi string uz pomoc proslijedjene funkcije
// transformer("Javascript is the best!", upperFirstWord);
// transformer("Javascript is the best!", oneWord);

// const high5 = function () {
//   console.log("High five!");
// };
// document.body.addEventListener("click", high5);

// ["Bakir", "Proho", "Ajda"].forEach(high5);
// -----------------------------------------

// const flight = "LH234";
// const bakir = {
//   name: "Bakir Kreco",
//   passport: 237577283,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = "LH999";
//   passenger.name = "Mr. " + passenger.name;

//   if (passenger.passport === 237577283) {
//     alert("Checked in");
//   } else {
//     alert("Wrong passport!");
//   }
// };

// // checkIn(flight, bakir);
// // console.log(flight);
// // console.log(bakir);

// const newPassport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
// };

// newPassport(bakir);
// checkIn(flight, bakir);

// --------------- DEFAULT VALUES ---------------

// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   // ES5 nacin, ispravno al outdated
//   //   numPassengers = numPassengers || 1;
//   //   price = price || 199;

//   const booking = {
//     flightNum, // Enhanced object literals, dovoljno samo ovo ako je isto ime
//     numPassengers,
//     price,
//   };

//   console.log(booking);
//   bookings.push(booking);
// };
// createBooking("LH123", 2, 100);
// createBooking("LH554");
// createBooking("LH227", 3);
// createBooking("LH558", undefined, 3); // Kad zelimo ostaviti default, ne mozemo prazno ostaviti jer ce automatski preci na sljedece

const proho = {
  ime: "Tarik",
  godine: 25,
  drugovi: ["Bakir", "Ajdin", "Emir", "Kizo"],
  picka: true,

  unpussify() {
    this.picka = false;
  },
};

// Funkcije koje za argument primaju druge funkcije

const jebi = function (obj) {
  const jebanje = "jeban";
  obj[jebanje] = "Aaaa satrali frajera"; //obj.jeban = ...
  return jebanje; // return "jeban"
};

const mazi = function (obj) {
  const mazenje = "mazen";
  obj[mazenje] = "Mmmm beba bratova";
  return mazenje;
};

const doToProho = function (obj, fn) {
  const kakavJe = fn(obj);
  //   console.log(obj[kakavJe]);
};

doToProho(proho, jebi);

// Funkcije koje vraćaju funkcije

const plakanjeZa = function (ime) {
  return function (uzrok) {
    // console.log("Joj ljudi umro mi " + ime + " od " + uzrok);
  };
};

const funkcijaPlakanjeRadi = plakanjeZa("Proho");
funkcijaPlakanjeRadi("pederluka");

const strijelaDeranje = (vi, picke) => `${vi} su raspale ${picke}`;

// console.log(strijelaDeranje("Srbi", "Vagine"));

// Call i Apply pizdarije

const autism = {
  autism: "Weaponized",
  code: "WPNA",
  autisti: [],
  weaponize(brojWeapona, imeAutiste) {
    // console.log(
    //   `${imeAutiste} je autiziran oruzjem br. ${this.code}${brojWeapona}.`
    // );
    this.autisti.push({ weapon: `${this.code}${brojWeapona}`, imeAutiste });
  },
};

autism.weaponize(32, "Koso");
autism.weaponize(414, "Sule");
// console.log(autism);

const retardacija = {
  retardiranost: "Militarized",
  code: "MLTR",
  autisti: [],
};

const weaponize = autism.weaponize;
// weaponize(133, "Amina"); Ne radi radi .this

weaponize.call(retardacija, 133, "Amina");
// console.log(retardacija);

// Apply method, isto samo proslijedi niz umjesto zasebnih elemenata
const applyOca = [583, "Emina"];
weaponize.apply(retardacija, applyOca);
// console.log(retardacija);

// Bind method vrati funkciju sa novim this keyword
const weaponizertd = weaponize.bind(retardacija);
weaponizertd(991, "Meho");

const obj1 = {
  vel: 10,
  duplo() {
    this.vel *= 2;
  },
};

const obj2 = {
  vel: 20,
};

const duplo = obj1.duplo;

obj1.duplo();
// console.log(obj1.vel);

duplo.call(obj2);
// console.log(obj2.vel);

const opel = {
  model: "Astra",
  godiste: 2006,
  registracija: "J91M873",
  vlasnik: "Bakir Kreco",
  paljenja: [],

  upali() {
    console.log(`Pali se ${this.model}`);
    this.paljenja.push("CIGACIGACIGAROMROM");
    console.log(this.paljenja);
  },
};

const renault = {
  model: "Megane",
  godiste: 2010,
  registracija: "M53A229",
  vlasnik: "Tarik Proho",
  paljenja: [],
};

opel.upali();
opel.upali.call(renault);

const upaliRenault = opel.upali.bind(renault);
upaliRenault();

const vratiPorez = function (iznos) {
  const porez = (iznos, cijena) => cijena + iznos * cijena;
  return porez.bind(null, iznos);
};

const izracunajPDV = vratiPorez(0.17);
console.log(izracunajPDV(50));
