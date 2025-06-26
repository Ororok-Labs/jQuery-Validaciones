import { extraerValor } from '../../input/input.js';

/**
 * Valida un celular peruano sin código de país (9 dígitos, comienza con 9).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular válido, false si no.
 * @example
 * Funciones.fono.peru.celular('#telefono'); // true si '#telefono'.value === "912345678"
 * Funciones.fono.peru.celular('#telefono'); // false si '#telefono'.value === "812345678"
 * Funciones.fono.peru.celular('912345678');      // true
 */
export function celular(entrada) {
  const valor = extraerValor(entrada);
  return /^9\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo peruano sin código de país (7 u 8 dígitos, comienza con 1-8).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo válido, false si no.
 * @example
 * Funciones.fono.peru.fijo('#telefono');      // true si '#telefono'.value === "1234567"
 * Funciones.fono.peru.fijo('#telefono');      // true si '#telefono'.value === "12345678"
 * Funciones.fono.peru.fijo('#telefono');      // false si '#telefono'.value === "912345678"
 * Funciones.fono.peru.fijo('1234567');       // true
 */
export function fijo(entrada) {
  const valor = extraerValor(entrada);
  return /^[1-8]\d{6,7}$/.test(valor);
}

/**
 * Valida un celular peruano con código de país (+51 y 9 dígitos, comienza con 9).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un celular con código país válido, false si no.
 * @example
 * Funciones.fono.peru.celularConCodigoPais('#telefono'); // true si '+51912345678'
 * Funciones.fono.peru.celularConCodigoPais('#telefono'); // false si '+51812345678'
 * Funciones.fono.peru.celularConCodigoPais('+51912345678'); // true
 */
export function celularConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+519\d{8}$/.test(valor);
}

/**
 * Valida un teléfono fijo peruano con código de país (+51 y 7 u 8 dígitos, comienza con 1-8).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es un fijo con código país válido, false si no.
 * @example
 * Funciones.fono.peru.fijoConCodigoPais('#telefono'); // true si '+511234567'
 * Funciones.fono.peru.fijoConCodigoPais('#telefono'); // true si '+5112345678'
 * Funciones.fono.peru.fijoConCodigoPais('#telefono'); // false si '+51912345678'
 * Funciones.fono.peru.fijoConCodigoPais('+511234567');    // true
 */
export function fijoConCodigoPais(entrada) {
  const valor = extraerValor(entrada);
  return /^\+51[1-8]\d{6,7}$/.test(valor);
}
