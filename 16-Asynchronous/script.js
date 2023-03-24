"use strict";
// https://restcountries.com/v3.1/all
// https://restcountries.com/v3.1/name/{name}

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (message) {
  countriesContainer.insertAdjacentText("beforeend", message);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////

/* const getCountryData = function (country) {
  const request = new XMLHttpRequest(); // Kreira request
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`); // Seta mu parametere (method i URL)
  request.send(); // Initiatea request

  // Cim .send() zavrsi, load event ce se desiti
  request.addEventListener("load", function () {
    // console.log(this.responseText); // this === request

    const [data] = JSON.parse(this.responseText); // Vrati niz objekata, nama samo treba prvi pa dereferenciramo niz
    console.log(data);

    const html = ` <article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
}; 

// getCountryData("bosnia");
// getCountryData("usa"); */

// ------ Callback hell (Callback funkcije u callback funkcijama) ------

const renderCountry = function (data, className = "") {
  // Neighbor drzave imaju vlastitu klasu, pa proslijedimo string "neighbour"
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
  </div>
</article>`;
  // console.log(data);

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
/*
const getCountryAndNeighbor = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest(); // Kreira request
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`); // Seta mu parametere (method i URL)
  request.send(); // Initiatea request

  // Cim .send() zavrsi, load event ce se desiti
  request.addEventListener("load", function () {
    // console.log(this.responseText); // this === request

    const [data] = JSON.parse(this.responseText); // Vrati niz objekata, nama samo treba prvi pa dereferenciramo niz
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbor country (2)
    const neighbor = data.borders?.[0]; // Provjerimo da li drzava uopste ima neighbor, ako ima outputamo prvog
    // if(!neighbor) return; Moglo je i ovako

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`); // Moze i sa codeom search, samo name u URL promijeniti u alpha
    request2.send();

    request2.addEventListener("load", function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, "neighbour");
    });
  });
};

getCountryAndNeighbor("bosnia");
 */

// ----------------- Promises (Fetch API) -----------------

// STARI NACIN
// const request = new XMLHttpRequest(); // Kreira request
// request.open("GET", `https://restcountries.com/v3.1/name/${country}`); // Seta mu parametere (method i URL)
// request.send(); // Initiatea request

// NOVI NACIN, za jednostavne GET requestove
// const request = fetch("https://restcountries.com/v3.1/name/bosnia");
// console.log(request);
// fetch returna "Promise" - Objekat koji sluzi kao placeholder za buduci rezultat async operacije (npr. AJAX call)

// const getCountryData = function (country) {
//   // .then() se moze pozvati na svaki promise s ciljem handleaenja istog, u njeg proslijedimo callback
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); // .json() takodjer vraca novi promise, poziva se da bi mogli read data iz responsea
//     }) // jer return promise, na njega mozemo opet pozvati .then()
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });

/* const getCountryData = function (country) {
  // .then() se moze pozvati na svaki promise s ciljem handleaenja istog, u njeg proslijedimo callback
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json()) // jer callback returna promise (response.json() je promise), na njega mozemo opet pozvati .then()
    .then(data => renderCountry(data[0])); // .json() se poziva da bi mogli read data iz responsea (umjesto "load" event handlera i JSON.parse())
};
// };
getCountryData("bosnia"); */

// -------------- Chaining promises ---------------

/* const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error("Country not found. " + response.status); // throw odma terminatea trenutnu funkciju, isto ko i return
      // Kreiranje i throwanje bilo kojeg errora ce odma uciniti da je promise rejected i pozvati .catch()

      return response.json();
      //, err => alert(err) - Druga funkcija koja se izvrsi je kada je promise rejected
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
      // return 23
      // Sta se god manuelno returna iz promisea ce postati fulfilled (successfully fetched) value tog promisea
    })
    .then(response => {
      if (!response.ok) throw new Error("Country not found.");

      return response.json();
    })
    .then(data => renderCountry(data[0], "neighbour")) // data = return value prethodnog thena (fulfilled value promisea)
    .catch(err => {
      console.error(`Error je: ${err}`);
      renderError("Something went wrong! " + err.message + " Try again!"); // error argument u .catch je objekat sa raznim properties
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
}; */

// .then() se poziva samo kad je promise fulfilled
// .catch() se poziva samo kad je promise rejected
// .finally() se poziva uvijek, bez obzira na outcome
/* I .then() i .catch() returnaju promise */

// --------------- Isto sa helper JSON function ----------------

/* const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`); // throw odma terminatea trenutnu funkciju, isto ko i return
    // Kreiranje i throwanje bilo kojeg errora ce odma uciniti da je promise rejected i pozvati .catch()

    // U protivnom ce se odviti normalni return
    return response.json();
  });
};
 
const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found."
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      // Da ne koristimo ?. morali bi if (!neighbor) throw new Error("No neighbor found")

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbor}`,
        "Neighbor not found."
      );
    })
    .then(data => renderCountry(data[0], "neighbour"))
    .catch(err => {
      console.error(`Error je: ${err}`);
      renderError("Something went wrong! " + err.message + " Try again!");
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
/*
btn.addEventListener("click", function () {
  getCountryData("bosnia");
});

// getCountryData("HEEEJ"); 404
*/

