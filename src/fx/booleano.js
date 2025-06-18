export class Booleano {
    /**
     * Valida si el valor es verdadero ("true", "1", "y", "yes", "s", "si" o "sí", sin importar mayúsculas/minúsculas o tildes).
     * @example
     * Funciones.booleano.esVerdadero($el); // true si $el.val() === "true"
     * Funciones.booleano.esVerdadero($el); // true si $el.val() === "1"
     * Funciones.booleano.esVerdadero($el); // true si $el.val() === "sí"
     * Funciones.booleano.esVerdadero($el); // true si $el.val() === "SI"
     * Funciones.booleano.esVerdadero($el); // false si $el.val() === "no"
     * Funciones.booleano.esVerdadero($el); // false si $el.val() === "0"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si es considerado verdadero, false si no.
     */
    static esVerdadero($el) {
        return /^(true|1|y|yes|si|sí)$/i.test($el.val());
    }

    /**
     * Valida si el valor es falso ("false", "0", "n" o "no", sin importar mayúsculas/minúsculas).
     * @example
     * Funciones.booleano.esFalso($el); // true si $el.val() === "false"
     * Funciones.booleano.esFalso($el); // true si $el.val() === "0"
     * Funciones.booleano.esFalso($el); // true si $el.val() === "NO"
     * Funciones.booleano.esFalso($el); // true si $el.val() === "n"
     * Funciones.booleano.esFalso($el); // false si $el.val() === "sí"
     * Funciones.booleano.esFalso($el); // false si $el.val() === "1"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si es considerado falso, false si no.
     */
    static esFalso($el) {
        return /^(false|0|n|no)$/i.test($el.val());
    }
}