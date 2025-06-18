export class Texto {
    /**
     * Valida que el campo no esté vacío.
     * @example
     * Funciones.texto.requerido($el); // true si $el.val() === "algo"
     * Funciones.texto.requerido($el); // false si $el.val() === ""
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si tiene contenido, false si está vacío.
     */
    static requerido($el) {
        return $el.val().trim().length > 0;
    }

    /**
     * Valida que el texto tenga al menos 'min' caracteres.
     * @example
     * Funciones.texto.largoMinimo($el, 3); // true si $el.val() === "abc"
     * Funciones.texto.largoMinimo($el, 5); // false si $el.val() === "abc"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {number} min - Largo mínimo.
     * @returns {boolean}
     */
    static largoMinimo($el, min) {
        return $el.val().length >= min;
    }

    /**
     * Valida que el texto tenga como máximo 'max' caracteres.
     * @example
     * Funciones.texto.largoMaximo($el, 5); // true si $el.val() === "abc"
     * Funciones.texto.largoMaximo($el, 2); // false si $el.val() === "abc"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {number} max - Largo máximo.
     * @returns {boolean}
     */
    static largoMaximo($el, max) {
        return $el.val().length <= max;
    }

    /**
     * Valida que el texto tenga exactamente 'n' caracteres.
     * @example
     * Funciones.texto.largoExacto($el, 5); // true si $el.val() tiene 5 caracteres
     */
    static largoExacto($el, n) {
        return $el.val().length === n;
    }

    /**
     * Valida que el texto contenga solo letras (sin espacios).
     * @example
     * Funciones.texto.soloLetras($el); // true si $el.val() === "abc"
     * Funciones.texto.soloLetras($el); // false si $el.val() === "abc 123"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean}
     */
    static soloLetras($el) {
        return /^[a-zA-Z]+$/.test($el.val());
    }

    /**
     * Valida que el texto contenga solo letras y espacios.
     * @example
     * Funciones.texto.soloLetrasYEspacios($el); // true si $el.val() === "abc def"
     * Funciones.texto.soloLetrasYEspacios($el); // false si $el.val() === "abc123"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean}
     */
    static soloLetrasYEspacios($el) {
        return /^[a-zA-Z\s]+$/.test($el.val());
    }

    /**
     * Valida que el texto sea alfanumérico (solo letras y números).
     * @example
     * Funciones.texto.alfanumerico($el); // true si $el.val() === "abc123"
     * Funciones.texto.alfanumerico($el); // false si $el.val() === "abc 123"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean}
     */
    static alfanumerico($el) {
        return /^[a-zA-Z0-9]+$/.test($el.val());
    }

    /**
     * Valida que el texto contenga la subcadena indicada.
     * @example
     * Funciones.texto.contiene($el, "hola"); // true si $el.val() === "hola mundo"
     * Funciones.texto.contiene($el, "adiós"); // false si $el.val() === "hola mundo"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {string} sub - Subcadena a buscar.
     * @returns {boolean}
     */
    static contiene($el, sub) {
        return $el.val().includes(sub);
    }

    /**
     * Valida que el texto no contenga espacios.
     * @example
     * Funciones.texto.noEspacios($el); // true si $el.val() === "abc"
     * Funciones.texto.noEspacios($el); // false si $el.val() === "a bc"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean}
     */
    static noEspacios($el) {
        return !/\s/.test($el.val());
    }

    /**
     * Valida que el texto no contenga caracteres especiales.
     * @example
     * Funciones.texto.noCaracteresEspeciales($el); // true si $el.val() === "abc 123"
     * Funciones.texto.noCaracteresEspeciales($el); // false si $el.val() === "abc@123"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean}
     */
    static noCaracteresEspeciales($el) {
        return /^[a-zA-Z0-9\s]+$/.test($el.val());
    }

    /**
     * Valida que el texto tenga al menos 'min' palabras.
     * @example
     * Funciones.texto.palabrasMinimas($el, 2); // true si $el.val() === "hola mundo"
     * Funciones.texto.palabrasMinimas($el, 3); // false si $el.val() === "hola mundo"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {number} min - Cantidad mínima de palabras.
     * @returns {boolean} True si cumple, false si no.
     */
    static palabrasMinimas($el, min) {
        return $el.val().trim().split(/\s+/).length >= min;
    }

    /**
     * Elimina espacios al inicio y final del valor.
     * @example
     * Funciones.texto.trim($el); // "hola mundo" si $el.val() === "  hola mundo  "
     * @param {(jQuery|string)} $el - Elemento a limpiar.
     * @returns {string} Valor sin espacios al inicio/fin.
     */
    static trim($el) {
        return $el.val().trim();
    }

    /**
     * Valida si el valor está en una lista de valores permitidos.
     * @example
     * Funciones.texto.enLista($el, ["A", "B", "C"]); // true si $el.val() === "B"
     * @param {(jQuery|string)} $el - Elemento a validar.
     * @param {string[]} lista - Lista de valores permitidos.
     * @returns {boolean}
     */
    static enLista($el, lista) {
        return lista.includes($el.val());
    }

    /**
     * Valida si el texto está todo en mayúsculas.
     * @example
     * Funciones.texto.todoMayusculas($el); // true si $el.val() === "HOLA"
     */
    static todoMayusculas($el) {
        return $el.val() === $el.val().toUpperCase();
    }

    /**
     * Valida si el texto está todo en minúsculas.
     * @example
     * Funciones.texto.todoMinusculas($el); // true si $el.val() === "hola"
     */
    static todoMinusculas($el) {
        return $el.val() === $el.val().toLowerCase();
    }

    /**
     * Valida si el valor es un JSON válido.
     * @example
     * Funciones.texto.esJSON($el); // true si $el.val() === '{"a":1}'
     */
    static esJSON($el) {
        try {
            JSON.parse($el.val());
            return true;
        } catch {
            return false;
        }
    }
}