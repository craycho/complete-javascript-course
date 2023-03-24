/* // Importing module
import { addToCart, totalPrice as price, qt } from "./shoppingCart.js";
addToCart("bread", 5);
console.log(price, qt);
console.log("Importing module");

import * as ShoppingCart from "./shoppingCart.js";
ShoppingCart.addToCart("bread", 5);
console.log(ShoppingCart.totalPrice); */

// Mozemo mixati default i named imports, al treba izbjegavati
// import add, { addToCart, totalPrice as price, qt } from "./shoppingCart.js";

import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 3);

console.log(cart);

// --------------- Top level await ----------------

// Omogucava nam da koristimo await van async funkcija, ali samo u modulima

// console.log("Start fetching");
// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// console.log(res);
// const data = await res.json();
// console.log(data);
// console.log("Finished");

/* 
const getLastPost = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
}; // Returna objekat sa 2 propertya (title i text), kojima su dodijeljene velicine

// Nije idealno (nije clean)
// const lastPost = getLastPost();
// lastPost.then(last => console.log(last));

// Moze top level await
const lastPost = await getLastPost();
console.log(lastPost);
 */

// -------------- Module pattern (Pre-ES6) ---------------
/* 
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

// Ovo je moguce radi closures, const cart je postojao u trenutku kreiranja ShoppingCart2 i to je dovoljno
// console.log(ShoppingCart2); // I prije pozivanja .addToCart, ShoppingCart2 ce u sebi imati 2 clana u cartu, jer .addToCart mijenja ORIGINALNI cart, a ne kopiju istog

ShoppingCart2.addToCart("apple", 4);
ShoppingCart2.addToCart("pizza", 2);

console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost); - undefined, jer je private unutar IFFE

// Primjer closurea
// const funkcija = function (prvi) {
//   const drugi = 5;

//   return function () {
//     return prvi + drugi;
//   };
// };

// const zbir = funkcija(10);
// console.log(zbir());
// console.dir(zbir);
 */

// ---------------- Common JS Modules ----------------
/* 
// Export
export.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
};

// Import
const { addToCart } = require("./shoppingCart.js");

// "Common JS" je module system potreban radi NPM, u kojem export i import rade na gore navedeni nacin */

// -------------- Command line ----------------
/*
dir - display current directory
cd [NAME] - change directory to NAME (moze tab za autocomplete)
cd .. - move one directory up
mk dir - make folder
echo CONTENT > IME.extension - make file of a specific type
echo > ime.extension - isto moze, ali ce traziti input
del ime.extension - delete file
mv imeFajla imeDestinacije - move a file to a folder (../ za parent folder)
rmdir imeFoldera - obrisi folder
Ctrl + C - stop live-server (opcenito terminal)
cd 'c:\Users\Bakir\....' - change directory to any single one in the string

*/

// ----------- Installing NPM Packages (Lodash) -----------
// npm i lodash

// import cloneDeep from "./node_modules/lodash-es/cloneDeep.js"; Radi, ali je veoma intensive
import cloneDeep from "lodash-es"; // Parcel radi sa svim modulima te prepozna ovu sintaksu za sve

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
// state.user.loggedIn = false;
// stateClone.user.loggedIn ce takodjer biti false
// Kopiranje deep-nested objekata ne radi ovako, jer je reference na isti objekat u heapu

// Moguce je pomocu modula u Lodashu
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);

// ------------ Bundling with Parcel and NPM scripts -----------

// npm i parcel --save-dev   // ne smije biti '&' u directory pathu, install Parcel
// npm uninstall parcel
// npx parcel index.html     // inace je bez npx, entrypoint je index.html jer je tu includean script.js, tj file koji zelimo bundleati
// npm install parcel -g     // Mozemo instalirati packages i globalno (kao sto smo live-server, mozemo ih koristiti onda direktno u command line bez npm script stepa)

// Samo Parcel razumije, tzv. "hot model reloading". Kada god je change u jednom od modules triggeruje se rebuild, a taj novi module se injecta u browser bez reloadanja pagea (state se maintain)
if (module.hot) {
  module.hot.accept();
}

// -------- NPM Scripts --------

// "scripts": {
//   "start": "parcel index.html" - Bundleuje sve module
//   "build": "parcel build index.html" - Buildanje finalnog, kompresiranog bundlea
// }, u JSON fileu dodamo script koji zelimo

// Pokrenemo sa: npm run imeSkripte    (start ili build npr)
// Morali smo obrisati "main": "script.js", jer smo mi main entrypoint setali na index.html

// ------------ Babel & Polyfilling ------------
// Koristi se radi backwards compatibility

class Person {
  greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person("Jonas" ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve("TEST").then(x => console.log(x));
// Oba se nece convertati jer Babel moze transpile samo sintaksu, a ne nove features

// Rjesenje je implementirati external library "Core JS"
import "core-js/stable"; // * Prvo se mora instalirati sa npm i core-js
// import "core-js/stable/array/find"; Ako nam npr. treba jedna specificna metoda

// Samo jedan feature nije preko /stable Polyfillan, a to su async funkcije
import "regenerator-runtime/runtime";