// ----------------- CODING CHALLENGE #1 -----------------
/* 
const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=105180609705722325358x2496`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} Problem with geocoding`);

      // console.log(response);
      return response.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);

      // Rendering a country with received data
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} Problem with geocoding`);

      // console.log(response);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err.message + " ❌❌❌ ");
    });
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
 */
// -------------- Event loop ----------------
/* 
console.log("Test start");
setTimeout(() => {
  console.log("0 sec timer");
}, 0);
Promise.resolve("Resolved promise 1").then(res => console.log(res));
console.log("Test end");
 */
// Prvo ce se izvrsiti sav kod izvan callback funkcija, tj. "Test start", a onda "Test end"
// Drugo ce se izvrsiti promise ("Resolved promise 1"), jer je u "microtasks queue", koja ima prioritet nad "callback queue"
// Konacno ce outputati "0 sec timer" iz callback queue

// ---------------- Building a promise -----------------
/* 
// Kao argument u Promise se proslijedi tzv. "executor function", koji ce odmah pozvati Promise constructor
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lottery draw started!");
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve("You WIN ✔"); // Da setamo vrijednost resolvanog promisea koristimo resolve() funkciju kojoj proslijedimo resolved value
    } else {
      reject(new Error("You LOSE ❌")); // Slicno za rejected promise
    }
  }, 2000);
});

// Svaki promise moze biti consumean koristeci .then() method. Isti kao argument prima resolved/fulfilled vrijednost promisea (res)
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));
 */
// ----------- Promisifying callback functions ------------
/* 
// .fetch je isto funkcija koja returna promise, ovdje pravimo vlastitu (setTimeout)
const wait = function (seconds) {
  // Timer nikada nece imati rejected vrijednost, pa samo moze biti resolved
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
    // Resolve je callback function koji zelimo pozvati nakon odredjenog vremena
  });
};

wait(2)
  .then(() => {
    console.log("I waited for 2 seconds");
    return wait(1);
  })
  .then(() => console.log("I waited for another second"));

// Returnaju novi Promise objekat koji je odma resolvean ili rejectan sa datim value/errorom
Promise.resolve("abc").then(res => console.log(res));
Promise.reject(new Error("abc")).catch(x => console.error(x));
 */

// ------------- Promisifying Geolocation API -------------
/* 
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(new Error(err))
    // );
    // Ovo gore je isto kao i:
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // Umjesto da resolve setamo u callback funkciji koja se izvrsi kad je uspjesno Geolocation izveden, resolve POSTAJE sam callback function koji se izvrsi ako je uspjesan API
    // DALJI ELABORATION:
    // I navigator.geolocation.getCurrentPosition() i new Promise() kao parametre primaju dvije callback funkcije.
    // U promiseu se prva odvija kada je resolved, druga kada je rejected. U geolocation prva se odvija kada upjesno retrieva geolocation data, druga
    // kada ne uspije (aka error). Stoga je logicno da resolve = uspjesno fetchan geolocation data, a reject = error prilikom fetchanja data. 
    
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=105180609705722325358x2496`
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} Problem with geocoding`);

      // console.log(response);
      return response.json();
    })
    .then(data => {
      // console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);

      // Rendering a country with received data
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status} Problem with geocoding`);

      // console.log(response);
      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err.message + " ❌❌❌ ");
    });
};

btn.addEventListener("click", whereAmI);
 */

// ---------------- CODING CHALLENGE #2 ----------------

// MOJE RJESENJE, RADI ALI NIJE IDEALNO
/* 
let currentImage;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.src = imgPath;
    currentImage = image;

    // image.addEventListener("load", function () {
    //   document.querySelector(".images").append(image);
    // });

    resolve(image);
    reject(new Error("Error loading image!"));
  });
}; */

/* createImage("img/img-1.jpg")
  .then(image => {
    image.addEventListener("load", function () {
      document.querySelector(".images").append(image);
    });
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then(image => {
    image.addEventListener("load", function () {
      document.querySelector(".images").append(image);
    });
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
  })
  .catch(err => {
    console.error(err.message);
  });
 */

// JONASOVO RJESENJE, VEOMA SLICNO
/* 
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.src = imgPath;

    image.addEventListener("load", function () {
      document.querySelector(".images").append(image);
      resolve(image); // Image je resolvean samo ako je uspjesno loadan
    });

    image.addEventListener("error", function () {
      reject(new Error("Error loading image!"));
    });
  });
};

let currentImage;

createImage("img/img-1.jpg")
  .then(img => {
    currentImage = img;
    console.log("Image 1 loaded");
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then(img => {
    currentImage = img;
    console.log("Image 2 loaded");
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = "none";
  })
  .catch(err => console.error(err));
 */

