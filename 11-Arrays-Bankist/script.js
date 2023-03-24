"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// -------------- Written code --------------

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = " "; // Ucini da je sav HTML unutar containerMovements jednak praznom stringu, tj ne postoji

  // Kreiramo kopiju pomocu slice, da ne mijenja original
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}; // Doslovno "ubaci" ovaj HTML nakon pocetka "movements" elementa u html, a.k.a ubaci novu stavku

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); // acc je isto ko i account1, account2 etc
  labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ") //.split returna array, pa .map se moze nizati na nju
      .map(name => name[0])
      .join("");
  });
};
createUsernames(accounts);

// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event Handler
let currentAccount;

btnLogin.addEventListener("click", function (event) {
  // Prevents form from submitting, tj. onemoguci automatsko refreshovanje stranice prilikom clicka, sto je default ponasanje za <form> elemenat u html-u
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  ); // Mora .value jer input field ne vrati samo vrijednost

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Moglo je i currentAccount (===true) samo, ali je sa optional chaining ?. modernije i krace

    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur(); // Polje PIN izgubi fokus, tj blinking cursor

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (event) {
  event.preventDefault(); // Da ne bi reloadalo page
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input field
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
    // ?. optional chaining da provjerimo da li postoji receiverAcc
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement (loan)
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (event) {
  event.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    ); // .findIndex vrati index elementa koji odgovara uslovu
    console.log(index);
    // Delete account
    accounts.splice(index, 1); // Pocetna pozicija, broj elemenata

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input field
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  // !sorted, ako je false bit ce true, ako je true bit ce false
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////

// let arr = ["a", "b", "c", "d", "e"];

// // SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4)); // od 2 do 4 indeksa, ne includea cetvrti
// console.log(arr.slice()); // Kopira niz, clan po clan, isto spread

// // SPLICE
// // console.log(arr.splice(2));
// arr.splice(-1); // Rijesi se zadnjeg elementa
// arr.splice(1, 2); // Od index 1 elementa, removeaj 2 elementa
// console.log(arr); // Niz gubi prva 2 elementa za razl od slice

// // REVERSE
// arr = ["a", "b", "c", "d", "e"];
// const arr2 = ["j", "i", "h", "g", "f"];
// console.log(arr2.reverse());
// console.log(arr2); // .reverse method mijenja originalni niz

// // CONCAT
// const letters = arr.concat(arr2); // Na arr se pripaja arr2, ne mijenja arr i arr2
// console.log(letters);
// console.log([...arr, ...arr2]); // Isti rezultat, ne mijenja originalne nizove

// // JOIN
// console.log(letters.join(" - ")); // Rezultat je string sa navedenim separatorom izmedju clanova

// // AT METHOD
// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0)); // Identicno

// // Zadnji element iz niza (stara metoda)
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]); // [0] jer u protivnom je niz
// // Zadnji/prvi element uz upotrebu AT
// console.log(arr.at(-1));
// console.log("Bakir".at(0));

// // ------------ FOR EACH METHOD --------------

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// } // Ispravno, ali bolje for each

// console.log("--------FOR EACH--------");
// movements.forEach(function (movement, index, array) {
//   // Prvi parametar mora biti trenutni element, drugi index, treci citav array koji loopamo
//   if (movement > 0) {
//     console.log(`Movement ${index}: You deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index}: You withdrew ${Math.abs(movement)}`);
//   }
// });
// // FOR EACH za svaki clan niza izvrsi funkciju u zagradi
// // For each ne posjeduje break i continue

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set

// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, _, map) {
//   console.log(`${value}: ${value}`);
// }); // Setovi nemaju key, _ je konvencija za imenovanje throwaway varijable

// // ----------------- CODING CHALLENGE #1 ------------------

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, -2);
//   const dogsCombined = dogsJuliaCorrected.concat(dogsKate);
//   dogsCombined.forEach(function (age, i) {
//     console.log(
//       age >= 3
//         ? `Dog number ${i + 1} is an adult and is ${age} years old.`
//         : `Dog number ${i + 1} is still a puppy!`
//     );
//   });
// };

