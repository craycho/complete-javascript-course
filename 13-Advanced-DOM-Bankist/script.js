"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// ------------- Modal window -------------

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// -------- Button scrolling --------

btnScrollTo.addEventListener("click", function (e) {
  // e.target je ustv btnScrollTo, slicno this u obj
  const s1coords = section1.getBoundingClientRect(); // Gets coordinates u odnosu na trenutni viewport
  console.log(s1coords);

  console.log("Current scroll X/Y", window.pageXOffset, pageYOffset); // Isto sto i scrollX/scrollY

  // console.log(
  //   "Height/width of current viewport:",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling

  // window.scrollTo(
  //   s1coords.left + window.scrollX, // + scroll mora jer su coordinates relativne trenutnom viewport, a ne cijelom pageu
  //   s1coords.top + window.scrollY
  // ); Moze, ali je nagla tranzicija

  /* window.scrollTo({
    left: s1coords.left + window.scrollX, // + scroll mora jer su coordinates relativne trenutnom viewport, a ne cijelom pageu
    top: s1coords.top + window.scrollY,
    behavior: "smooth", // Da ne bude nagla tranzicija
  }); */ // Old school nacin, sabiranjem pozicija

  section1.scrollIntoView({ behavior: "smooth" });
}); // Samo radi na najnovijim browserima

// -------------- Page navigation ---------------
/*
document.querySelectorAll(".nav__link").forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href"); // Ne moze this.href jer zelimo relative value a ne absolute
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }); // Radi, ali nije memory efficient jer napravi 3 kopije iste funkcije
}); */

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // Matching strategy, da se ignorisu clicks koji su dio parent elementa, a nisu na linkovima
  if (e.target.classList.contains("nav__link")) {
    console.log(e.target); // e.target je gdje se event zapravo desio

    const id = e.target.getAttribute("href"); // Ne moze this.href jer zelimo relative value a ne absolute
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// --------------- Tabbed component ---------------

tabsContainer.addEventListener("click", function (e) {
  /* const clicked = e.target.classList.contains("btn")
    ? e.target
    : e.target.parentElement;   MOJA METODA, radi ali nije ideal*/
  const clicked = e.target.closest(".operations__tab");

  // Guard clause (ako je clicked falsey/null, zavrsi funkciju)
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) // Vrijednost procitana iz data atributa u HTML (data-tab)
    .classList.add("operations__content--active");
});

// ------------- Menu fade animation -------------

const handleHover = function (e) {
  /* console.log(this, e.currentTarget);
 Inace je this isto sto i currentTarget, ali posto smo sa .bind
  promijenili da je this = 1/0.5, to nije slucaj */

  if (e.target.classList.contains("nav__link")) {
    const link = e.target; // Ne treba .closest, jer nema nista drugo osim linkova, kao sto je gore bio span
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img"); // Move up do roditelja i onda search za img u njemu

    siblings.forEach(el => {
      // !== jer ce siblings sadrzavati i sam link
      if (el !== link) el.style.opacity = this; // This je sa .bind set na 1/0.5
    });
    logo.style.opacity = this;
  }
};

/* Event handler funkcije u stvarnosti mogu imati samo jedan argument, a to je event.
Sve ostalo, kao sto je varanje sa mijenjanjem this keyword pomocu .bind method
je ustvari workaround. 
VAZNO: Na ovaj nacin mozemo proslijediti samo JEDAN argument. Ako zelimo vise values
na mjestu tog argumenta proslijedimo niz ili objekat npr./*

/* 
// 1. Nacin za prosljedjivanje argumenata u event handler
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
}); // Jer mouseenter ne "bubble-a"
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
}); */

// 2. Nacin sa bind method (bolji)
nav.addEventListener("mouseover", handleHover.bind(0.5)); // Radi jer .bind vraca novu funkciju
nav.addEventListener("mouseout", handleHover.bind(1));

// -------------- Sticky navigation ---------------

/* const initialCoords = section1.getBoundingClientRect();

window.addEventListener("scroll", function () {
  // Treba izbjegavati scroll event, veoma inefficient
  if (window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});*/

// ---------- Sticky navigation: Intersection Observer API ----------

// const obsCallback = function (entires, observer) {
//   entires.forEach(entry => {
//     console.log(entry);
//   });
// };
// /* Callback pozvan zvaki put kada observed element (section1) intersecta
// root element at the defined threshold */

// const obsOptions = {
//   root: null, // Element that the target/observed element is intersecting, sa null je to cijeli viewport
//   threshold: [0, 0.2], // Percentage of intersection at which the callback function will be called
//   // OR Vise od 10% targeta mora biti u viewportu da bi "intersectao"
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // Section 1 je observed element, ili "target" element

