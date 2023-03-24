"use strict";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  Fri: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours,
  // ES6 Enhanced object literals, umjesto da koristi viska =
  // Umjesto "order: function()"
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Odmah smo destructuring objekta uradili u samom pocetku funkcije, ali i dalje primamo samo jedan objekat
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },
};

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split("+")) {
  const [type, from, to, time] = flight.split(";");
  const output = `${type.startsWith("_Delayed") ? "🔴" : ""}${type.replaceAll(
    "_",
    " "
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ":",
    "h"
  )})`.padStart(50);
  console.log(output);
}

// ---------------- CODING CHALLENGE #4 ----------------

// document.body.append(document.createElement("textarea"));
// document.body.append(document.createElement("button"));

// document.querySelector("button").addEventListener("click", function () {
//   const text = document.querySelector("textarea").value;
//   const textArray = text.toLowerCase().split("\n");

//   for (const [i, line] of textArray.entries()) {
//     const [firstWord, secondWord] = line.split("_");
//     const output = `${firstWord}${secondWord.replace(
//       secondWord[0],
//       secondWord[0].toUpperCase()
//     )}`;
//     //moze i samo padEnd(20), podrazumijevaju se empty
//     console.log(`${output.padEnd(20, " ")}${"✅".repeat(i + 1)}`);
//   }
// });
//-----------------------------------------------------
// // Split and join
// console.log("a+very+nice+string".split("+"));
// console.log("Jonas Schmedtmann".split(" "));

// const [firstName, lastName] = "Jonas Schmedtmann".split(" ");
// console.log(firstName, lastName);

// const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
// console.log(newName);

// const capitalizeName = function (name) {
//   const names = name.split(" ");
//   console.log(names.join(" "));

//   const namesUpper = [];
//   for (const n of names) {
//     namesUpper.push(n[0].toUpperCase() + n.slice(1));
//   } // ili (n.replace(n[0], n[0].toUpperCase()));
//   console.log(namesUpper.join(" "));
// };

// capitalizeName("jessica ann smith davis");
// capitalizeName("bakir kreco");

//--------------------------------------------------

// // Padding a string
// const message = "Go to gate 23";
// console.log(message.padStart(25, "+").padEnd(35, "+")); // Ukupna duzina stringa nakon paddinga, s kojim char paddovati
// console.log("Bakir".padStart(23, "+").padEnd(30, "+"));

// const maskCreditCard = function (number) {
//   const str = number + ""; // Umjesto (String)
//   const last = str.slice(-4);
//   return last.padStart(str.length, "*");
// };

// console.log(maskCreditCard(433787571858383));
// console.log(maskCreditCard("335325786823868"));
// //----------------------------------------

// // Repeat string method
// const message2 = "Bad weather... All departures delayed... ";
// console.log(message2.repeat(5));

// const planesInLine = function (n) {
//   console.log(`There are ${n} planes in line ${"✈".repeat(n)}`);
// };
// planesInLine(5);
// planesInLine(12);
//----------------------------------------

// const airline = "TAP Air Portugal";

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in name

// const passenger = "baKiR";
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

// // Comparing emails
// const email = "bakir.kreco@gmail.com";
// const loginEmail = "  Bakir.Kreco@gmail.com \n";

// // const lowerEmail = loginEmail.toLowerCase();
// // const trimmedEmail = lowerEmail.trim();
// // console.log(trimmedEmail); SUVISNO, METHODS MOGU JEDNA ZA DRUGOM

// const normalizedEmail = loginEmail.toLowerCase().trim();
// console.log(normalizedEmail);
// console.log(email === normalizedEmail);

// // Replacing parts of strings
// const priceGB = "288,97€";
// const priceUS = priceGB.replace("€", "$").replace(",", ".");
// console.log(priceUS);

// const announcement =
//   "All passengers come to boarding door 23. Boarding door 23!";

// console.log(announcement.replace("door", "gate"));

// console.log(announcement.replace(/door/g, "gate"));
// // Tzv. "Regular expression", string ide izmedju /, g stands for "Global"

// // Boolean string methods
// const plane = "Airbus A320neo";
// console.log(plane.includes("A320"));
// console.log(plane.startsWith("Air"));

// if (plane.startsWith("Airbus") && plane.endsWith("neo")) {
//   console.log("Part of the NEW Airbus family!");
// }

