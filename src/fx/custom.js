export class Custom {

    /**
     * Valida el valor del elemento usando una expresión regular personalizada.
     * @example
     * // Validar solo números
     * Funciones.custom.expresion($el, /^\d+$/); // true si $el.val() === "12345"
     * // Validar solo letras minúsculas
     * Funciones.custom.expresion($el, /^[a-z]+$/); // true si $el.val() === "abc"
     * // Validar formato de email simple
     * Funciones.custom.expresion($el, /^[^\s@]+@[^\s@]+\.[^\s@]+$/); // true si $el.val() === "correo@dominio.com"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {RegExp} regexp - Expresión regular a aplicar.
     * @returns {boolean} True si el valor cumple con la expresión, false si no.
     */
    static expresion($el, regexp) {
        return regexp.test($el.val());
    }
}