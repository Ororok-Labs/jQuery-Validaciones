export class Numero {
    /**
     * Valida si el valor es un número entero.
     * @example
     * // Valor entero
     * Funciones.numero.entero($el); // true si $el.val() === "123"
     * // Valor decimal
     * Funciones.numero.entero($el); // false si $el.val() === "123.45"
     * // Valor no numérico
     * Funciones.numero.entero($el); // false si $el.val() === "abc"
     * @param {jQuery|string} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si es un número entero, false si no.
     */
    static entero($el) {
        return Number.isInteger(Number($el.val()));
    }

    /**
     * Valida si el valor es un número decimal (contiene punto).
     * @example
     * // Valor decimal
     * Funciones.numero.decimal($el); // true si $el.val() === "123.45"
     * // Valor entero
     * Funciones.numero.decimal($el); // false si $el.val() === "123"
     * // Valor no numérico
     * Funciones.numero.decimal($el); // false si $el.val() === "abc.def"
     * @param {jQuery|string} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si es decimal, false si no.
     */
    static decimal($el) {
        return !isNaN($el.val()) && $el.val().toString().includes('.');
    }

    /**
     * Valida si el valor es mayor o igual al mínimo especificado.
     * @example
     * // Valor mayor o igual al mínimo
     * Funciones.numero.minimo($el, 10); // true si $el.val() === "15"
     * // Valor menor al mínimo
     * Funciones.numero.minimo($el, 10); // false si $el.val() === "5"
     * @param {jQuery|string} $el - Elemento jQuery o string a validar.
     * @param {number} min - Valor mínimo permitido.
     * @returns {boolean} True si cumple, false si no.
     */
    static minimo($el, min) {
        return Number($el.val()) >= min;
    }

    /**
     * Valida si el valor es menor o igual al máximo especificado.
     * @example
     * // Valor menor o igual al máximo
     * Funciones.numero.maximo($el, 20); // true si $el.val() === "15"
     * // Valor mayor al máximo
     * Funciones.numero.maximo($el, 20); // false si $el.val() === "25"
     * @param {jQuery|string} $el - Elemento jQuery o string a validar.
     * @param {number} max - Valor máximo permitido.
     * @returns {boolean} True si cumple, false si no.
     */
    static maximo($el, max) {
        return Number($el.val()) <= max;
    }

    /**
     * Valida si el valor está dentro del rango especificado (incluye los extremos).
     * @example
     * // Valor dentro del rango
     * Funciones.numero.rango($el, 10, 20); // true si $el.val() === "15"
     * // Valor igual al mínimo
     * Funciones.numero.rango($el, 10, 20); // true si $el.val() === "10"
     * // Valor igual al máximo
     * Funciones.numero.rango($el, 10, 20); // true si $el.val() === "20"
     * // Valor fuera del rango
     * Funciones.numero.rango($el, 10, 20); // false si $el.val() === "25"
     * @param {jQuery|string} $el - Elemento jQuery o string a validar.
     * @param {number} min - Valor mínimo permitido.
     * @param {number} max - Valor máximo permitido.
     * @returns {boolean} True si está en el rango, false si no.
     */
    static rango($el, min, max) {
        const n = Number($el.val());
        return n >= min && n <= max;
    }
}