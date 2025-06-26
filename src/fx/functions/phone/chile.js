import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular chileno (comienza con 9 y tiene 9 dígitos).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular válido, false si no.
 * @example
 * Funciones.fono.chile.celular('#celular'); // true si '#celular'.value === "912345678"
 * Funciones.fono.chile.celular('#celular'); // false si '#celular'.value === "812345678"
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^9\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo chileno (comienza con dígitos 2-8 y tiene 9 dígitos).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo válido, false si no.
 * @example
 * Funciones.fono.chile.fijo('#telefono'); // true si '#telefono'.value === "222345678"
 * Funciones.fono.chile.fijo('#telefono'); // true si '#telefono'.value === "812345678"
 * Funciones.fono.chile.fijo('#telefono'); // false si '#telefono'.value === "912345678"
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^[2-8]\d{8}$/.test(valor);
}

/**
 * Valida un celular chileno con código de país (+569XXXXXXXX).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con código país válido, false si no.
 * @example
 * Funciones.fono.chile.celularConCodigoPais('#celular'); // true si '+56912345678'
 * Funciones.fono.chile.celularConCodigoPais('#celular'); // false si '+56812345678'
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+569\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo chileno con código de país (+56[2-8]XXXXXXX).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con código país válido, false si no.
 * @example
 * Funciones.fono.chile.fijoConCodigoPais('#telefono'); // true si '+5622345678'
 * Funciones.fono.chile.fijoConCodigoPais('#telefono'); // false si '+56912345678'
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+56[2-8]\d{7}$/.test(valor);
}
