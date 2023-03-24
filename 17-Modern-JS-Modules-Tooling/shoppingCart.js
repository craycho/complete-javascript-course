// Exporting module
// console.log("Exporting module");

/* // Blocking code - Kod u script.js mora prvo cekati da sav kod u shoppingCart.js zavrsi
console.log("Start fetching users");
await fetch("https://jsonplaceholder.typicode.com/users");
console.log("Finish fetching"); */

// const shippingCost = 10;
export const cart = [];

// Named export
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  // console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as qt };

// Default export, koristi se kad je samo jedan export po modulu
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