// const dogsJulia = [3, 5, 2, 12, 7];
// const dogsKate = [4, 1, 15, 8, 3];

// checkDogs(dogsJulia, dogsKate);

// // ------------- MAP METHOD -------------

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(movement => movement * eurToUsd); // .map trazi funkciju kao argument, koja kao return vrijednost treba imati vrijednost elementa novog niza

// // const movementUSDfor = [];
// // for (const mov of movements) movementUSDfor.push(mov * eurToUsd);

// console.log(movements);
// console.log(movementsUSD);

// const movementsDescriptions = movements.map(
//   (movement, i) =>
//     `Movement ${i + 1}: You ${
//       movement > 0 ? "deposited" : "withdrew"
//     } ${Math.abs(movement)}`
// );
// console.log(movementsDescriptions);

// // ------------- FILTER METHOD ---------------

// const deposits = movements.filter(mov => mov > 0);
// // Samo clanovi niza (mov) koji ispunjavaju uvjet (oni koji su true) se filteruju u novi array
// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // -------------- REDUCE METHOD ----------------

// console.log(movements);
// // Accumulator je u sustini sum
// // const balance = movements.reduce(function (accumulator, cur, i, arr) {
// //   console.log(`Iteration ${i}: ${accumulator}`);
// //   return accumulator + cur;
// // }, 0); // Prva vrijednost .reduce je callback funkcija koja mora vratiti sta ce se desiti sa accumulator, druga vrijednost pocetna vrijednost accumulatora

// const balance = movements.reduce((accumulator, cur) => accumulator + cur, 0);
// console.log(balance);

// // Maximum value of movements array
// const max = movements.reduce(
//   (acc, mov) => (acc > mov ? acc : mov),
//   movements[0]
// );
// // Isto kao {
// //   if (acc > mov) return acc;
// //   else return mov;
// // }
// console.log(max);

// // -------------- CODING CHALLENGE #2 ---------------

// const calcAverageHumanAge = function (ages) {
//   // const humanAge = [];
//   // ages.forEach((age, i, ages) => {
//   //   age <= 2 ? humanAge.push(2 * age) : humanAge.push(16 + age * 4);
//   // }); ALI, moderniji nacin je:
//   const humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const matureAge = humanAge.filter(age => age >= 18);

//   console.log("Human age before filtering:\n" + humanAge.join(" "));
//   console.log("Human age for dogs over 18;\n" + matureAge.join(" "));

//   const averageAge =
//     matureAge.reduce((acc, age) => acc + age, 0) / matureAge.length;
//   console.log("Average age of dogs: " + averageAge);
//   console.log("---------------------------------------");
// };

// const ages1 = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];
// calcAverageHumanAge(ages1);
// calcAverageHumanAge(ages2);
// ----------------------------------------------------------

// // PIPELINE
// const eurToUsd = 1.1;
// console.log(movements);

// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUSD);

// // ---------------- CODING CHALLENGE #3 -----------------

// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// // Suma svih clanova podijeljena sa length je isto sto i svaki pojedinacan clan podijeljen sa length, a zatim sabran

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avg1, avg2);
// ---------------------------------------------------------

// // -------------- FIND METHOD --------------
// const firstWithdrawal = movements.find(mov => mov < 0);
// // Vratiti ce prvi element u nizu koji ispunjava uslov, inace se koristi da nadje samo jedan elemenat, tj. jedini koji ispunjava uslov
// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.owner === "Jessica Davis");
// console.log(account);

// // ------------ SOME METHOD -------------
// // Only checks equality
// console.log(movements);
// console.log(movements.includes(-130));

// // Checks condition, Provjerava da li postoji ijedan movement da ispunjava uslov (veci od 0), zatim vraca boolean
// const anyDeposits = movements.some(mov => mov > 0);
// console.log(anyDeposits);

// // -------------- EVERY METHOD --------------
// // Ako svaki element ispunjava uslov, onda vraca true

// console.log(movements.every(mov => mov > 0));
// console.log(account4.movements.every(mov => mov > 0));

// // Separate callback, mozemo i zasebno napisati uslovnu funkciju
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // ------------ FLAT METHOD -------------

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());
// // Izbaci "nested" nizove, pretvori sve u jedan niz, ne mijenja originalni niz