// ------------ Consuming promises with async/await -------------

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Async funkcije ce se nastaviti paralelno odvijati u pozadini, izvrsavajuci kod u sebi
/* const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Za ovaj promise nije potreban manual error handling ovdje, vec ga handlea catch() na kraju (jer smo tako napravili geolocation)

    // Reverse geoocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=105180609705722325358x2496`
    ); // resGeo i response postanu Response objekti
    if (!resGeo.ok) throw new Error("Problem getting location data");

    const dataGeo = await resGeo.json();
    // .json() - "It returns a promise which resolves with the result of parsing the body text as JSON."
    // Tj. resolvean value response.json() promisea je tzv. data objekat

    // Country data
    // Sljedece je identicno kao: fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

    // Await expression ce zaustaviti izvrsenje ostatka funkcije dok se ne fulfilla ovaj promise
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    ); // "When execution resumes, the value of the await expression becomes that of the fulfilled promise."
    if (!response.ok) throw new Error("Problem getting country");

    const data = await response.json();

    renderCountry(data[0]);
  } catch (err) {
    // ----------- Error handling sa try/catch ------------
    console.error(`${err}`);
    renderError(`Something went wrong ${err.message}`);
  }
};

whereAmI();
// console.log("Ovo ce se log prije funkcije");
 */

// ------------- Returning values from async functions -------------
/* 
const whereAmI = async function (country) {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=105180609705722325358x2496`
    );
    if (!resGeo.ok) throw new Error("Problem getting location data");
    const dataGeo = await resGeo.json();

    // Country data
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!response.ok) throw new Error("Problem getting country");
    const data = await response.json();
    renderCountry(data[0]);

    return `2: You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`Something went wrong ${err.message}`);

    // Reject promise returned from async function
    throw err;
    // Moramo jos jednom manuelno throw error ovdje, jer ce inace async funkcija uvijek vratiti fulfilled Promise
  }
};
 */
// whereAmI();
// const city = whereAmI(); // Returnat ce promise

// Value koji returnamo iz funkcije ce postati fulfilled value tog promisea
// Da bih dobili value, promise se mora handleati sa .then()

// ---- Nije neispravno, ali se moze uraditi sve sa async/await ----
// console.log("1. Will get location");
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2: ${err.message}`))
//   .finally(() => console.log("3: Finished getting location"));

// ---------- Returning values from functions with async/await ----------
/* 
(async function () {
  try {
    const location = await whereAmI();
    console.log(location);
  } catch (err) {
    console.error(err);
  }
  console.log("3: Finished getting location");
})(); // async IFFE
 */

// --------------- Paralelni Promises ----------------
/* 
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
}; */

/*
const getThreeCountries = async function (c1, c2, c3) {
  try {
    // Ovako ce se pojedinacno izvrsiti svaki promise, cekajuci da zavrsi prethodni
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // Promise.all prima niz Promisea i returna novi Promise, koji ih izvrsava sve odjednom
    // Fulfill value u Promise.all je takodjer niz
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]); 

    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  } // Ako se jedan Promise rejecta u Promise.all, svi se rejectaju
};

getThreeCountries("Portugal", "Canada", "Croatia");
 */

// ---------- race, allSettled i any Promise combinators ----------
/* 
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/russia`),
    getJSON(`https://restcountries.com/v3.1/name/france`),
  ]);
  // Promise.race returna najbrze (prvi) settleovan Promise, te ukoliko je fulfilled storea mu value u varijablu
  // Race moze pobijediti i rejectovan Promise
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

// Ako fetchanje traje duze od 5 sekundi, nastat ce error
Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/france`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
// Isto ko i Promise.all, samo ne short-circuita kad je jedan rejected vec ih sve returna

// Promise.any [ES2021]
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("Error"),
  Promise.resolve("Success"),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
// Promise.any vraca PRVI FULFILLED Promise, ignorise sve rejected, stoga ce rezultat uvijek biti fulfillan Promise
 */

// ----------------- CODING CHALLENGE #3 ------------------

// PART 1

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.src = imgPath;
    console.log("DESILA SE");
    image.addEventListener("load", function () {
      document.querySelector(".images").append(image);
      resolve(image); // Image je resolvean samo ako je uspjesno loadan
    });

    image.addEventListener("error", function () {
      reject(new Error("Error loading image!"));
    });
  });
};

const loadNPause = async function () {
  try {
    // First image
    let image = await createImage("img/img-1.jpg");
    console.log(`Image 1 loaded`);
    await wait(2);
    image.style.display = "none";

    // Second image
    image = await createImage("img/img-2.jpg");
    console.log(`Image 2 loaded`);
    await wait(2);
    image.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};

// loadNPause();

// PART 2

const loadAll = async function (imgArr) {
  try {
    // 1.) async img => await createImage(img) ne bi postiglo sta zelimo, jer async funkcije uvijek returnaju Promise, bez obzira sta mi napisemo
    // 2.) Inace bi trebalo async i await, da drugi dio saceka izvrsenje ove funkcije, ali sam createImage() je async, pa ce donji dio cekati svakako

    const imgs = imgArr.map(img => createImage(img)); // Moglo je i samo imgArr.map(createImage)
    console.log(imgs); // Returna niz Promisea

    const actualImages = await Promise.all(imgs);
    actualImages.forEach(img => img.classList.add("parallel"));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
