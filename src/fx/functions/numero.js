import { extraerValor } from '../input/input.js';

/**
 * Valida si el valor es un número entero.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un número entero, false si no.
 * @example
 * Funciones.numero.entero("#input-numero"); // true si entrada.value === "123"
 * Funciones.numero.entero(document.getElementById("input-double")); // false si entrada.value === "123.45"
 * Funciones.numero.entero(entrada); // false si entrada.value === "abc"
 */
export function entero(entrada) {
  const valor = extraerValor(entrada);
  const n = Number(valor);
  return Number.isInteger(n);
}

/**
 * Valida si el valor es un número decimal (contiene punto).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es decimal, false si no.
 * @example
 * Funciones.numero.decimal("#input-double"); // true si entrada.value === "123.45"
 * Funciones.numero.decimal(document.getElementById("input-numero")); // false si entrada.value === "123"
 * Funciones.numero.decimal(entrada); // false si entrada.value === "abc.def"
 */
export function decimal(entrada) {
  const valor = extraerValor(entrada);
  const n = Number(valor);
  return !isNaN(n) && valor.toString().includes('.');
}

/**
 * Valida si el valor es mayor o igual al mínimo especificado.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} min - Valor mínimo permitido.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.numero.minimo("#numero", 10); // true si entrada.value === "15"
 * Funciones.numero.minimo(entrada, 10); // false si entrada.value === "5"
 * Funciones.numero.minimo(document.getElementById("numero"), 10); // true si input.value === "12"
 */
export function minimo(entrada, min) {
  const valor = Number(extraerValor(entrada));
  return valor >= min;
}

/**
 * Valida si el valor es menor o igual al máximo especificado.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} max - Valor máximo permitido.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.numero.maximo("#numero", 20); // true si entrada.value === "15"
 * Funciones.numero.maximo(entrada, 20); // false si entrada.value === "25"
 * Funciones.numero.maximo(document.getElementById("numero"), 20); // true si input.value === "18"
 */
export function maximo(entrada, max) {
  const valor = Number(extraerValor(entrada));
  return valor <= max;
}

/**
 * Valida si el valor está dentro del rango especificado (incluye extremos).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} min - Valor mínimo permitido.
 * @param {number} max - Valor máximo permitido.
 * @returns {boolean} True si está en el rango, false si no.
 * @example
 * Funciones.numero.rango("#numero", 10, 20); // true si entrada.value === "15"
 * Funciones.numero.rango(entrada, 10, 20); // true si entrada.value === "10"
 * Funciones.numero.rango(document.getElementById("numero"), 10, 20); // true si entrada.value === "20"
 * Funciones.numero.rango(entrada, 10, 20); // false si entrada.value === "25"
 */
export function rango(entrada, min, max) {
  const n = Number(extraerValor(entrada));
  return n >= min && n <= max;
}
