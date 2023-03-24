"strict mode";

// ------------- Fixing bad code Part 1 --------------

const budget = Object.freeze([
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
]);

const spendingLimits = Object.freeze({
  // .freeze onemoguci mutaciju objekta, ali samo surface level
  jonas: 1500,
  matilda: 100,
});
// spendingLimits.jay = 300;

const getLimit = (limits, user) => limits?.[user] ?? 0;
// Optional chaining radi i sa bracket notation, provjeravamo postoji li user
// Moze i samo spendingLimits[user] ?? 0;

// let lim;

// if (spendingLimits[user]) {
//   lim = spendingLimits[user];
// } else {
//   lim = 0;
// }

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;

// Pure function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = "Jonas"
) {
  // if (!user) user = "jonas";
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
  // budget.push({ value: -value, description, user: cleanUser });
};
const newBudget1 = addExpense(budget, spendingLimits, 10, "Pizza 🍕");
const newBudget2 = addExpense(
  // Moramo proslijediti novodobijeni niz (newBudget1) umjesto originalnog, da bismo zadrzali zadnji entry
  newBudget1,
  spendingLimits,
  100,
  "Going to movies 🍿",
  "Matilda"
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, "Stuff", "Jay");

// console.log(newBudget1);
// console.log(newBudget2);

// 1# Bez arrow funkcija

// const checkExpenses = function (state, limits) {
//   return state.map(entry => {
//     return entry.value < -getLimit(limits, entry.user)
//       ? { ...entry, flag: "limit" } // Napravi kopiju objekta i doda property flag
//       : entry;
//   });
//   // for (const entry of newBudget3)
//   //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = "limit";
// };

// 2# Arrow funkcije
const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: "limit" }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

// Impure function radi console.log
const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(" / ");
  // moglo je i .reduce((str,cur) => `${str} ${cur.description.slice(-2)}` , "")

  console.log(bigExpenses);

  // let output = "";
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : "";
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500);