// // Pratice exercise-------------------
// const checkBaggage = function (items) {
//   const baggage = items.toLowerCase();
//   if (baggage.includes("knife") || baggage.includes("gun")) {
//     console.log("You are NOT allowed on board.");
//   } else {
//     console.log("Welcome aboard.");
//   }
// };

// checkBaggage("I have a laptop, some food and a pocket knife");
// checkBaggage("Socks and camera");
// checkBaggage("Got some snacks and a gun for protection");
//-----------------------------------

// console.log(airline.length);
// console.log(airline.indexOf("r")); // Prvo r u stringu
// console.log(airline.lastIndexOf("r")); // Zadnje r u stringu
// console.log(airline.indexOf("Portugal"));

// console.log(airline.slice(4)); // Pozicija na kojoj sliceanje pocinje
// console.log(airline.slice(4, 7)); // Start i end value

// console.log(airline.slice(0, airline.indexOf(" ")));
// console.log(airline.slice(airline.lastIndexOf(" ") + 1));

// console.log(airline.slice(-2)); // Pocne od kraja unazad
// console.log(airline.slice(1, -1)); // Pocne od kraja unazad

// const checkMiddleSeat = function (seat) {
//   // B and E are middle seats
//   const s = seat.slice(-1);
//   if (s === "B" || s === "E") console.log("You got the middle seat");
//   else console.log("You got lucky!");
// };

// checkMiddleSeat("11B");
// checkMiddleSeat("23C");
// checkMiddleSeat("3E");

// // ----------------- CODING CHALENGE #3 -------------------

// const gameEvents = new Map([
//   [17, "⚽️ GOAL"],
//   [36, "🔁 Substitution"],
//   [47, "⚽️ GOAL"],
//   [61, "🔁 Substitution"],
//   [64, "🔶 Yellow card"],
//   [69, "🔴 Red card"],
//   [70, "🔁 Substitution"],
//   [72, "🔁 Substitution"],
//   [76, "⚽️ GOAL"],
//   [80, "⚽️ GOAL"],
//   [92, "🔶 Yellow card"],
// ]);

// // #1
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// // #2
// gameEvents.delete(64);

// // #3
// console.log(
//   `An even happened, on average, every ${90 / gameEvents.size} minutes.`
// );

// // #4
// for (const [key, value] of gameEvents) {
//   console.log(
//     `${key <= 45 ? "[FIRST HALF]" : "[SECOND HALF]"} ${key}: ${value}`
//   );
// }
/* ////////////////////////////////////////////*/
// MAPS

// const question = new Map([
//   ["question", "What is the best programming language?"],
//   [1, "C"],
//   [2, "Java"],
//   [3, "Javascript"],
//   ["correct", 3],
//   [true, "Correct!"],
//   [false, "Try again."],
// ]); // Niz nizova, prva vrijednost key, druga value

// console.log(question);

// // Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// // Quiz example
// console.log(question.get("question"));
// for (const [key, value] of question) {
//   if (typeof key === "number") console.log(`Answer ${key}: ${value}`);
// }
// // const answer = Number(prompt("Your answer: "));
// const answer = 3;
// console.log(answer);

// // RADI ALI, UMJESTO TERNARY MOZE JOS JEDAN .GET ZA TRUE/FALSE
// // question.get("correct") === answer
// //   ? console.log(question.get(true))
// //   : console.log(question.get(false));

// console.log(question.get(question.get("correct") === answer));

// // Converting a map to an array
// console.log(...question);
// // console.log(question.entries()); Identicno ko i samo ...question
// console.log([...question.keys()]);
// console.log([...question.values()]);
// // Radi, ali se moraju convert u arrayove i spreadati prvo

///////////////////////////////////////////
// // MAPS - Fundamentals */

// const rest = new Map();
// rest.set("name", "Classico Italiano");
// rest.set(1, "Firenze, Italy");
// console.log(rest.set(2, "Lisbon, Portugal"));

// rest
//   .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
//   .set("open", 11)
//   .set("close", 23)
//   .set(true, "We are open :D")
//   .set(false, "We are closed :(");

// console.log(rest.get("name"));
// console.log(rest.get(true));
// console.log(rest);

// const time = 21;
// console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

// console.log(rest.has("categories"));
// rest.delete(2);
// // rest.clear();
// console.log(rest.size);

// const arr = [1, 2];
// rest.set(arr, "Test 1");
// console.log(rest.get(arr));

// rest.set(document.querySelector("h1"), "Heading");
// console.log(rest);

// rest.set([1, 2], "Test2");
// console.log(rest);
// console.log(rest.get([1, 2])); - NE RADI, [1,2] su na dva mjesta na 2 razlicite pozicicje u heapu