// // Flat po defaultu ima "depth" od 1, moze se mijenjati
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2));

// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat() // Cesto je koristiti prvo map pa flat method
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// // Zato od ES6 postoji jedan metod koji oboje radi, flatMap. Ovdje uzme acc.movements elemente i stavi ih u overallBalance2, a zatim oB2 flatenuje
// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance2);

// // --------------- SORT METHOD ---------------

// // Strings
// const owners = ["Jonas", "Zach", "Adam", "Martha"];
// console.log(owners.sort()); // Mutira originalni array

// // Numbers
// console.log(movements);

// //----------------- NUMBERS RULE  -----------------
// // a - current value, b - next value
// // If return < 0, a will be before b (keep order)
// // If return > 0, b will be before a (switch order)
// //-------------------------------------------------

// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (a < b) return -1;
// // });
// // Sort by ascending
// movements.sort((a, b) => a - b);
// // Ovo je bolje rjesenje, ako je a vece, uvijek je pozitivno, ako je a manje uvijek je negativno
// console.log(movements);

// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (a < b) return 1;
// // });
// // Sort by descending
// movements.sort((a, b) => b - a);
// console.log(movements);

// // ------------- CREATING AND FILLING ARRAYS ------------

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5)); // Kreira navedeni niz

// const x = new Array(7); // Kreira niz sa 7 praznih clanova
// console.log(x);

// // Fill method
// x.fill(1); // Napuni citav niz sa 1
// x.fill(1, 3, 5); // Napuni citav niz sa 1, sa pocetkom na index 3 i zavrsetkom sa 5 (not including 5)
// console.log(x);

// arr.fill(23, 4, 6); // Moze se i postojeci niz napuniti
// console.log(arr);

// // -------------- ARRAY.FROM FUNCTION ----------------

// const y = Array.from({ length: 7 }, () => 1);
// // Drugi argumenat je "mapping" funkcija, isto kao callback funkcija u .map methodu
// console.log(y);

// const z = Array.from({ length: 7 }, (cur, i) => i + 1);
// // cur - trenutni element (trebalo bi "_" kao throwaway variable), i - indeks trenutnog elementa
// console.log(z);

// // Generate a random dice roll to 100
// const dice = Array.from({ length: 100 }, () => Math.trunc(Math.random() * 100));
// console.log(dice);

// // -------- !! BITNO !! -------- .from se moze koristiti i za dobijanje niza iz (from) user interface-a, prvi argument - koje elemente zelimo u nizu, drugi argument - mapping funkcija, transformisanje elemenata u zeljeni oblik

// labelBalance.addEventListener("click", function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll(".movements__value"),
//     el => Number(el.textContent.replace("€", ""))
//   ); // Selektuje sve elemente koji imaju .movements__value klasu i stavi ih u niz, tj. njihov text content convertovan u broj, bez €
//   console.log(movementsUI);

//   // const movementsUI2 = [...document.querySelectorAll(".movements__value")]; spread bi takodjer convertovao node list u niz, ali bi onda odvojeno morali mapping
// });

// // Moglo je i movementsUI.map(el => Number(el.textContent.replace("€", ""))), ali je bolje ovo staviti kao drugi argument .from methoda, jer je callback funkcija

// // ------------- ARRAY METHODS PRACTICE -------------

// // Saberi sve deposite
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((sum, cur) => sum + cur, 0); // flatMap prvo mapuje, pa flat-a
// console.log(bankDepositSum);

// // Koliko deposita ima od najmanje $1000
// // 1. Nacin
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// console.log(numDeposits1000);

// // 2. Nacin
// const numDeposits1000alt = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
// // Mora ++count jer count++ returna originalnu vrijednost, pa tek onda poveca za 1
// console.log(numDeposits1000alt);

// // Kreiraj novi objekat sa reduce
// const { deposits, withdrawals } = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur); Ispravno, ali bolje je:

//       sums[cur > 0 ? "deposits" : "withdrawals"] += cur;
//       // sums[] je conditional pristupanje varijablama, tj. u ovisnosti od uslova u zagradi, umjesto sums.

