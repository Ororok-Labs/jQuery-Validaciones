import { extraerValor } from '../input/input.js';

/**
 * Valida que el campo no esté vacío.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si no está vacío, false si está vacío.
 * @example
 * Funciones.texto.requerido('#campo'); // true si '#campo'.value.trim() !== ''
 * Funciones.texto.requerido(document.querySelector('#campo')); // false si entrada.trim() == ""
 * Funciones.texto.requerido("Hola mundo"); // true
 */
export function requerido(entrada) {
  return extraerValor(entrada).trim().length > 0;
}

/**
 * Valida que el texto tenga al menos 'min' caracteres.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} min - Largo mínimo requerido.
 * @returns {boolean} True si length >= min, false si no.
 * @example
 * Funciones.texto.largoMinimo('#campo', 5); // true si longitud >= 5
 * Funciones.texto.largoMinimo(document.querySelector('#campo'), 4); // false si entrada.value < 4
 * Funciones.texto.largoMinimo("Hola mundo", 3); // true
 */
export function largoMinimo(entrada, min) {
  const valor = extraerValor(entrada);
  return valor.trim().length >= min;
}

/**
 * Valida que el texto tenga como máximo 'max' caracteres.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} max - Largo máximo permitido.
 * @returns {boolean} True si length <= max, false si no.
 * @example
 * Funciones.texto.largoMaximo('#campo', 10); // true si longitud <= 10
 * Funciones.texto.largoMaximo(document.querySelector('#campo'), 4); // false si entrada.value > 4
 * Funciones.texto.largoMaximo("Hola mundo", 30); // true
 */
export function largoMaximo(entrada, max) {
  const valor = extraerValor(entrada);
  return valor.length <= max;
}

/**
 * Valida que el texto tenga exactamente 'n' caracteres.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} n - Largo exacto requerido.
 * @returns {boolean} True si length === n, false si no.
 * @example
 * Funciones.texto.largoExacto('#campo', 8); // true si longitud === 8
 * Funciones.texto.largoExacto(document.querySelector('#campo'), 4); // false si entrada.value > 4
 * Funciones.texto.largoExacto("Hola mundo", 30); // false
 */
export function largoExacto(entrada, n) {
  const valor = extraerValor(entrada);
  return valor.length === n;
}

/**
 * Valida que el texto contenga solo letras (sin espacios).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si solo A-Za-z, false si no.
 * @example
 * Funciones.texto.soloLetras('#campo'); // true para 'Hola', false para 'Hola Mundo'
 * Funciones.texto.soloLetras(document.querySelector('#campo')); // false si entrada.value === "12"
 * Funciones.texto.soloLetras("Texto de ejemplo"); // false
 */
export function soloLetras(entrada) {
  const valor = extraerValor(entrada);
  return /^[A-Za-z]+$/.test(valor);
}

/**
 * Valida que el texto contenga solo letras y espacios.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si solo letras y espacios, false si no.
 * @example
 * Funciones.texto.soloLetrasYEspacios('#campo'); // true para 'Hola Mundo'
 * Funciones.texto.soloLetrasYEspacios(document.querySelector('#campo')); // false si entrada.value === "12"
 * Funciones.texto.soloLetrasYEspacios("Texto de ejemplo"); // true
 */
export function soloLetrasYEspacios(entrada) {
  const valor = extraerValor(entrada);
  return /^[A-Za-z\s]+$/.test(valor);
}

/**
 * Valida que el texto sea alfanumérico.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si solo A-Za-z0-9, false si no.
 * @example
 * Funciones.texto.alfanumerico('#campo'); // true si entrada.value = 'abc123'
 * Funciones.texto.alfanumerico(document.querySelector('#campo')); // true si entrada.value === "12"
 * Funciones.texto.alfanumerico("num #7"); // false
 */
export function alfanumerico(entrada) {
  const valor = extraerValor(entrada);
  return /^[A-Za-z0-9]+$/.test(valor);
}

/**
 * Valida que el texto contenga la subcadena indicada.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {string} sub - Subcadena a buscar.
 * @returns {boolean} True si incluye sub, false si no.
 * @example
 * Funciones.texto.contiene('#campo', 'abc'); // true si campo.value contiene 'abc'
 * Funciones.texto.contiene(document.querySelector('#campo'), 'abc'); // true si entrada.value contiene 'abc'
 * Funciones.texto.contiene("num #7", '7'); // true
 */
export function contiene(entrada, sub) {
  const valor = extraerValor(entrada);
  return valor.includes(sub);
}

/**
 * Valida que el texto no contenga espacios.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si no hay espacios, false si hay.
 * @example
 * Funciones.texto.noEspacios('#campo'); // true si 'abc123'
 * Funciones.texto.noEspacios(document.querySelector('#campo')); // true si entrada.value contiene 'abc'
 * Funciones.texto.noEspacios("num #7"); // true
 */
export function noEspacios(entrada) {
  const valor = extraerValor(entrada);
  return !/\s/.test(valor);
}

/**
 * Valida que el texto no contenga caracteres especiales.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si solo A-Za-z0-9 y espacios, false si no.
 * @example
 * Funciones.texto.noCaracteresEspeciales('#campo'); // true para 'abc 123'
 * Funciones.texto.noCaracteresEspeciales('#campo'); // false para 'abc 123#'
 */
export function noCaracteresEspeciales(entrada) {
  const valor = extraerValor(entrada);
  return /^[A-Za-z0-9\s]+$/.test(valor);
}

