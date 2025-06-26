import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular argentino sin código de país (10 dígitos, comienza con 11).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular válido, false si no.
 * @example
 * Funciones.fono.argentina.celular('#telefono'); // true si '#telefono'.value === "1123456789"
 * Funciones.fono.argentina.celular('#telefono'); // false si '#telefono'.value === "2123456789"
 * Funciones.fono.argentina.celular('1123456789');  // true
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^11\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo argentino sin código de país (10 dígitos, comienza con 2 o 3).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo válido, false si no.
 * @example
 * Funciones.fono.argentina.fijo('#telefono'); // true si '#telefono'.value === "2212345678"
 * Funciones.fono.argentina.fijo('#telefono'); // false si '#telefono'.value === "1123456789"
 * Funciones.fono.argentina.fijo('2212345678');  // true
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^[23]\d{9}$/.test(valor);
}

/**
 * Valida un celular argentino con código de país (+54 y 10 dígitos, comienza con 911).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con código país válido, false si no.
 * @example
 * Funciones.fono.argentina.celularConCodigoPais('#telefono'); // true si '+5491123456789'
 * Funciones.fono.argentina.celularConCodigoPais('#telefono'); // false si '+542212345678'
 * Funciones.fono.argentina.celularConCodigoPais('+5491123456789'); // true
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+54911\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo argentino con código de país (+54 y 10 dígitos, comienza con 2 o 3).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con código país válido, false si no.
 * @example
 * Funciones.fono.argentina.fijoConCodigoPais('#telefono'); // true si '+542212345678'
 * Funciones.fono.argentina.fijoConCodigoPais('#telefono'); // false si '+5491123456789'
 * Funciones.fono.argentina.fijoConCodigoPais('+542212345678'); // true
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+54[23]\d{9}$/.test(valor);
}
