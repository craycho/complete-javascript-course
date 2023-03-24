"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-05-31T17:01:17.194Z",
    "2022-06-01T23:36:17.929Z",
    "2022-06-02T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0); // Paduj sa 0 dok length ne bude 2
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    // Convert u string da moze pocinjati sa 0
    const sec = time % 60;

    // In each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When time iz 0 seconds stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  // Neophodno 2 zaredom pozvati, jer ima 1 sec delay da se timer uopste pozove nakon prvog pozivanja (1000ms)
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const now = new Date();
// const day = `${now.getDate()}`.padStart(2, 0); // Paduj sa 0 dok length ne bude 2
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

// Day/month/year

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time, Internationalization
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric", // Moze i 2-digit,
      year: "numeric",
      // Funkcija Datetimeformat displaya samo one parametere koje smo ovdje definisali
    };

    // const locale = navigator.language; // Fetcha jezik iz browsera
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    // Intl je Internationalization API, na njeg mozemo pozvati DateTimeFormat funkciju da kreiramo novi formatter, a zatim format postojeci date
    // en-US je tzv. Local string, jezik-drzava, ISO language code table
    // ---------------------------------------------------------

    // const day = `${now.getDate()}`.padStart(2, 0); // Paduj sa 0 dok length ne bude 2, mora prvo convert u string
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Mora .toISO, jer je u protivnom objekat

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer); // Kad postoji bilo kakva aktivnost u aplikaciji ne zelimo da timer tece
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer); // Kad postoji bilo kakva aktivnost u aplikaciji ne zelimo da timer tece
      timer = startLogOutTimer();
    }, 2500);
  }

  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // Conversion
// console.log(+"23"); // Laksi nacin pretvaranja u number

// // Parsing
// console.log(Number.parseInt("30px", 10)); // Automatski izdvoji broj, ali string mora pocinjati sa brojem. Drugi argument je brojni sistem (dekadni ovdje - base 10)
// console.log(Number.parseInt("   2.5rem")); // Output 2

// // Najbolji nacin za citanje broja iz stringa
// console.log(Number.parseFloat("   2.5rem")); // Output 2.5

// // Check if value is NaN
// console.log(Number.isNaN(20));
// console.log(Number.isNaN("20"));
// console.log(Number.isNaN(+"20X")); // Jedino true, jer je NaN

// // Najbolji nacin za provjeriti da li je nesto broj
// console.log(Number.isFinite(20));
// console.log(Number.isFinite("20")); // false
// console.log(Number.isFinite(+"20X")); // false
// console.log(Number.isFinite(23 / 0)); // false jer infinite

// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0)); // I ovo je true

// // Square root
// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2)); // Isto
// console.log(8 ** (1 / 3)); // Za cubic root

// console.log(Math.max(5, 18, "23", 11, 2)); // Daje max value, automatski radi type conversion
// console.log(Math.max(5, 18, "23px", 11, 2)); // Ne radi parsing, NaN

// console.log(Math.min(5, 18, 23, 11, 2));

// /// Constants
// console.log(Math.PI);
// console.log(Math.PI * Number.parseFloat("10px") ** 2);

// console.log(Math.trunc(Math.random() * 6) + 1); // Random dice roll, +1 da offseta trunc jer je inace max 5

// // Generise random int u rasponu min-max
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// // Kada pomnozimo sa (max-min) dobijemo broj izmedju 0 i toga, +1 radi trunc, + min van toga da dobijemo zeljeni range

// console.log(randomInt(10, 20));

// // Rounding integers
// console.log(Math.trunc(23.3));

// console.log(Math.round(23.3));
// console.log(Math.round(23.9)); // Zaokruzi do najblizeg integera
// console.log(Math.ceil(22.3));
// console.log(Math.ceil(23.9)); // Rounds up

// console.log(Math.floor(23.3));
// console.log(Math.floor("23.9")); // Rounds down

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3)); // Nije isto kad su negativni

