
/**
 * Toma un elemento aleatorio del array pasado como parametro
 * @param {array} array Array del cual se quiere tomar un item aleatorio
 * @returns {number} Elemento aleatorio del array
 */
const pickRandomFromArray = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const random = array[randomIndex];
  return random;
};

const randomizeArray = (array) => {
  const generados = [];
  let random;

  while (generados.length < array.length) {
    random = pickRandomFromArray(array);
    if (!generados.includes(random)) {
      generados.push(random);
    }
  }
  return generados;
};


const generarMaletines = (valores) => {
  const unorderedValues = randomizeArray(valores);
  const maletines = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < valores.length; i++) {
    maletines.push({ numero: i + 1, valor: unorderedValues[i] });
  }
  return maletines;
};

const generarOferta = (array) => {
  /* TODO:
        Cambiar manera en que se realiza el calculo de la oferta,
  */
  const suma = array.reduce((acc, value) => acc + value);
  return suma / array.length;
};


const quitarMaletin = (maletines, numero) => maletines.filter((malet) => malet.numero !== numero);

export {
  pickRandomFromArray,
  randomizeArray,
  generarMaletines,
  generarOferta,
  quitarMaletin,
};
