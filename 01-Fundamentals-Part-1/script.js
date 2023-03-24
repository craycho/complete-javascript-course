import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const ajda = {
  ime: "Ajda",
  godine: 25,
  haveri: {
    bakir: "Bakir",
    tarik: "Tarik",
  },
};

const ajdaKopija = cloneDeep(ajda);
ajda.haveri.bakir = "Hazim";
console.log(ajda);
console.log(ajdaKopija);