// SETS

// const ordersSet = new Set([
//   "Pasta",
//   "Pizza",
//   "Pizza",
//   "Risotto",
//   "Pasta",
//   "Pizza",
// ]);

// console.log(ordersSet);
// console.log(ordersSet.size); // nije .length ko array
// console.log(ordersSet.has("Pizza"));
// console.log(ordersSet.has("Bread")); // slicno ko .includes u array
// ordersSet.add("Garlic Bread");
// ordersSet.add("Garlic Bread"); // Opet ce samo 1 biti, set je unique
// ordersSet.delete("Risotto");
// // ordersSet.clear(); Obrise sve elemente
// console.log(ordersSet);

// for (const orders of ordersSet) console.log(orders);

// // Example
// const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];
// const staffUnique = [...new Set(staff)]; // Spread  operator ce elemente seta proslijediti odvojene zarezom i napraviti novi niz
// console.log(staffUnique);
// console.log(new Set(staff).size);

// console.log(new Set("Bakirkreco").size); // Broj individualnih charactera u stringu

// ------------ CODING CHALLENGE #2 -------------

// // #1
// for (const [num, player] of game.scored.entries()) {
//   console.log(`Goal ${num + 1}: ${player}`);
// }

// // #2
// let average = 0;
// const oddValue = Object.values(game.odds);
// console.log(oddValue);
// for (const currentOdd of oddValue) {
//   average += currentOdd;
// }
// console.log(average / oddValue.length);

// // #3
// const oddsEntriesArray = Object.entries(game.odds);
// // console.log(oddsEntriesArray);
// for (const [team, odd] of oddsEntriesArray) {
//   const teamString = team === "x" ? "draw" : `victory ${game[team]}`;
//   console.log(`Odd of ${teamString}: ${odd}`);
// }

// // #4
// // console.log(game.scored);
// const scorers = {};

// for (const players of game.scored) {
//   // console.log(players);
//   scorers[players] === undefined ? (scorers[players] = 1) : scorers[players]++;
//   // console.log(scorers[players]);
// }
// console.log(scorers);

// ------------------------------------------------

// // Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day}, `;
// }
// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Property ENTRIES - Entire object
// const entries = Object.entries(openingHours);
// for (const [day, { open, close }] of entries) {
//   console.log(`On ${day} we open at ${open} and close at ${close}`);
// }
// ------------ OPTIONAL CHAINING --------------
// if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// // With optional chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// // Example
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? "closed";
//   console.log(`On day ${day}, we open at ${open}`);
// } // [day] = ["Thu"] - kada [] koristimo mozemo objektu pristupiti uz pomoc stringa
// // Samo ako property prije ? postoji (nije null ili undefined) onda ce se .open odviti

// // Methods
// console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
// console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// // Arrays
// const users = [{ name: "Bakir", email: "hello@bakir.io" }];
// console.log(users[0]?.name ?? "User array empty");

// FOR OF LOOP

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu) console.log(item);

// for (const [i, el] of menu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// --------------- #1 CODING CHALLENGE ------------------
// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrussia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

// // 1.
// const [players1, players2] = game.players;
// console.log(players1, players2);

// // 2.
// const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);

// // 3.
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

// // 4.
// const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
// console.log(players1Final);

// // 5.
// const {
//   odds: { team1, x: draw, team2 },
// } = game;
// console.log(team1, draw, team2);

// // 6.
// const printGoals = function (...names) {
//   console.log(names, "Goals scored: " + names.length);
// };

// printGoals("Davies", "Muller", "Lewandovski", "Kimmich");
// printGoals(...game.scored);

// // 7.
// team1 < team2 && console.log("Team 1 is more likely to win.");
// team2 < team1 && console.log("Team 2 is more likely to win");
//-----------------------------------------------------------
// const rest1 = {
//   name: "Capri",
//   numGuests: 0,
// };

// const rest2 = {
//   name: "La Piaza",
//   owner: "Giovanni Rossi",
// };

// // OR assignment operator

// // rest1.numGuests = rest1.numGuests || 10;
// // rest2.numGuests = rest2.numGuests || 10;

// // rest1.numGuests ||= 10;
// // rest2.numGuests ||= 10;

// // nullish assignment operator

// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// AND assignment operator

// rest1.owner = rest1.owner && "<ANONYMOUS>";
// rest2.owner = rest2.owner && "<ANONYMOUS>";