// // Rounding decimals
// console.log(+(2.7).toFixed(0)); // Returna string i rounda
// console.log(+(2.7).toFixed(3)); // Returna string
// console.log(+(2.3456).toFixed(3));
// // Primitive values nemaju methods, zato se mora uraditi "boxing", tj. pretvaranje u number objekat

// Remainder operator
// console.log(5 % 2);

// // Check if number is even or odd
// // const isEven = n => (n % 2 === 0 ? true : false);
// const isEven = n => n % 2 === 0; // Isto
// console.log(isEven(8));
// console.log(isEven(23));

// labelBalance.addEventListener("click", function () {
//   [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = "orangered";
//     if (i % 3 === 0) row.style.backgroundColor = "blue";
//   }); // Spread converta node list u array
// });

// // Numeric separator
// const diameter = 287_460_000_000; // Samo radi preglednosti, ne mijenja originalni broj
// console.log(diameter);

// const price = 345_99; // ili priceCents
// console.log(price);

// // const PI = _3._1415_; Sve ovo je zabranjeno
// // console.log(PI);

// console.log(Number("230_000")); // Ne radi, NaN

// console.log(2 ** 53 - 1); // Najveci broj sto js moze bezbjedno/precizno represent
// console.log(Number.MAX_SAFE_INTEGER); // Isti

// console.log(3982680437892468286294694206n); // n converta obicni broj u BigInt
// console.log(BigInt(3982680437892468286294694206)); // Biti ce drugaciji radi unutrasnjeg pohranjivanja

// // Operations with Big Int
// console.log(10000n + 10000n);
// console.log(34567890987654323456789098765n * 1000000n);
// // console.log(Math.sqrt(16n)); NE RADI

// const huge = 2345678968249546785627n;
// const num = 23;
// // console.log(huge*num); ERROR
// console.log(huge * BigInt(num)); // Ovako radi

// console.log(20n > 15); // Comparison operator radi, vrsi type conversion
// console.log(20n === 20); // Ovo je false
// console.log(20n == 20); // Ovo je true
// console.log(20n == "20"); // Ovo je true

// console.log(huge + " is really big!"); // Converta u string

// // Divisions
// console.log(10n / 3n); // Samo 3, cut-a decimale
// console.log(10 / 3); // 3.33333333333333..

// // Create a date
// const now = new Date();
// console.log(now); // Trenutni date i vrijeme

// console.log(new Date("Thu Jun 02 2022 21:31:57"));
// console.log(new Date("December 24, 2015"));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// // Prepozna kao Nov 19, 2037, 15:23:05, s tim da je mjesec u js zero-based, pa je novembar = 10

// console.log(new Date(2037, 10, 31)); // Novembar nema 31 dan, pa autocorrecta u 1. Decembar
// console.log(new Date(0)); // Racuna UNIX time, tj. Jan 01. 1970. u 01,00
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Converta u milisekunde, tacno 3 dana iza UNIX vremena

/*
// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037
console.log(future.getMonth()); // 10 (Novembar)
console.log(future.getDate()); // 19, Dan
console.log(future.getDay()); // Thu, dan u sedmici
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2037-11-19T14:23:00.000Z, Z je GMT 0 timezone, standardni format

console.log(future.getTime()); // Milisekunde od UNIX vremena, tzv. "timestamp"
console.log(new Date(2142253380000)); // Dobijes future od milisekundi

console.log(Date.now()); // Da trenutni timestamp

future.setFullYear(2040); // Ista imena i za sve ostale
console.log(future);
 */

