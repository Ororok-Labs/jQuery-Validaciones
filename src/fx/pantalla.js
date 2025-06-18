export class Pantalla {

    /**
     * Métodos para trabajar con el alto de la pantalla.
     */
    static alto = {
        /**
         * Obtiene el alto de la pantalla en píxeles.
         * @example
         * Funciones.pantalla.alto.obtener(); // 1080
         * @returns {number} Alto de la pantalla en píxeles.
         */
        obtener: () => window.screen.height,

        /**
         * Valida si el alto de la pantalla es mayor o igual a un valor.
         * @example
         * Funciones.pantalla.alto.minimo(800); // true si el alto es >= 800
         * @param {number} min - Alto mínimo en píxeles.
         * @returns {boolean}
         */
        minimo: (min) => window.screen.height >= min,

        /**
         * Valida si el alto de la pantalla es menor o igual a un valor.
         * @example
         * Funciones.pantalla.alto.maximo(1080); // true si el alto es <= 1080
         * @param {number} max - Alto máximo en píxeles.
         * @returns {boolean}
         */
        maximo: (max) => window.screen.height <= max
    };

    /**
     * Métodos para trabajar con el ancho de la pantalla.
     */
    static ancho = {
        /**
         * Obtiene el ancho de la pantalla en píxeles.
         * @example
         * Funciones.pantalla.ancho.obtener(); // 1920
         * @returns {number} Ancho de la pantalla en píxeles.
         */
        obtener: () => window.screen.width,

        /**
         * Valida si el ancho de la pantalla es mayor o igual a un valor.
         * @example
         * Funciones.pantalla.ancho.minimo(1024); // true si el ancho es >= 1024
         * @param {number} min - Ancho mínimo en píxeles.
         * @returns {boolean}
         */
        minimo: (min) => window.screen.width >= min,

        /**
         * Valida si el ancho de la pantalla es menor o igual a un valor.
         * @example
         * Funciones.pantalla.ancho.maximo(1920); // true si el ancho es <= 1920
         * @param {number} max - Ancho máximo en píxeles.
         * @returns {boolean}
         */
        maximo: (max) => window.screen.width <= max
    };
}