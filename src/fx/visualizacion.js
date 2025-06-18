export class Visualizacion {

    /**
     * Cambia el valor de display de un elemento.
     * @example
     * Funciones.visualizacion.cambiarDisplay("#modal", "none"); // Oculta
     * Funciones.visualizacion.cambiarDisplay("#modal", "flex"); // Muestra como flex
     * @param {string|jQuery} selector - Selector CSS o objeto jQuery.
     * @param {string} tipo - Valor de display (block, flex, none, etc.).
     */
    static cambiarDisplay = (selector, tipo) => {
        $(selector).css('display', tipo);
    };

    /**
     * Agrega clases CSS a un elemento (ideal para ocultar con frameworks).
     * @example
     * Funciones.visualizacion.agregarClases("#tooltip", "hidden", "opacity-0"); // Tailwind
     * Funciones.visualizacion.agregarClases("#modal", "d-none"); // Bootstrap
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     * @param {...string} clases - Clases a agregar (separadas por comas).
     */
    static agregarClases = (selector, ...clases) => {
        $(selector).addClass(clases.join(' '));
    };

    /**
     * Remueve clases CSS de un elemento (ideal para mostrar).
     * @example
     * Funciones.visualizacion.removerClases("#tooltip", "hidden"); // Tailwind
     * Funciones.visualizacion.removerClases("#modal", "d-none", "invisible"); // Bootstrap
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     * @param {...string} clases - Clases a remover (separadas por comas).
     */
    static removerClases = (selector, ...clases) => {
        $(selector).removeClass(clases.join(' '));
    };


    /**
     * Oculta un elemento usando display:none.
     * @example
     * Funciones.visualizacion.ocultar("#miElemento");
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     */
    static ocultar = (selector) => {
        this.cambiarDisplay(selector, "none");
    };

    /**
     * Muestra un elemento con un tipo de display específico (default: block).
     * @example
     * Funciones.visualizacion.mostrar("#modal"); // Muestra como block
     * Funciones.visualizacion.mostrar("#menu", "flex"); // Muestra como flex
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     * @param {string} [tipoDisplay="block"] - Tipo de display (block, flex, etc.).
     */
    static mostrar = (selector, tipoDisplay = "block") => {
        this.cambiarDisplay(selector, tipoDisplay);
    };

    /**
     * Oculta un elemento agregando clases de frameworks (Bootstrap/Tailwind).
     * @example
     * Funciones.visualizacion.ocultarConClases("#modal", "d-none"); // Bootstrap
     * Funciones.visualizacion.ocultarConClases("#tooltip", "hidden", "opacity-0"); // Tailwind
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     * @param {...string} clases - Clases de ocultamiento.
     */
    static ocultarConClases = (selector, ...clases) => {
        this.agregarClases(selector, ...clases);
    };

    /**
     * Muestra un elemento removiendo clases de frameworks.
     * @example
     * Funciones.visualizacion.mostrarRemoviendoClases("#modal", "d-none"); // Bootstrap
     * Funciones.visualizacion.mostrarRemoviendoClases("#tooltip", "hidden"); // Tailwind
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     * @param {...string} clases - Clases a remover.
     * @param {string} [tipoDisplay="block"] - Tipo de display al mostrar.
     */
    static mostrarRemoviendoClases = (selector, clases, tipoDisplay = "block") => {
        this.removerClases(selector, ...clases);
        this.cambiarDisplay(selector, tipoDisplay);
    };

    /**
     * Muestra un elemento con una animación.
     * @example
     * Funciones.visualizacion.mostrarConAnimacion("#componente");
     * @param {string|jQuery} selector - Selector o objeto jQuery.
     * @param {string} [tipoDisplay="flex"] - Tipo de display al mostrar.
     */
    static mostrarConAnimacion = (selector) => {
        $(selector).fadeIn().css('display', 'flex');
    };

    /**
     * Oculta múltiples elementos por IDs, clases, u otros selectores.
     * @example
     * Funciones.visualizacion.ocultarGrupo(["#header", ".tooltips", "[data-ocultable]"]);
     * @param {Array<string>} selectores - Array de selectores.
     */
    static ocultarGrupo = (selectores) => {
        selectores.forEach(selector => this.ocultar(selector));
    };

    /**
     * Muestra múltiples elementos con un tipo de display específico.
     * @example
     * Funciones.visualizacion.mostrarGrupo(["#footer", ".alertas"], "flex");
     * @param {Array<string>} selectores - Array de selectores.
     * @param {string} [tipoDisplay="block"] - Tipo de display.
     */
    static mostrarGrupo = (selectores, tipoDisplay = "block") => {
        selectores.forEach(selector => this.mostrar(selector, tipoDisplay));
    };
}