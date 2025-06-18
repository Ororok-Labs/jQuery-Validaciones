export class Fecha {
    /**
     * Valida si el valor es una fecha válida (parseable por Date).
     * @example
     * // Usando un input con valor "2024-06-12"
     * Funciones.fecha.valida($el); // true
     * // Usando un input con valor "no-es-fecha"
     * Funciones.fecha.valida($el); // false
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si es una fecha válida, false si no.
     */
    static valida($el) {
        return !isNaN(Date.parse($el.val()));
    }

    /**
     * Valida si la fecha es mayor o igual a la mínima permitida.
     * @example
     * // Usando string
     * Funciones.fecha.fechaMinima($el, "2024-01-01");
     * // Usando objeto Date
     * Funciones.fecha.fechaMinima($el, new Date());
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {(string|Date)} min - Fecha mínima permitida (string o Date).
     * @returns {boolean} True si cumple, false si no.
     */
    static fechaMinima($el, min) {
        return new Date($el.val()) >= new Date(min);
    }

    /**
     * Valida si la fecha es menor o igual a la máxima permitida.
     * @example
     * // Usando string
     * Funciones.fecha.fechaMaxima($el, "2024-01-01");
     * // Usando objeto Date
     * Funciones.fecha.fechaMaxima($el, new Date());
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {(string|Date)} max - Fecha máxima permitida (string o Date).
     * @returns {boolean} True si cumple, false si no.
     */
    static fechaMaxima($el, max) {
        return new Date($el.val()) <= new Date(max);
    }

    /**
     * Valida si la fecha está entre un mínimo y un máximo (incluye los extremos).
     * @example
     * Funciones.fecha.fechaEntre($el, "2024-01-01", "2024-12-31"); // true si $el.val() === "2024-06-12"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {(string|Date)} min - Fecha mínima permitida (string o Date).
     * @param {(string|Date)} max - Fecha máxima permitida (string o Date).
     * @returns {boolean} True si está en el rango, false si no.
     */
    static fechaEntre($el, min, max) {
        const valor = new Date($el.val());
        const fechaMin = new Date(min);
        const fechaMax = new Date(max);
        if (isNaN(valor) || isNaN(fechaMin) || isNaN(fechaMax)) return false;
        return valor >= fechaMin && valor <= fechaMax;
    }

    /**
     * Valida si la fecha y hora está entre un mínimo y un máximo.
     * @example
     * Funciones.fecha.fechaHoraEntre($el, "2024-06-12 00:00:00", "2024-06-12 23:59:59");
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {(string|Date)} min - Fecha y hora mínima permitida (string o Date).
     * @param {(string|Date)} max - Fecha y hora máxima permitida (string o Date).
     * @returns {boolean} True si está en el rango, false si no.
     */
    static fechaHoraEntre($el, min, max) {
        const valor = new Date($el.val());
        const fechaMin = new Date(min);
        const fechaMax = new Date(max);
        if (isNaN(valor) || isNaN(fechaMin) || isNaN(fechaMax)) return false;
        return valor >= fechaMin && valor <= fechaMax;
    }

    /**
     * Valida el formato de la fecha según el formato indicado.
     * @example
     * Funciones.fecha.formatoFecha($el, "YYYY-MM-DD"); // true si $el.val() === "2024-06-12"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {string} [formato="YYYY-MM-DD"] - Formato de fecha a validar.
     * @returns {boolean} True si cumple el formato, false si no.
     */
    static formatoFecha($el, formato = "YYYY-MM-DD") {
        const valor = $el.val();
        const formatos = {
            "YYYY-MM-DD": /^\d{4}-\d{2}-\d{2}$/,
            "YYYY/MM/DD": /^\d{4}\/\d{2}\/\d{2}$/,
            "DD-MM-YYYY": /^\d{2}-\d{2}-\d{4}$/,
            "DD/MM/YYYY": /^\d{2}\/\d{2}\/\d{4}$/
        };
        const regex = formatos[formato] || formatos["YYYY-MM-DD"];
        return regex.test(valor);
    }

    /**
     * Valida el formato de fecha y hora según el formato indicado.
     * @example
     * Funciones.fecha.formatoFechaHora($el, "YYYY-MM-DD HH:MM:SS");
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {(string|RegExp)} [formato="YYYY-MM-DD HH:MM:SS"] - Formato o expresión regular.
     * @returns {boolean} True si cumple el formato, false si no.
     */
    static formatoFechaHora($el, formato = "YYYY-MM-DD HH:MM:SS") {
        const valor = $el.val();
        const formatos = {
            "YYYY-MM-DD HH:MM:SS": /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
            "YYYY-MM-DD HH:MM": /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/,
            "YYYY/MM/DD HH:MM:SS": /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/,
            "YYYY/MM/DD HH:MM": /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/
        };
        let regex;
        if (formato instanceof RegExp) {
            regex = formato;
        } else {
            regex = formatos[formato] || formatos["YYYY-MM-DD HH:MM:SS"];
        }
        return regex.test(valor);
    }

    /**
     * Valida el formato de fecha y hora de forma flexible según el nivel indicado.
     * @example
     * Funciones.fecha.fechaHoraFlexible($el, "minuto");
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {(string|RegExp)} [nivel="minuto"] - Nivel de precisión o expresión regular.
     * @returns {boolean} True si cumple el formato, false si no.
     */
    static fechaHoraFlexible($el, nivel = "minuto") {
        const valor = $el.val();
        const niveles = {
            "dia": "YYYY-MM-DD",
            "hora": "YYYY-MM-DD HH",
            "minuto": "YYYY-MM-DD HH:MM",
            "segundo": "YYYY-MM-DD HH:MM:SS"
        };
        if (nivel instanceof RegExp) {
            return nivel.test(valor);
        }
        const formato = niveles[nivel] || nivel;
        return this.formatoFechaHora({ val: () => valor }, formato);
    }
}