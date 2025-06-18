export class Persona {

    // ¡MODO PLURINACIONAL! Se deja abierta la posibilidad de ampliar a futuro

    static chile = {
        run: {
            /**
             * Valida si el valor contiene solo números (sin validador, solo largo típico de RUT chileno).
             * @example
             * Funciones.rut.soloNumeros($el); // true si $el.val() === "12345678"
             * Funciones.rut.soloNumeros($el); // false si $el.val() === "1234567K"
             * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
             * @returns {boolean} True si cumple, false si no.
             */
            soloNumeros: ($el) => /^[0-9]{7,8}$/.test($el.val()),

            /**
             * Valida si el valor contiene solo números y k/K (sin guión, sin puntos).
             * @example
             * Funciones.rut.numerosVerificados($el); // true si $el.val() === "12345678K"
             * Funciones.rut.numerosVerificados($el); // true si $el.val() === "123456789"
             * Funciones.rut.numerosVerificados($el); // false si $el.val() === "12345678-K"
             * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
             * @returns {boolean} True si cumple, false si no.
             */
            numerosVerificados: ($el) => /^[0-9]{7,8}[kK0-9]$/.test($el.val()),

            /**
             * Valida si el valor contiene solo números y k/K con guión (sin puntos).
             * @example
             * Funciones.rut.numerosVerificadosConGuion($el); // true si $el.val() === "12345678-K"
             * Funciones.rut.numerosVerificadosConGuion($el); // true si $el.val() === "12345678-9"
             * Funciones.rut.numerosVerificadosConGuion($el); // false si $el.val() === "12345678K"
             * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
             * @returns {boolean} True si cumple, false si no.
             */
            numerosVerificadosConGuion: ($el) => /^[0-9]{7,8}-[kK0-9]$/.test($el.val()),

            /**
             * Valida si el valor tiene el formato completo de RUT chileno (números, puntos, guión y k/K).
             * Ejemplo válido: 12.345.678-5 o 12.345.678-K
             * @example
             * Funciones.rut.completo($el); // true si $el.val() === "12.345.678-5"
             * Funciones.rut.completo($el); // true si $el.val() === "12.345.678-K"
             * Funciones.rut.completo($el); // false si $el.val() === "12345678-5"
             * Funciones.rut.completo($el); // false si $el.val() === "12.345.6785"
             * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
             * @returns {boolean} True si cumple, false si no.
             */
            completo: ($el) => /^(\d{1,2}\.\d{3}\.\d{3}-[kK0-9])$/.test($el.val()),
        }
    }

    //Extensible
}