// Operations with dates

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(
//   new Date(2037, 3, 14),
//   new Date(2037, 3, 4, 10, 8)
// );
// console.log(days1);

// // ----------- Internationalizing numbers ------------

// const num = 3884567.23;
// const options = {
//   style: "currency", // Unit, percent, currency
//   unit: "celsius", // Ima ih hejbet, ignored kad je currency
//   currency: "EUR", // Locale (en-US) ne definise currency
//   // useGrouping: false, bez zareza/tacki
// };

// console.log("US:", new Intl.NumberFormat("en-EN", options).format(num));
// console.log("Germany:", new Intl.NumberFormat("de-DE", options).format(num));
// console.log("Syria:", new Intl.NumberFormat("ar-SY", options).format(num));
// console.log(
//   "Browser:",
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

// Set Timeout (timer)
const ingredients = ["olives", "spinach"];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}!`),
  3000,
  ...ingredients
); // Event handler (callback function), miliseconds, argumenti callback funkcije (mogu zasebno, a moze niz i spread)
console.log("Waiting..."); // Displaya odmah, prije timeouta

if (ingredients.includes("spinach")) clearTimeout(pizzaTimer);

// // Set Interval
// setInterval(function () {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   console.log(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);
// }, 1000);

// const a = 53;
// const b = 23;
// const c = 11;

// console.log(Number.isFinite(a));

// const datum = new Date();
// console.log(datum);

// console.log(new Date("December 24 2015"));
// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2037, 10, 19, 15, 23, 5));
// console.log(new Date(0));
// console.log(new Date(3 * 24 * 60 * 60 * 1000));

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.toISOString());

// console.log(future.getTime()); // Output 2142253380000
// console.log(new Date(2142253380000)); // Da formatiran datum

// console.log(Date.now());
// future.setFullYear(2022);
// console.log(future);

// const sada = new Date(account1.movementsDates[0]);
// console.log(sada);

// const dan = sada.getDate();
// const mjesec = sada.getMonth() + 1;
// const godina = sada.getFullYear();
// const sat = sada.getHours();
// const minute = sada.getMinutes();
// console.log(
//   `${String(dan).padStart(2, "0")}/${String(mjesec).padStart(
//     2,
//     "0"
//   )}/${godina} ${String(sat).padStart(2, "0")}:${String(dan).padStart(2, "0")}`
// );

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

const dan1 = new Date(2022, 11, 24);
const dan2 = new Date(2022, 10, 17);

const racunaDatum = function (datum1, datum2) {
  return Math.abs(datum2 - datum1);
};

const datum = racunaDatum(dan1, dan2);
console.log("Proslo je " + datum / (1000 * 60 * 60 * 24) + " dana");

// const medjunarodni = new Intl.DateTimeFormat("sr-sp", {
//   day: "numeric",
//   month: "numeric",
//   year: "numeric",
// });
// console.log(medjunarodni.format());

const intbroj = 3883942.24;

console.log(new Intl.NumberFormat("de-DE").format(intbroj));
console.log(new Intl.NumberFormat("bs").format(intbroj));
console.log(new Intl.NumberFormat("de-DE").format(intbroj));

const formatirajPare = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const formatirane = formatirajPare(500, "sr", "BAM");
// console.log(formatirane);

const sastojak = "fafarona";
const spremnaPica = setTimeout(
  // stvari => console.log("Evo pice kume, napravljena je od " + stvari),
  5000,
  sastojak
);

// Timer koji odbrojava 5 sekundi po 0.1 na naslovu

// let tajmer = 5;

// const odbrojavanje = setInterval(() => {
//   labelWelcome.textContent = `${tajmer.toFixed(1)}`;
//   tajmer = Number(tajmer.toFixed(1)) - 0.1;
//   if (tajmer === 0) {
//     clearInterval(odbrojavanje);
//     labelWelcome.textContent = `Boom!`;
//   }
// }, 100);

// tajmer = Number(tajmer.toFixed());

// ------------ PIZDARIJE -------------

const pikseli = "heej";
console.log(Number.parseFloat(pikseli, 10));

if (Number.isNaN(pikseli)) console.log("NAN JE");

console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5));

const danas = new Date();

const optionsBA = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
const dateFormat = new Intl.DateTimeFormat(navigator.language, optionsBA);

console.log(dateFormat.format(danas));

const broj3 = 1245.24;
const optionsNum = {
  style: "unit",
  unit: "celsius",
};
console.log(new Intl.NumberFormat("en-US", optionsNum).format(broj3));

const hej = function () {
  console.log("HEEJ STO SE MEN MANTAAA");
};

const tajmer = setTimeout(hej, 5000);
clearTimeout(tajmer);
