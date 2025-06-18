export class Fono {
    //¡MODO PLURINACIONAL!

    /**
     * Valida un teléfono genérico (7 a 15 dígitos).
     * @example
     * Funciones.fono.generico($el); // true si $el.val() === "987654321"
     * Funciones.fono.generico($el); // true si $el.val() === "123456789012345"
     * Funciones.fono.generico($el); // false si $el.val() === "12345"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si cumple, false si no.
     */
    static generico = ($el) => /^[0-9]{7,15}$/.test($el.val());

    static chile = {
        /**
         * Valida un celular chileno (comienza con 9 y tiene 9 dígitos).
         * @example
         * Funciones.fono.chile.celular($el); // true si $el.val() === "912345678"
         * Funciones.fono.chile.celular($el); // false si $el.val() === "812345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^9\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo chileno (comienza con 2-8 y tiene 9 dígitos).
         * @example
         * Funciones.fono.chile.fijo($el); // true si $el.val() === "222345678"
         * Funciones.fono.chile.fijo($el); // true si $el.val() === "812345678"
         * Funciones.fono.chile.fijo($el); // false si $el.val() === "912345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^[2-8]\d{8}$/.test($el.val()),

        /**
         * Valida un celular chileno con código país (+569XXXXXXXX).
         * @example
         * Funciones.fono.chile.celularConCodigoPais($el); // true si $el.val() === "+56912345678"
         * Funciones.fono.chile.celularConCodigoPais($el); // false si $el.val() === "+56812345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+569\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo chileno con código país (+56[2-8]XXXXXXX).
         * @example
         * Funciones.fono.chile.fijoConCodigoPais($el); // true si $el.val() === "+5622345678"
         * Funciones.fono.chile.fijoConCodigoPais($el); // false si $el.val() === "+56912345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+56[2-8]\d{7}$/.test($el.val()),
    };

    static venezuela = {
        /**
         * Valida un celular venezolano (sin código país, 11 dígitos, comienza con 0412, 0414, 0416, 0424, 0426, 0416).
         * @example
         * Funciones.fono.venezuela.celular($el); // true si $el.val() === "04121234567"
         * Funciones.fono.venezuela.celular($el); // false si $el.val() === "02121234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^(0412|0414|0416|0424|0426)\d{7}$/.test($el.val()),

        /**
         * Valida un teléfono fijo venezolano (sin código país, 11 dígitos, comienza con 0212, 024x, 025x, 026x, 027x).
         * @example
         * Funciones.fono.venezuela.fijo($el); // true si $el.val() === "02121234567"
         * Funciones.fono.venezuela.fijo($el); // false si $el.val() === "04121234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^(0212|02[4-7]\d)\d{7}$/.test($el.val()),

        /**
         * Valida un celular venezolano con código país (+58 y 10 dígitos, comienza con 412, 414, 416, 424, 426).
         * @example
         * Funciones.fono.venezuela.celularConCodigoPais($el); // true si $el.val() === "+584121234567"
         * Funciones.fono.venezuela.celularConCodigoPais($el); // false si $el.val() === "+582121234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+58(412|414|416|424|426)\d{7}$/.test($el.val()),

        /**
         * Valida un teléfono fijo venezolano con código país (+58 y 10 dígitos, comienza con 212, 24x, 25x, 26x, 27x).
         * @example
         * Funciones.fono.venezuela.fijoConCodigoPais($el); // true si $el.val() === "+582122345678"
         * Funciones.fono.venezuela.fijoConCodigoPais($el); // false si $el.val() === "+584121234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+58(212|2[4-7]\d)\d{7}$/.test($el.val()),
    };

    static colombia = {
        /**
         * Valida un celular colombiano (sin código país, 10 dígitos, comienza con 3).
         * @example
         * Funciones.fono.colombia.celular($el); // true si $el.val() === "3123456789"
         * Funciones.fono.colombia.celular($el); // false si $el.val() === "2123456789"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^3\d{9}$/.test($el.val()),

        /**
         * Valida un teléfono fijo colombiano (sin código país, 7 dígitos, comienza con 2-8).
         * @example
         * Funciones.fono.colombia.fijo($el); // true si $el.val() === "2345678"
         * Funciones.fono.colombia.fijo($el); // false si $el.val() === "9345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^[2-8]\d{6}$/.test($el.val()),

        /**
         * Valida un celular colombiano con código país (+57 y 10 dígitos, comienza con 3).
         * @example
         * Funciones.fono.colombia.celularConCodigoPais($el); // true si $el.val() === "+573123456789"
         * Funciones.fono.colombia.celularConCodigoPais($el); // false si $el.val() === "+572123456789"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+573\d{9}$/.test($el.val()),

        /**
         * Valida un teléfono fijo colombiano con código país (+57 y 8 dígitos, comienza con 1-8).
         * @example
         * Funciones.fono.colombia.fijoConCodigoPais($el); // true si $el.val() === "+5712345678"
         * Funciones.fono.colombia.fijoConCodigoPais($el); // false si $el.val() === "+5792345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+57[1-8]\d{7}$/.test($el.val()),
    };

    static haiti = {
        /**
         * Valida un celular haitiano (sin código país, 8 dígitos, comienza con 3).
         * @example
         * Funciones.fono.haiti.celular($el); // true si $el.val() === "31234567"
         * Funciones.fono.haiti.celular($el); // false si $el.val() === "21234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^3\d{7}$/.test($el.val()),

        /**
         * Valida un teléfono fijo haitiano (sin código país, 8 dígitos, comienza con 2).
         * @example
         * Funciones.fono.haiti.fijo($el); // true si $el.val() === "21234567"
         * Funciones.fono.haiti.fijo($el); // false si $el.val() === "31234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^2\d{7}$/.test($el.val()),

        /**
         * Valida un celular haitiano con código país (+509 y 8 dígitos, comienza con 3).
         * @example
         * Funciones.fono.haiti.celularConCodigoPais($el); // true si $el.val() === "+50931234567"
         * Funciones.fono.haiti.celularConCodigoPais($el); // false si $el.val() === "+50921234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+5093\d{7}$/.test($el.val()),

        /**
         * Valida un teléfono fijo haitiano con código país (+509 y 8 dígitos, comienza con 2).
         * @example
         * Funciones.fono.haiti.fijoConCodigoPais($el); // true si $el.val() === "+50921234567"
         * Funciones.fono.haiti.fijoConCodigoPais($el); // false si $el.val() === "+50931234567"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+5092\d{7}$/.test($el.val()),
    };

    static peru = {
        /**
         * Valida un celular peruano (sin código país, 9 dígitos, comienza con 9).
         * @example
         * Funciones.fono.peru.celular($el); // true si $el.val() === "912345678"
         * Funciones.fono.peru.celular($el); // false si $el.val() === "812345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^9\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo peruano (sin código país, 7 u 8 dígitos, comienza con 1-8).
         * @example
         * Funciones.fono.peru.fijo($el); // true si $el.val() === "1234567"
         * Funciones.fono.peru.fijo($el); // true si $el.val() === "12345678"
         * Funciones.fono.peru.fijo($el); // false si $el.val() === "912345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^[1-8]\d{6,7}$/.test($el.val()),

        /**
         * Valida un celular peruano con código país (+51 y 9 dígitos, comienza con 9).
         * @example
         * Funciones.fono.peru.celularConCodigoPais($el); // true si $el.val() === "+51912345678"
         * Funciones.fono.peru.celularConCodigoPais($el); // false si $el.val() === "+51812345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+519\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo peruano con código país (+51 y 7 u 8 dígitos, comienza con 1-8).
         * @example
         * Funciones.fono.peru.fijoConCodigoPais($el); // true si $el.val() === "+511234567"
         * Funciones.fono.peru.fijoConCodigoPais($el); // true si $el.val() === "+5112345678"
         * Funciones.fono.peru.fijoConCodigoPais($el); // false si $el.val() === "+51912345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+51[1-8]\d{6,7}$/.test($el.val()),
    };

    static argentina = {
        /**
         * Valida un celular argentino (sin código país, 10 dígitos, comienza con 11).
         * @example
         * Funciones.fono.argentina.celular($el); // true si $el.val() === "1123456789"
         * Funciones.fono.argentina.celular($el); // false si $el.val() === "2123456789"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^11\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo argentino (sin código país, 10 dígitos, comienza con 2 o 3).
         * @example
         * Funciones.fono.argentina.fijo($el); // true si $el.val() === "2212345678"
         * Funciones.fono.argentina.fijo($el); // false si $el.val() === "1123456789"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^[23]\d{9}$/.test($el.val()),

        /**
         * Valida un celular argentino con código país (+54 y 10 dígitos, comienza con 911).
         * @example
         * Funciones.fono.argentina.celularConCodigoPais($el); // true si $el.val() === "+5491123456789"
         * Funciones.fono.argentina.celularConCodigoPais($el); // false si $el.val() === "+542212345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+54911\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo argentino con código país (+54 y 10 dígitos, comienza con 2 o 3).
         * @example
         * Funciones.fono.argentina.fijoConCodigoPais($el); // true si $el.val() === "+542212345678"
         * Funciones.fono.argentina.fijoConCodigoPais($el); // false si $el.val() === "+5491123456789"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+54[23]\d{9}$/.test($el.val()),
    };

    static mexico = {
        /**
         * Valida un celular mexicano (sin código país, 10 dígitos, comienza con 55).
         * @example
         * Funciones.fono.mexico.celular($el); // true si $el.val() === "5512345678"
         * Funciones.fono.mexico.celular($el); // false si $el.val() === "2212345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celular: ($el) => /^55\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo mexicano (sin código país, 10 dígitos, comienza con 2-9).
         * @example
         * Funciones.fono.mexico.fijo($el); // true si $el.val() === "2212345678"
         * Funciones.fono.mexico.fijo($el); // false si $el.val() === "1512345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijo: ($el) => /^[2-9]\d{9}$/.test($el.val()),

        /**
         * Valida un celular mexicano con código país (+52 y 10 dígitos, comienza con 55).
         * @example
         * Funciones.fono.mexico.celularConCodigoPais($el); // true si $el.val() === "+525512345678"
         * Funciones.fono.mexico.celularConCodigoPais($el); // false si $el.val() === "+522212345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        celularConCodigoPais: ($el) => /^\+5255\d{8}$/.test($el.val()),

        /**
         * Valida un teléfono fijo mexicano con código país (+52 y 10 dígitos, comienza con 2-9).
         * @example
         * Funciones.fono.mexico.fijoConCodigoPais($el); // true si $el.val() === "+522212345678"
         * Funciones.fono.mexico.fijoConCodigoPais($el); // false si $el.val() === "+521512345678"
         * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
         * @returns {boolean} True si cumple, false si no.
         */
        fijoConCodigoPais: ($el) => /^\+52[2-9]\d{9}$/.test($el.val()),
    };

    //Abierto a seguir extendiendo
}