// rest1.owner &&= "<ANONYMOUS>";
// rest2.owner &&= "<ANONYMOUS>";
// console.log(rest1, rest2);

// NULLISH OPERATOR ??

// restaurant.numGuests = 0;
// const guests = restaurant.numGuests || 10;
// console.log(guests);

// // "Nullish" values: null i undefined, 0 i "" nisu nullish
// const guestCorrect = restaurant.numGuests ?? 10;
// // ?? je false samo kad je to slucaj (nastavlja dalje)
// console.log(guestCorrect);

// console.log("--- OR ---");
// // Use ANY data type, return ANY data type and short-circuiting
// console.log(3 || "Bakir");
// console.log("" || "Bakir");
// console.log(true || 0);
// console.log(undefined || null); // Ako nijedna nije, output ce zadnju tj null

// console.log(undefined || 0 || "" || "Hello" || 23 || null);

// restaurant.numGuests = 23; // 1) Ako je ovo truthy, tj ima vrijednost
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);

// const guests2 = restaurant.numGuests || 10; // 2) Onda se ovdje outputa isti broj, u protivnom ide na sljedeci/defaultni tj. 10
// console.log(guests2);

// console.log("--- AND ---"); // Stane cim je prvi value false, jer vise AND condition nije ispunjen
// console.log(0 && "Bakir");
// console.log(7 && "Bakir");

// console.log("Hello" && 23 && null && "Bakir");

// // Practical example
// if (restaurant.orderPizza) {
//   // Provjerimo da li orderPizza uopste postoji, ako da onda tek pozovemo
//   restaurant.orderPizza("Mushrooms", "Pepperoni");
// }

// restaurant.orderPizza && restaurant.orderPizza("Mushrooms", "Pepperoni"); // Alternativa if-u

/* ---------------------- !!! VEOMA BITNO !!! ---------------------- */
// || OR - vratit ce prvi "truthy" value, ili zadnji ako su svi "falsy", koristi se za setting default values

// && AND - vratit ce prvi "falsy" value, ili zadnji ako su svi "truthy", koristi se za izvrsenje koda u drugom operantu ako je prvi true (zamjena if statementu)

// // ---------- REST OPERATOR -----------

// // 1) Destructuring

// // REST je na lijevoj strani = ...
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];
// console.log(pizza, risotto, otherFood);

// // Objects
// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) Functions
// const add = function (...numbers) {
//   // 2. Onda ...numbers mijenja nazad u niz - REST
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };

// add(2, 3);
// add(5, 3, 7, 2);
// add(8, 2, 5, 3, 2, 1, 4);

// const x = [23, 5, 7];
// add(...x); // 1. Proslijedjuje niz x, identicno ko i pojedinacno 23, 5, 7 - SPREAD

// restaurant.orderPizza("Pepperoni", "Mushrooms", "Onion");
// restaurant.orderPizza("Pineapple;");

// ---------------SPREAD OPERATOR--------------------

// const arr = [7, 8, 9];

// const newArr = [1, 2, ...arr];
// console.log(newArr);

// const newMenu = [...restaurant.mainMenu, "Gnocci"];
// console.log(newMenu); // Spread operator ne moze kreirati nove varijable, samo gdje su ocekivane values razdvojene zarezom

// // Copy array (shallow)
// const mainMenuCopy = [...restaurant.mainMenu];

// // Join 2 or more arrays
// const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
// console.log(menu);

// // STRING je takodjer iterable varijabla kao i array, pa moze spread na nju
// const str = "Bakir";
// const letters = [...str, " ", "K."];
// console.log(letters);

// const ingredients = [
//   // prompt("Let's make pasta! Ingredient 1 ?"),
//   // prompt("Ingredient 2?"),
//   // prompt("Ingredient 3?"),
// ];
// console.log(ingredients);

// restaurant.orderPasta(...ingredients);

// // Objects with spread operator (since ES6)
// const newRestaurant = { foundedIn: 1998, ...restaurant, founder: "Jeff" };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = "Ristorante Roma";
// console.log(restaurantCopy.name, restaurant.name);
//------------ DESTRUCTURING OBJECTS --------------

// restaurant.orderDelivery({
//   time: "22:30",
//   address: "Via del Sole, 21",
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({ address: "Via del Sole, 21", starterIndex: 1 });

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters); // sa = [] se inicijalizira defaultna vrijednost, u ovom slucaju prazan array

// // Mutating variables in objects
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };

