import {extraerValor} from '../input/input.js';

/**
 * Valida si el valor es verdadero ("true", "1", "y", "yes", "s", "si" o "sí", sin importar mayúsculas/minúsculas o tildes).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es considerado verdadero.
 * @example
 * Funciones.booleano.esVerdadero("#acepto"); // true si el.value === "true"
 * Funciones.booleano.esVerdadero(miInput); // true si el.value === "1"
 * Funciones.booleano.esVerdadero("sí"); // true
 */
export function esVerdadero(entrada) {
    const valor = extraerValor(entrada);
    return /^(true|1|y|yes|s|si|sí)$/i.test(valor);
}

/**
 * Valida si el valor es falso ("false", "0", "n", "no", sin importar mayúsculas/minúsculas).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es considerado falso.
 * @example
 * Funciones.booleano.esFalso("#activo"); // true si el.value === "false"
 * Funciones.booleano.esFalso(miInput); // true si el.value === "0"
 * Funciones.booleano.esFalso("no"); // true
 */
export function esFalso(entrada) {
    const valor = extraerValor(entrada);
    return /^(false|0|n|no)$/i.test(valor);
}