/**
 * Valida que el texto tenga al menos 'min' palabras.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} min - Número mínimo de palabras.
 * @returns {boolean} True si palabras >= min, false si no.
 * @example
 * Funciones.texto.palabrasMinimas('#campo', 3); // true si 'Hola mundo desde aquí'. Tiene 4 palabras
 * Funciones.texto.palabrasMinimas('Hola mundo', 3); // false (2 palabras)
 * Funciones.texto.palabrasMinimas(document.querySelector('#campo'), 3); // true si el valor del campo tiene 3 palabras
 */
export function palabrasMinimas(entrada, min) {
  const valor = extraerValor(entrada);
  return valor.trim().split(/\s+/).length >= min;
}

/**
 * Elimina espacios al inicio y final.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {string} Texto recortado.
 * @example
 * Funciones.texto.trim('#campo'); // '   Hola mundo   ' se convierte en 'Hola mundo'
 * Funciones.texto.trim('   Hola mundo   '); // 'Hola mundo'
 * Funciones.texto.trim(document.querySelector('#campo')); // 'Hola mundo'
 */
export function trimText(entrada) {
  const valor = extraerValor(entrada);
  return valor.trim();
}

/**
 * Valida si el valor está en una lista.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {string[]} lista - Lista de valores.
 * @returns {boolean} True si valor incluido, false si no.
 * @example
 * Funciones.texto.enLista('#campo', ['a','b','c']); // true si '#campo'.value es 'a'
 * Funciones.texto.enLista('b', ['a','b','c']); // true si 'b' está en la lista
 * Funciones.texto.enLista(document.querySelector('#campo'), ['a','b','c']); // true si el valor del campo es 'c'
 */
export function enLista(entrada, lista) {
  const valor = extraerValor(entrada);
  return lista.includes(valor);
}

/**
 * Pasa el texto a mayúsculas.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {string} Texto en mayúsculas.
 * @example
 * Funciones.texto.aMayusculas('#campo'); // 'Hola Mundo' se convierte en 'HOLA MUNDO'
 * Funciones.texto.aMayusculas('Hola Mundo'); // 'HOLA MUNDO'
 * Funciones.texto.aMayusculas(document.querySelector('#campo')); // 'HOLA MUNDO'
 */
export function aMayusculas(entrada) {
  const valor = extraerValor(entrada);
  return valor = valor.toUpperCase();
}

/**
 * Pasa el texto a minúsculas.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {string} Texto en minúsculas.
 * @example
 * Funciones.texto.aMinusculas('#campo'); // 'Hola Mundo' se convierte en 'hola mundo'
 * Funciones.texto.aMinusculas('Hola Mundo'); // 'hola mundo'
 * Funciones.texto.aMinusculas(document.querySelector('#campo')); // 'hola mundo'
 */
export function aMinusculas(entrada) {
  const valor = extraerValor(entrada);
  return valor = valor.toLowerCase();
}

/**
 * Pasa el texto a capitalización inicial.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {string} Texto con primera letra en mayúscula.
 * @example
 * Funciones.texto.capitalizarInicial('#campo'); // 'hola mundo' se convierte en 'Hola mundo'
 * Funciones.texto.capitalizarInicial('hola mundo'); // 'Hola mundo'
 * Funciones.texto.capitalizarInicial(document.querySelector('#campo')); // 'Hola mundo'
 */
export function capitalizarInicial(entrada) {
  const valor = extraerValor(entrada);
  return valor.charAt(0).toUpperCase() + valor.slice(1);
}

/**
 * Capitaliza la primera letra de cada palabra en el texto.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {string} Texto con cada palabra capitalizada.
 * @example
 * Funciones.texto.capitalizarPalabras('#campo'); // '#campo'.value = 'hola mundo' se convierte en 'Hola Mundo'
 * Funciones.texto.capitalizarPalabras('hola mundo'); // 'Hola Mundo'
 * Funciones.texto.capitalizarPalabras(document.querySelector('#campo')); // 'Hola Mundo'
 */
export function capitalizarPalabras(entrada) {
  const valor = extraerValor(entrada);
  return valor.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
}


/**
 * Convierte a Title Case excepto partículas definidas (se mantienen en minúscula si no son la primera palabra).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor de texto.
 * @param {string[]} [excepciones=['de','la','van','von','di','le']] - Partículas a mantener en minúscula.
 * @returns {string} Nombre formateado.
 * @example
 * Funciones.texto.capitalizarPalabrasExcepto('carlos de la fuente'); // 'Carlos de la Fuente'
 */
export function capitalizarPalabrasExcepto(entrada, excepciones = ['de','la','van','von','di','le']) {
  const partes = extraerValor(entrada)
    .trim()
    .toLowerCase()
    .split(/\s+/);
  return partes
    .map((p, i) =>
      i > 0 && excepciones.includes(p)
        ? p
        : p.charAt(0).toUpperCase() + p.slice(1)
    )
    .join(' ');
}


/**
 * Valida si el valor es un JSON válido.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si JSON.parse no lanza error, false si sí.
 * @example
 * Funciones.texto.esJSON('#campo'); // true si '#campo'.value es un JSON válido
 * Funciones.texto.esJSON(document.querySelector('#campo')); // true si el valor del campo es un JSON válido
 * Funciones.texto.esJSON('{"clave": "valor"}'); // true si el valor es un JSON válido
 */
export function esJSON(entrada) {
  const valor = extraerValor(entrada);
  try {
    JSON.parse(valor);
    return true;
  } catch {
    return false;
  }
}