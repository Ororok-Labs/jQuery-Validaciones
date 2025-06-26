import {extraerValor} from '../input/input.js';

/**
 * Valida el valor del elemento usando una expresión regular personalizada.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {RegExp} regexp - Expresión regular a aplicar.
 * @returns {boolean} True si el valor cumple con la expresión, false si no.
 * @example
 * Funciones.custom.expresion(entrada, /^\d+$/); // true si el.value === "12345"
 * Funciones.custom.expresion(entrada, /^[a-z]+$/); // true si el.value === "abc"
 * Funciones.custom.expresion(entrada, /^[^\s@]+@[^\s@]+\.[^\s@]+$/); // true si el.value === "correo@dominio.com"
 */
export function expresion(entrada, regexp) {
    const valor = extraerValor(entrada);
    return regexp.test(valor);
}