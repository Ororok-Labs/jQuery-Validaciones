import { extraerValor } from '../../input/input.js';

/**
 * Valida un teléfono genérico (7 a 15 dígitos).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si cumple (entre 7 y 15 dígitos), false si no.
 * @example
 * Funciones.fono.generico('#telefono'); // true si valor === "987654321"
 * Funciones.fono.generico('#telefono'); // true si valor === "123456789012345"
 * Funciones.fono.generico('#telefono'); // false si valor === "12345"
 * Funciones.fono.generico('987654321'); // true
 * Funciones.fono.generico('123456789012345'); // true
 * Funciones.fono.generico('12345'); // false
 */
export function generico(entrada) {
  const valor = extraerValor(entrada);
  return /^[0-9]{7,15}$/.test(valor);
}

/**
 * Valida un teléfono genérico con código de país (+[0-9]{1,3} seguido de 7 a 15 dígitos).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si cumple (código país + 7 a 15 dígitos), false si no.
 * @example
 * Funciones.fono.genericoConCodigoPais('#telefono'); // true si valor === "+123456789012345"
 * Funciones.fono.genericoConCodigoPais('#telefono'); // false si valor === "123456789012345"
 * Funciones.fono.genericoConCodigoPais('#telefono'); // false si valor === "+12345"
 * * Funciones.fono.genericoConCodigoPais('+123456789012345'); // true
 */
export function genericoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+\d{1,3}[0-9]{7,15}$/.test(valor);
}
