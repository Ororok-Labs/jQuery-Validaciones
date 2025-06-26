import { extraerValor } from '../input/input.js';

/**
 * Valida formato de email genérico.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si cumple formato de email, false si no.
 * @example
 * Funciones.email.generico(entrada); // true si entrada.value === "usuario@dominio.com"
 * Funciones.email.generico(entrada); // false si entrada.value === "usuario@dominio"
 */
export function generico(entrada) {
  const valor = extraerValor(entrada);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

/**
 * Valida que el email pertenezca a un dominio específico (ej: "gmail.com").
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {string} dominio - Dominio permitido (ej: "gmail.com").
 * @returns {boolean} True si el email pertenece al dominio, false si no.
 * @example
 * Funciones.email.dominio(entrada, "gmail.com"); // true si entrada.value === "usuario@gmail.com"
 * Funciones.email.dominio(entrada, "gmail.com"); // false si entrada.value === "usuario@yahoo.com"
 */
export function dominio(entrada, dominio) {
  const valor = extraerValor(entrada);
  const regex = new RegExp(`^[^\\s@]+@${dominio.replace('.', '\\.')}$$`, 'i');
  return regex.test(valor);
}

/**
 * Valida que dos campos de email sean iguales.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(jQuery|string)} otra - Segundo campo a comparar.
 * @returns {boolean} True si son iguales, false si no.
 * @example
 * Funciones.email.repetido(entrada, otra); // true si ambos tienen el mismo valor
 * Funciones.email.repetido(entrada, otra); // false si los valores son distintos
 */
export function repetido(entrada, otra) {
  const valor = extraerValor(entrada);
  const valorOtra = extraerValor(otra);
  return valor === valorOtra;
}