// ({ a, b } = obj); // Mora zagrada, ili ce biti sintax error jer pocinje line sa '{'
// console.log(a, b);

// // Nested objects
// const {
//   fri: { open, close }, // moze i ovdje novo ime odmah se dodijeliti, npr open: o, close: c; o i c su nova imena
// } = openingHours;
// console.log(open, close);

// const arr = [2, 3, 4];

// const [x, y, z] = arr;
// console.log(x, y, z);

// let [main, , secondary] = restaurant.categories; // Preskace 2.
// console.log(main, secondary);

// // Switching variables (old school)
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// // console.log(main, secondary);

// // Switching variables using array destructor
// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);

// // Nested destructuring
// const nested = [2, 4, [5, 6]];
// // const [i, , j] = nested;
// // console.log(i, j);
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// // Default values
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r);

// // Object assign property, za true kopiranje objekta
// const bake = {
//   ime: "bake",
//   prezime: "kreco",
// };

// const keba = Object.assign({}, bake);
// keba.ime = "keba";
// keba.prezime = "cokre";
// console.log(bake, keba);
/*

// ------ JASNIJI PRIMJER ZA NESTED OBJEKAT U OBJEKTU ------*/

// const bakir = {
//   ime: "Bakir",
//   prijatelji: {
//     prvi: "Proho",
//     drugi: "Ajda",
//     treci: { haver1: "Deni", haver2: "Alden" },
//   },
// };

// // #1
// const { prijatelji } = bakir; // Destrukturiranje objekta bakir radi kreiranja varijable (objekta) prijatelji
// console.log(prijatelji);

// // #2
// const {
//   prijatelji: { prvi, drugi },
// } = bakir; // Destrukturiranje objekta bakir radi kreiranja varijabli prvi i drugi, koje su bile nested u objektu prijatelji
// console.log(prvi, drugi);

// //#3
// const {
//   treci: { haver1, haver2 },
// } = prijatelji; // Destrukturiranje objekta prijatelji radi kreiranja varijable haver1 i haver2, koje su bile nested u njemu
// console.log(haver1, haver2);
// // !!! Prije #3 nije neophodno #1 Moglo je i bakir.prijatelji ali je Jonas iz nekog razloga ovako uradio !!!

// ---------------- PIZDARIJE ------------------

// Manuelni trim method (zajebancija)

// let biloSlovo = false;
// for (let letter = 0; letter < lowerEmail.length; letter++) {
//   // console.log("LETTER JE " + letter);

//   if (lowerEmail[letter] === " " && biloSlovo === false) {
//     lowerEmail = lowerEmail.slice(letter + 1);
//     letter = -1;
//   } else if (lowerEmail[letter] !== " ") {
//     biloSlovo = true;
//   } else if (lowerEmail[letter] === " " && biloSlovo === true) {
//     lowerEmail = lowerEmail.slice(0, letter);
//   }
// }
// console.log(lowerEmail);

// const niz = [1, 2, 3, 4, 5];
// const veciOdTri = niz.filter(function (clan) {
//   return clan > 3;
// });

// console.log(veciOdTri);
/* 
const brat = document.querySelector(".brat");

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    brat.style.marginRight = "0px";
    brat.style.marginLeft = "1353px";
  }
  if (e.key === "ArrowLeft") {
    brat.style.marginLeft = "0px";
    brat.style.marginRight = "1353px";
  }
  if (e.key === "ArrowDown") {
    brat.style.marginTop = "100px";
  }
  if (e.key === "ArrowUp") {
    brat.style.marginTop = "20px";
  }
  console.log(e.key);
});

brat.addEventListener("click", function () {
  brat.insertAdjacentHTML("afterend", "<h3>NE SMIJE TE NIKO DIRAT</h3>");
});

const bakir = {
  visina: 183,
  tezina: 93,
  ime: "Bakir",
  prezime: "Kreco",
  ljudi: {
    haveri: ["Ajda", "Tare"],
    familija: ["Eldin", "Dzenita", "Berina"],
    ljubavi: {
      najveca: "Emina",
      prva: "Merima",
      glupa: "Zorana",
    },
  },
};

const nekiNiz = [2, 5, 10, 15, 20];
const noviNiz = nekiNiz.filter(clan => clan % 2 === 0);
const drugiNiz = nekiNiz.map(clan => clan * 2);
console.log(noviNiz);
console.log(drugiNiz);

const ukupno = nekiNiz.reduce((acc, cur) => (acc += cur), 0);
console.log(ukupno);
 */
