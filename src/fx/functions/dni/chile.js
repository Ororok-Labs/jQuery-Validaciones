import { extraerValor } from '../../input/input.js';

/**
 * Valida si el valor contiene solo números (7 u 8 dígitos), sin puntos ni guión.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si solo dígitos, false si no.
 * @example
 * Funciones.dni.chile.runSoloNumeros('#campoRut'); // true si valor === "12345678"
 * Funciones.dni.chile.runSoloNumeros('#campoRut'); // false si valor === "1234567K"
 */
export function runSoloNumeros(entrada) {
  const valor = extraerValor(entrada);
  return /^[0-9]{7,8}$/.test(valor);
}

/**
 * Valida si el valor contiene 7 u 8 dígitos seguidos de un dígito verificador (0-9 o k/K), sin guión ni puntos.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si formato válido, false si no.
 * @example
 * Funciones.dni.chile.runNumerosVerificados('#campoRut'); // true si valor === "12345678K"
 * Funciones.dni.chile.runNumerosVerificados('#campoRut'); // true si valor === "123456789"
 * Funciones.dni.chile.runNumerosVerificados('#campoRut'); // false si valor === "12345678-K"
 */
export function runNumerosVerificados(entrada) {
  const valor = extraerValor(entrada);
  return /^[0-9]{7,8}[0-9kK]$/.test(valor);
}

/**
 * Valida si el valor contiene 7 u 8 dígitos, un guión y un dígito verificador (0-9 o k/K), sin puntos.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si formato válido con guión, false si no.
 * @example
 * Funciones.dni.chile.runNumerosVerificadosConGuion('#campoRut'); // true si "12345678-K"
 * Funciones.dni.chile.runNumerosVerificadosConGuion('#campoRut'); // true si "12345678-9"
 * Funciones.dni.chile.runNumerosVerificadosConGuion('#campoRut'); // false si "12345678K"
 */
export function runNumerosVerificadosConGuion(entrada) {
  const valor = extraerValor(entrada);
  return /^[0-9]{7,8}-[0-9kK]$/.test(valor);
}

/**
 * Valida el formato completo de RUT chileno: números con puntos, guión y dígito verificador (0-9 o k/K).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si formato completo válido, false si no.
 * @example
 * Funciones.dni.chile.runCompleto('#campoRut'); // true si valor === "12.345.678-5"
 * Funciones.dni.chile.runCompleto('#campoRut'); // true si valor === "12.345.678-K"
 * Funciones.dni.chile.runCompleto('#campoRut'); // false si valor === "12345678-5"
 * Funciones.dni.chile.runCompleto('#campoRut'); // false si valor === "12.345.6785"
 */
export function runCompleto(entrada) {
  const valor = extraerValor(entrada);
  return /^(\d{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK])$/.test(valor);
}
