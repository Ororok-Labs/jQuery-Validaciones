export class Input {
    /**
     * Valida que el campo sea requerido (no vacío).
     * @example
     * Funciones.input.requerido($el); // true si $el.val() !== ""
     * Funciones.input.requerido($el); // false si $el.val() === ""
     * @param {(jQuery|string)} $el - Elemento a validar.
     * @returns {boolean} True si tiene contenido, false si está vacío.
     */
    static requerido = ($el) => Funciones.texto.requerido($el);

    static text = {
        ...Funciones.texto,
        ...Funciones.numero,
        ...Funciones.fecha,
        ...Funciones.rut,
        ...Funciones.fono,
        ...Funciones.email,
        ...Funciones.password,
    };

    static checkbox = {
        /**
         * Valida si un checkbox está marcado.
         * @example
         * Funciones.input.checkbox.marcado($el); // true si el checkbox está marcado
         * Funciones.input.checkbox.marcado($el); // false si el checkbox NO está marcado
         * @param {(jQuery|string)} $el - Checkbox a validar.
         * @returns {boolean} True si está marcado, false si no.
         */
        marcado: ($el) => $el.is(':checked'),
    };

    static radio = {
        /**
         * Valida si algún radio del grupo está marcado.
         * @example
         * Funciones.input.radio.marcado($el); // true si algún radio del grupo está marcado
         * Funciones.input.radio.marcado($el); // false si ninguno está marcado
         * @param {(jQuery|string)} $el - Radio a validar (cualquier radio del grupo).
         * @returns {boolean} True si hay uno marcado, false si no.
         */
        marcado: ($el) => {
            return $(`input[name="${$el.attr('name')}"]:checked`).length > 0;
        },
    };

    static select = {
        /**
         * Valida si un elemento select tiene un valor seleccionado (distinto de vacío).
         * Si el <select> tiene un valor seleccionado como "1" o "algo", retorna true.
         * Si el valor es "", "0", false, null, undefined o NaN, retorna false.
         * @example
         * Funciones.input.select.valido($el); // true si $el.val() !== "" y es un <select>
         * Funciones.input.select.valido($el); // false si $el.val() === "" o no es un <select>
         * @param {(jQuery|string)} $el - Select a validar.
         * @returns {boolean} True si tiene valor seleccionado, false si no.
         */
        valido: ($el) => $el.is('select') && !!$el.val(),
    };

    static file = {
        /**
         * Valida si hay al menos un archivo seleccionado en el input file.
         * @example
         * Funciones.input.file.seleccionado($el); // true si hay un archivo seleccionado
         * Funciones.input.file.seleccionado($el); // false si no hay archivo seleccionado
         * @param {(jQuery|string)} $el - Input file a validar.
         * @returns {boolean} True si hay archivo seleccionado, false si no.
         */
        seleccionado: ($el) => $el[0]?.files?.length > 0,

        /**
         * Valida si la extensión del archivo seleccionado es válida (pasar arreglo con extensiones sin punto, en minúsculas).
         * @example
         * Funciones.input.file.extensionValida($el, ["jpg", "png"]); // true si el archivo es .jpg o .png
         * Funciones.input.file.extensionValida($el, ["pdf"]); // false si el archivo es .doc
         * @param {(jQuery|string)} $el - Input file a validar.
         * @param {string[]} extensiones - Lista de extensiones válidas (sin punto, en minúsculas).
         * @returns {boolean} True si la extensión es válida, false si no.
         */
        extensionValida: ($el, extensiones) => {
            const nombre = $el.val();
            const ext = nombre.split('.').pop().toLowerCase();
            return extensiones.includes(ext);
        },

        /**
         * Valida si el tamaño del archivo seleccionado es menor o igual al máximo permitido.
         * @example
         * Funciones.input.file.tamanioMaximo($el, 1048576); // true si el archivo pesa 1MB o menos
         * Funciones.input.file.tamanioMaximo($el, 1024); // false si el archivo pesa más de 1KB
         * @param {(jQuery|string)} $el - Input file a validar.
         * @param {number} maxBytes - Tamaño máximo permitido en bytes.
         * @returns {boolean} True si el archivo cumple el tamaño, false si no.
         */
        tamanioMaximo: ($el, maxBytes) => {
            const file = ($el[0] && $el[0].files) ? $el[0].files[0] : undefined;
            return file ? file.size <= maxBytes : false;
        }
    };

    static url = {
        /**
         * Valida si el valor es una URL válida (debe comenzar con http:// o https://).
         * @example
         * Funciones.input.url.valida($el); // true si $el.val() === "https://dominio.com"
         * Funciones.input.url.valida($el); // true si $el.val() === "http://dominio.com"
         * Funciones.input.url.valida($el); // false si $el.val() === "dominio.com"
         * Funciones.input.url.valida($el); // false si $el.val() === "ftp://dominio.com"
         * @param {(jQuery|string)} $el - Input url a validar.
         * @returns {boolean} True si es una URL válida, false si no.
         */
        valida: ($el) => /^(https?:\/\/)[^\s/$.?#].[^\s]*$/.test($el.val()),

        /**
         * Valida si la URL comienza con "https://".
         * @example
         * Funciones.input.url.esHttps($el); // true si $el.val() === "https://dominio.com"
         * Funciones.input.url.esHttps($el); // false si $el.val() === "http://dominio.com"
         * @param {(jQuery|string)} $el - Input url a validar.
         * @returns {boolean} True si comienza con https://, false si no.
         */
        esHttps: ($el) => /^https:\/\//.test($el.val()),
    };
}