// ------------ Implementing sticky navigation ------------

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; // Entries je ustv. niz, pa destructure za prvi element

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // Kad je 0% headera vidljivo tada se poziva funkcija
  rootMargin: `-${navHeight}px`, // Da bi se nav pojavio tacno 90px prije section1, da je ne bi preklapao
});
headerObserver.observe(header);

// -------------- Revealing elements while scrolling -------------

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries; // Koliko thresholda, toliko entries

  if (!entry.isIntersecting) return; // Guard clause

  entry.target.classList.remove("section--hidden"); // Jer observea sve sections, pa da samo onu koja je trenutni target mijenja
  sectionObserver.unobserve(entry.target); // Nakon sto se pojavio taj section, ne treba vise fade in/out
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // Kada je vidljivo 15% sectiona poziva se funkcija
});

allSections.forEach(function (section) {
  sectionObserver.observe(section); // Posmatra sve sections odjednom, pa ih naknadno moramo razaznati pomocu .target
  // section.classList.add("section--hidden");
});

// ---------------- Lazy loading images -----------------

const imgTargets = document.querySelectorAll("img[data-src]"); // CSS thing: select all img elements that have property "data-src"

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src; // Data properties su pohranjene u .dataset

  // entry.target.classList.remove("lazy-img"); Problem na sporim mrezama, jer ce displayat low quality slike prije nego loadaju high res
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  }); // Load event ce se odviti kada se image loada do kraja

  imgObserver.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px", // Da bi slike loadale malo prije nego se dosegne threshold
}); // * Pozitivan margin: van posmatranog elementa, Negativan: unutar posmatranog elementa

imgTargets.forEach(img => imgObserver.observe(img));

// --------------- Slider component ----------------

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length - 1;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach(dot => dot.classList.remove("dots__dot--active"));
    // Da bismo dodali active na zeljeni slide, prvo moramo remove sa svih

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active"); // Select sve dots__dot koji imaju attribute data-slide="nesto"
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    /* Mnozenjem broja 100 sa indeksom (i) radi dobivanja %, kao gore:
  svaki se put od i mora oduzeti velicina koja ce kao rezultat mnozenja 
  davati za 100 manji rezultat od trenutnog.
  curSlide se odmah povecava za 1 da bi ta velicina bila 1 tj:
  i(0): 100 * (0-1), i(1): 100 * (1-1), i(2): 100 * (2-1), i(3): 100*(3-1);
    Prvi rezultat: -100% 0% 100% 200%
  Iduci je click ta velicina 2 te rezultati budu:
    Drugi rezultat: -200% -100% 0% 100% itd. */

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0); // Starting values, i-0 je i, tj. 0% 100% 200% 300%
    createDots();
    activateDot(0); // Jer u pocetku nijedan slide nije active
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    // if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset; // Destructure objekta
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/*
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header"); // Vraca prvi elemenat koji podudara
const allSections = document.querySelectorAll(".section"); // Vraca node list
console.log(allSections);

document.getElementById("section--1"); // # ne treba
const allButtons = document.getElementsByTagName("button"); // Vraca HTML Collection
console.log(allButtons);

console.log(document.getElementsByClassName("btn")); // . ne treba

// ------------ Creating and inserting elements --------------

// .insertAdjacentHTML, ok skroz, ne fali nista quick and easy

// Mozemo i ponekad trebamo postepeno napraviti
const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics."; Ispravno i ovako
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // Doda message element kao prvi child header elementa
header.append(message); // Isto, samo kao zadnji child, ponistit ce prepend jer ne moze message element biti na 2 mjesta istovremeno
// header.append(message.cloneNode(true)); // Da bismo mogli imati na dva mjesta moramo klonirati, true se odnosi na kloniranje child elemenata

// header.before(message); // Prije elementa napravi drugi (sibling) elemenat
// header.after(message); // Isto samo nakon

// ------------- Deleting elements ---------------
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove(); // Moderna metoda, jednostavna
    // message.parentElement.removeChild(message); Stara metoda, manualno moving up u DOM tree, pa onda down
  });

// ------------ Styles --------------
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// console.log(message.style.color); Ne radi, jer height nije inline style (onaj koji se pise izmedju < >)
console.log(message.style.backgroundColor); // Radi jer je inline style

console.log(getComputedStyle(message).color); // Ovako jedino radi za styles koji su u css, a ne inline - na rezultat funkcije pozovemo .imeStylea
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"; // ,10 radi decimalnog sistema

// document.documentElement.style.setProperty("--color-primary", "orangered"); Sa custom properties je neophodno koristiti setProperty metodu

// ------------- Attributes --------------
const logo = document.querySelector(".nav__logo");

console.log(logo.alt); // Samo standardne HTML properties mogu ovako
console.log(logo.src); // Absolute path
console.log(logo.getAttribute("src")); // Relative path

// logo.alt = "Beautiful logo"; Mijenjanje value attributea

console.log(logo.className); // Output ".nav__logo"

console.log(logo.designer); // Non-standard (custom) property, pa ne moze ovako
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

// Data attributes
console.log(logo.dataset.versionNumber);

// ---------- Classes -------------
logo.classList.add("npr", "itd");
logo.classList.remove("npr");
logo.classList.toggle("npr");
logo.classList.contains("npr"); // Boolean

// Ne koristi, overridea sve postojece klase i dozvoljava samo 1 klasu po elementu
// logo.className = "Bakir";
*/
/*
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  // alert("addEventListener: Great! You are reading the heading.");

  h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1); // #1 Nacin, noviji i bolji
*/

// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You are reading the heading.");
// };  #2 Nacin, old school, nema potrebe ovako raditi

// -------------- EVENT PROPAGATION ----------------
/*
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1));

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor(); // this pokazuje na sam element
  console.log("LINK", e.target, e.currentTarget); // target je gdje se event desio, ne za koji je handler vezan
  // currentTarget je za koji je elemenat event vezan, tj. isto ko i this
  // e.currentTarget === this

  // Stop propagation, ne treba u praksi raditi
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
});
*/
/*
// --------------- DOM TRAVERSING -----------------

const h1 = document.querySelector("h1");

// Going downwards (child elements)
console.log(h1.querySelectorAll(".highlight")); // Sva children h1 koji su .highlight klase
console.log(h1.childNodes); // Prikaze sve (tekst etc)
console.log(h1.children); // Prikaze samo elemente
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Going upwards (parent elements)
console.log(h1.parentNode);
console.log(h1.parentElement); // Prikaze isto, jer je ovaj element node

h1.closest(".header").style.background = "var(--gradient-secondary)"; // Izabere najblizi (parent) element h1 elementu koji sadrzi .header klasu
h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways (siblings)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); // Isto, ali za nodeove
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});
*/

// ---------------- DOM Lifecycle events ----------------

/* document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML Parsed/DOM tree built", e);
}); // Desi se kad se loadaju HTML i JS (ne slike i external content)

window.addEventListener("load", function (e) {
  console.log("Page fully loaded with content", e);
});

/* window.addEventListener("beforeunload", function (e) {
  e.preventDefault(); // U nekim browserima (ne chromeu) potrebno
  console.log(e);
  e.returnValue = "Nebitno"; // Da bismo mogli display message, historical reasons, ne mozemo customize
}); // Desi se kada user pokusa skroz napustiti stranicu */

// ----------- PIZDARIJE ------------

/* const noviEl = document.createElement("div");
noviEl.classList.add("nova-klasa");
noviEl.textContent = "LET'S GO BOYYYSSSSSS";
noviEl.innerHTML = "ARE WE GOING BOYSSSSS";

// header.append(noviEl);

// noviEl.style.backgroundColor = "#3456fd";
// noviEl.style.padding = "40px";
// noviEl.style.fontSize = "20px";

// console.log(getComputedStyle(nav).height);
// const visina = Number.parseFloat(getComputedStyle(nav).width);
// nav.style.width = visina - 50 + "%";

// console.log(btnScrollTo.getBoundingClientRect());
// console.log("Scroll x y", window.scrollX, window.scrollY);
// console.log(
//   "client size",
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

const logo = document.querySelector("#logo");
const section2 = document.querySelector("#section--2");
logo.addEventListener("click", function (e) {
  // window.scrollTo({
  //   left: section2.getBoundingClientRect().left + window.scrollX,
  //   top: section2.getBoundingClientRect().top + window.scrollY,
  //   behavior: "smooth",
  // }); Stari nacin

  // section2.scrollIntoView({ behavior: "smooth" });

  logo.style.backgroundColor = "green";
});

// logo.addEventListener("mouseenter", function () {
//   console.log("STO SE MEN");
// });

nav.addEventListener("click", function (e) {
  nav.style.backgroundColor = "yellow";
  console.log(nav.classList.value);
});

const h1 = document.querySelector("h1");

// Going down (children)
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = "#43ab23";
h1.lastElementChild.style.color = "#12ab89";

// Going up (parents)
console.log(h1.parentNode);

h1.closest(".header").style.background = "var(--color-secondary)";
console.log(h1.closest(".header")); // Isto sto i querySelector, ali prema gore

// Going sideways (siblings)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});
 */
