import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular haitiano sin código de país (8 dígitos, comienza con 3).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular válido, false si no.
 * @example
 * Funciones.fono.haiti.celular('#telefono'); // true si '#telefono'.value === "31234567"
 * Funciones.fono.haiti.celular('#telefono'); // false si '#telefono'.value === "21234567"
 * Funciones.fono.haiti.celular('31234567');    // true
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^3\d{7}$/.test(valor);
}

/**
 * Valida un teléfono fijo haitiano sin código de país (8 dígitos, comienza con 2).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo válido, false si no.
 * @example
 * Funciones.fono.haiti.fijo('#telefono'); // true si '#telefono'.value === "21234567"
 * Funciones.fono.haiti.fijo('#telefono'); // false si '#telefono'.value === "31234567"
 * Funciones.fono.haiti.fijo('21234567');    // true
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^2\d{7}$/.test(valor);
}

/**
 * Valida un celular haitiano con código de país (+509 y 8 dígitos, comienza con 3).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con +509 válido, false si no.
 * @example
 * Funciones.fono.haiti.celularConCodigoPais('#telefono'); // true si '+50931234567'
 * Funciones.fono.haiti.celularConCodigoPais('#telefono'); // false si '+50921234567'
 * Funciones.fono.haiti.celularConCodigoPais('+50931234567'); // true
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+5093\d{7}$/.test(valor);
}

/**
 * Valida un teléfono fijo haitiano con código de país (+509 y 8 dígitos, comienza con 2).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con +509 válido, false si no.
 * @example
 * Funciones.fono.haiti.fijoConCodigoPais('#telefono'); // true si '+50921234567'
 * Funciones.fono.haiti.fijoConCodigoPais('#telefono'); // false si '+50931234567'
 * Funciones.fono.haiti.fijoConCodigoPais('+50921234567'); // true
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+5092\d{7}$/.test(valor);
}
