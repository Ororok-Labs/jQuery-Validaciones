import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular mexicano sin código de país (10 dígitos, comienza con 55).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular válido, false si no.
 * @example
 * Funciones.fono.mexico.celular('#telefono'); // true si '#telefono'.value === "5512345678"
 * Funciones.fono.mexico.celular('#telefono'); // false si '#telefono'.value === "2212345678"
 * Funciones.fono.mexico.celular('5512345678');      // true
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^55\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo mexicano sin código de país (10 dígitos, comienza con 2-9).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo válido, false si no.
 * @example
 * Funciones.fono.mexico.fijo('#telefono'); // true si '#telefono'.value === "2212345678"
 * Funciones.fono.mexico.fijo('#telefono'); // false si '#telefono'.value === "1512345678"
 * Funciones.fono.mexico.fijo('2212345678');      // true
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^[2-9]\d{9}$/.test(valor);
}

/**
 * Valida un celular mexicano con código de país (+52 y 10 dígitos, comienza con 55).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con código país válido, false si no.
 * @example
 * Funciones.fono.mexico.celularConCodigoPais('#telefono'); // true si '+525512345678'
 * Funciones.fono.mexico.celularConCodigoPais('#telefono'); // false si '+522212345678'
 * Funciones.fono.mexico.celularConCodigoPais('+525512345678'); // true
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+5255\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo mexicano con código de país (+52 y 10 dígitos, comienza con 2-9).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con código país válido, false si no.
 * @example
 * Funciones.fono.mexico.fijoConCodigoPais('#telefono'); // true si '+522212345678'
 * Funciones.fono.mexico.fijoConCodigoPais('#telefono'); // false si '+521512345678'
 * Funciones.fono.mexico.fijoConCodigoPais('+522212345678'); // true
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+52[2-9]\d{9}$/.test(valor);
}