//       return sums; // Posto je multiline funkcija, accumulator variable se mora eksplicitno returnati (svaka reduce funkcija zahtjeva returnanje acc variable)
//     },
//     { deposits: 0, withdrawals: 0 } // Kao pocetnu vrijednost sums smo kreirali objekat sa ova 2 propertya
//   );

// console.log(deposits, withdrawals);

// // Funkcija koja converta string u Title Case
// const convertTitleCase = function (title) {
//   const capitalize = str => str[0].toUpperCase() + str.slice(1); // Funkcija u funkciji, jer ce nam samo ovdje trebati

//   const exceptions = ["a", "an", "and", "the", "but", "or", "on", "in", "with"];

//   const titleCase = title
//     .toLowerCase()
//     .split(" ")
//     .map(word => (exceptions.includes(word) ? word : capitalize(word)))
//     .join(" "); // Ako je rijec u exceptions samo nju return, u protivnom capitalize

//   return capitalize(titleCase); // Da prva rijec ne bi bila nikad lowercase (npr. and)
// };

// console.log(convertTitleCase("This is a nice title"));
// console.log(convertTitleCase("here is another title with an example"));
// console.log(convertTitleCase("and here is another title with an EXAMPLE"));

// ---------------- CODING CHALLENGE #4 ----------------

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28)) // food is in grams
);
// console.log(dogs[0]);

// 2.
const sarahsDog = dogs.find(dog => dog.owners.includes("Sarah"));

console.log(
  `Sarah's dog is eating ${
    sarahsDog.curFood > sarahsDog.recommendedFood ? "too much" : "too little"
  } food.`
);

// // Za okay range bi ovako moglo
// let sarahsDogEats;
// if (sarahsDog.curFood > sarahsDog.recommendedFood * 1.1) sarahsDogEats = true;
// else if (sarahsDog.curFood < sarahsDog.recommendedFood * 0.9)
//   sarahsDogEats = false;

// console.log(
//   `Sarah's dog eats ${sarahsDogEats ? "too much" : " too little"} food.`
// );

// 3.
// for (const dog of dogs) {
//   console.log("Jede: " + dog.curFood + " Treba: " + dog.recommendedFood);
// }

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood * 1.1)
  .flatMap(dog => dog.owners);

// console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood * 0.9)
  .flatMap(dog => dog.owners);

// console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(" and ")}'s dogs eat too much!`);

console.log(`${ownersEatTooLittle.join(" and ")}'s dogs eat too little!`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6.
const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(checkEatingOkay));

// 7.
const dogsEatingOkay = dogs.filter(checkEatingOkay);

console.log(dogsEatingOkay);

// 8.
console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));

// Trying out DOM bs

const logo = document.querySelector(".logo");
const naslov = document.querySelector(".welcome");

logo.addEventListener("click", function () {
  console.log("REEEEEEEEEE");
  logo.style.opacity = 0;
});

// Pizdarije

const niz = ["a", "b", "c", "d", "e"];
niz[2] = niz[2].toUpperCase();
console.log(niz);

const nizBrojeva = [18, 34, 22, 41, 29];

const nadjeni = nizBrojeva.findIndex(nadj => nadj > 10);
console.log(nizBrojeva[nadjeni]);
// nizBrojeva.splice(nadjeni, 1);
console.log(nizBrojeva);

const punoljetni = nizBrojeva.some(god => god >= 18);
console.log(punoljetni);

const sviPunoljetni = nizBrojeva.every(pun => pun > 18);
console.log(sviPunoljetni);

const konacno = nizBrojeva.reduce((acc, cur) => acc + cur / 2, 0);

console.log(konacno);

const dupliNiz = nizBrojeva.map(cur => cur * 2);
console.log(dupliNiz);

// nizBrojeva.sort((a, b) => b - a);
// console.log(nizBrojeva);

const niz1 = [1, 2, 3, 4, 5];
const niz2 = Array.from({ length: 5 }, (cur, i) => niz1[i] * 3);

console.log(niz2);

const nizRandom = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(nizRandom);
