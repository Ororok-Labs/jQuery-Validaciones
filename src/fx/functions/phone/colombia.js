import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular colombiano sin código de país (10 dígitos, comienza con 3).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular válido, false si no.
 * @example
 * Funciones.fono.colombia.celular('#telefono'); // true si '#telefono'.value === "3123456789"
 * Funciones.fono.colombia.celular('#telefono'); // false si '#telefono'.value === "2123456789"
 * Funciones.fono.colombia.celular('3123456789');  // true
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^3\d{9}$/.test(valor);
}

/**
 * Valida un teléfono fijo colombiano sin código de país (7 dígitos, comienza con 2-8).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo válido, false si no.
 * @example
 * Funciones.fono.colombia.fijo('#telefono'); // true si '#telefono'.value === "2345678"
 * Funciones.fono.colombia.fijo('#telefono'); // false si '#telefono'.value === "9345678"
 * Funciones.fono.colombia.fijo('2345678');     // true
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^[2-8]\d{6}$/.test(valor);
}

/**
 * Valida un celular colombiano con código de país (+57 y 10 dígitos, comienza con 3).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con código país válido, false si no.
 * @example
 * Funciones.fono.colombia.celularConCodigoPais('#telefono'); // true si '+573123456789'
 * Funciones.fono.colombia.celularConCodigoPais('#telefono'); // false si '+572123456789'
 * Funciones.fono.colombia.celularConCodigoPais('+573123456789'); // true
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+573\d{9}$/.test(valor);
}

/**
 * Valida un teléfono fijo colombiano con código de país (+57 y 8 dígitos, comienza con 1-8).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con código país válido, false si no.
 * @example
 * Funciones.fono.colombia.fijoConCodigoPais('#telefono'); // true si '+5712345678'
 * Funciones.fono.colombia.fijoConCodigoPais('#telefono'); // false si '+5792345678'
 * Funciones.fono.colombia.fijoConCodigoPais('+5712345678'); // true
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+57[1-8]\d{7}$/.test(valor);
}
