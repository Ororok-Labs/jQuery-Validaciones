import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular venezolano sin código de país (11 dígitos, comienza con 0412, 0414, 0416, 0424 o 0426).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular venezolano válido, false si no.
 * @example
 * Funciones.fono.venezuela.celular('#telefono'); // true si '#telefono'.value === "04121234567"
 * Funciones.fono.venezuela.celular('#telefono'); // false si '#telefono'.value === "02121234567"
 * Funciones.fono.venezuela.celular('04161234567'); // true
 * Funciones.fono.venezuela.celular(document.getElementById('cel')); // dependiendo del valor
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^(0412|0414|0416|0424|0426)\d{7}$/.test(valor);
}

/**
 * Valida un teléfono fijo venezolano sin código de país (11 dígitos, comienza con 0212 o 02[4-7]X).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo venezolano válido, false si no.
 * @example
 * Funciones.fono.venezuela.fijo('#telefono'); // true si '#telefono'.value === "02121234567"
 * Funciones.fono.venezuela.fijo('#telefono'); // false si '#telefono'.value === "04121234567"
 * Funciones.fono.venezuela.fijo('02441234567'); // true
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^(0212|02[4-7]\d)\d{7}$/.test(valor);
}

/**
 * Valida un celular venezolano con código de país (+58 y 10 dígitos, comienza con 412, 414, 416, 424 o 426).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con +58 válido, false si no.
 * @example
 * Funciones.fono.venezuela.celularConCodigoPais('#telefono'); // true si '+584121234567'
 * Funciones.fono.venezuela.celularConCodigoPais('#telefono'); // false si '+582121234567'
 * Funciones.fono.venezuela.celularConCodigoPais('+584141234567'); // true
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+58(412|414|416|424|426)\d{7}$/.test(valor);
}

/**
 * Valida un teléfono fijo venezolano con código de país (+58 y 10 dígitos, comienza con 212 o 2[4-7]X).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con +58 válido, false si no.
 * @example
 * Funciones.fono.venezuela.fijoConCodigoPais('#telefono'); // true si '+582122345678'
 * Funciones.fono.venezuela.fijoConCodigoPais('#telefono'); // false si '+584121234567'
 * Funciones.fono.venezuela.fijoConCodigoPais('+582412345678'); // true
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+58(212|2[4-7]\d)\d{7}$/.test(valor);
}
