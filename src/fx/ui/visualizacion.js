import { getElemento } from '../utils/selectores.js';

/**
 * Cambia el valor de display de un elemento.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {string} tipo - Valor de display (block, flex, none, etc.).
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Visualizacion.cambiarDisplay("#modal", "none"); // Oculta
 * OrorokJSFunciones.Funciones.Visualizacion.cambiarDisplay("#modal", "flex"); // Muestra como flex
 * @example
 * 🛠️ Implementación interna:
 * function cambiarDisplay(selector, tipo) {
 *      const el = getElemento(selector);
 *      if (el) el.style.display = tipo;
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const cambiarDisplay = (selector, tipo) => {
 *      $(selector).css('display', tipo);
 * }
 */
export function cambiarDisplay(selector, tipo) {
    const el = getElemento(selector);
    if (el) el.style.display = tipo;
}



/**
 * Agrega clases CSS a un elemento (ideal para ocultar con frameworks).
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {...string} clases - Clases a agregar (separadas por comas).
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Visualizacion.agregarClases("#tooltip", "hidden", "opacity-0"); // Tailwind
 * OrorokJSFunciones.Funciones.Visualizacion.agregarClases("#modal", "d-none"); // Bootstrap
 * @example
 * 🛠️ Implementación interna:
 * function agregarClases(selector, ...clases) {
 *      const el = getElemento(selector);
 *      if (el) el.classList.add(...clases);
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const agregarClases = (selector, ...clases) => {
 *     $(selector).addClass(clases.join(' '));
 * }
 */
export function agregarClases(selector, ...clases) {
    const el = getElemento(selector);
    if (el) el.classList.add(...clases);
}


/**
 * Remueve clases CSS de un elemento (ideal para mostrar).
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {...string} clases - Clases a remover (separadas por comas).
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Visualizacion.removerClases("#tooltip", "hidden"); // Tailwind
 * OrorokJSFunciones.Funciones.Visualizacion.removerClases("#modal", "d-none", "invisible"); // Bootstrap
 * @example
 * 🛠️ Implementación interna:
 * function removerClases(selector, ...clases) {
 *     const el = getElemento(selector);
 *     if (el) el.classList.remove(...clases);
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const removerClases = (selector, ...clases) => {
 *     $(selector).removeClass(clases.join(' '));
 * }
 */
export function removerClases(selector, ...clases) {
    const el = getElemento(selector);
    if (el) el.classList.remove(...clases);
}



/**
 * Oculta un elemento usando display:none.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.ocultar("#miId");
 * OrorokJSFunciones.Funciones.Visualizacion.ocultar(".miClase");
 * OrorokJSFunciones.Funciones.Visualizacion.ocultar("[name='miNombre']");
 * OrorokJSFunciones.Funciones.Visualizacion.ocultar("[attr='miAtributo']");
 */
export function ocultar(selector) {
    cambiarDisplay(selector, "none");
}


/**
 * Muestra un elemento con un tipo de display específico (default: block).
 * @note
 * Si alguien quiere forzar "none" aquí, lo hará sabiendo que está rompiendo el nombre de la función.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {string} [tipoDisplay="block"] - Tipo de display (block, flex, etc.).
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.mostrar("#modal"); // Muestra como block
 * OrorokJSFunciones.Funciones.Visualizacion.mostrar("#menu", "block"); // Muestra como block
 * OrorokJSFunciones.Funciones.Visualizacion.mostrar("#modal", "flex"); // Muestra como flex
 * OrorokJSFunciones.Funciones.Visualizacion.mostrar("#menu", "inline"); // Muestra como inline
 */
export function mostrar(selector, tipoDisplay = "block") {
    cambiarDisplay(selector, tipoDisplay);
}


/**
 * Oculta un elemento agregando clases de frameworks o personales (Bootstrap/Tailwind/Otros).
 * @note
 * Si alguien quiere forzar una clase de visualización aquí, lo hará sabiendo que está rompiendo el nombre de la función.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {...string} clases - Clases de ocultamiento.
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.ocultarConClases("#modal", "d-none"); // Bootstrap
 * OrorokJSFunciones.Funciones.Visualizacion.ocultarConClases("#tooltip", "hidden", "opacity-0"); // Tailwind
 * OrorokJSFunciones.Funciones.Visualizacion.ocultarConClases("#tooltip", "ocultar", "opacidad-0"); // Personalizado
 */
export function ocultarConClases(selector, ...clases) {
    agregarClases(selector, ...clases);
}

/**
 * Muestra un elemento removiendo clases de frameworks.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {string} [tipoDisplay="block"] - Tipo de display al mostrar.
 * @param {...string} clases - Clases a remover.
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarRemoviendoClases("#modal", "block", "d-none"); // Bootstrap
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarRemoviendoClases("#tooltip", "block", "hidden"); // Tailwind
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarRemoviendoClases("#tooltip", "none", "clase-mostrar-personalizada"); // Podría usarse para ocultar un elemento personalizado, pero no es coherente con el nombre de la función
 */
export function mostrarRemoviendoClases(selector, tipoDisplay = "block", ...clases) {
    removerClases(selector, ...clases);
    cambiarDisplay(selector, tipoDisplay);
}

/**
 * Muestra un elemento con una animación.
 * @note
 * Esta función reemplaza el display y cambia la opacidad, por lo que puede interferir con otras transiciones si no se maneja con cuidado.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {string} [tipoDisplay="flex"] - Tipo de display al mostrar.
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarConAnimacion("#componente");
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarConAnimacion(".clase", "block");
 * @example
 * 🛠️ Implementación interna:
 * function mostrarConAnimacion(selector, tipoDisplay = "flex") {
 *     const el = getElemento(selector);
 *     if (el) {
 *         el.style.opacity = 0;
 *         el.style.display = tipoDisplay;
 *         el.style.transition = "opacity 0.3s";
 *         requestAnimationFrame(() => {
 *             el.style.opacity = 1;
 *         });
 *     }
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const mostrarConAnimacion = (selector) => {
 *     $(selector).fadeIn().css('display', 'flex');
 * }
 */
export function mostrarConAnimacion(selector, tipoDisplay = "flex") {
    const el = getElemento(selector);
    if (el) {
        el.style.opacity = 0;
        el.style.display = tipoDisplay;
        el.style.transition = "opacity 0.3s";
        requestAnimationFrame(() => {
            el.style.opacity = 1;
        });
    }
}

/**
 * Oculta un elemento con una animación de desvanecimiento.
 * @note
 * Esta función reduce la opacidad y luego aplica `display: none`, lo que puede interferir con otras transiciones si no se maneja con cuidado.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Visualizacion.ocultarConAnimacion("#componente");
 * OrorokJSFunciones.Funciones.Visualizacion.ocultarConAnimacion(".clase");
 *
 * @example
 * 🛠️ Implementación interna:
 * function ocultarConAnimacion(selector) {
 *     const el = getElemento(selector);
 *     if (el) {
 *         el.style.transition = "opacity 0.3s";
 *         el.style.opacity = 1;
 *         requestAnimationFrame(() => {
 *             el.style.opacity = 0;
 *             setTimeout(() => {
 *                 el.style.display = "none";
 *             }, 300);
 *         });
 *     }
 * }
 *
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const ocultarConAnimacion = (selector) => {
 *     $(selector).fadeOut();
 * }
 */
export function ocultarConAnimacion(selector) {
    const el = getElemento(selector);
    if (el) {
        el.style.transition = "opacity 0.3s";
        el.style.opacity = 1;
        requestAnimationFrame(() => {
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.display = "none";
            }, 300); // Duración debe coincidir con la transición
        });
    }
}



/**
 * Oculta múltiples elementos por IDs, clases, u otros selectores.
 * @param {Array<string>} selectores - Array de selectores.
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.ocultarGrupo(["#header", ".tooltips", "[data-ocultable]"]);
 */
export function ocultarGrupo(selectores) {
    selectores.forEach(sel => ocultar(sel));
}

/**
 * Muestra múltiples elementos con un tipo de display específico.
 * @param {Array<string>} selectores - Array de selectores.
 * @param {string} [tipoDisplay="block"] - Tipo de display.
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarGrupo(["#footer", ".alertas"], "flex");
 * OrorokJSFunciones.Funciones.Visualizacion.mostrarGrupo(["#footer", ".alertas"], "inline-flex");
 */
export function mostrarGrupo(selectores, tipoDisplay = "block") {
    selectores.forEach(sel => mostrar(sel, tipoDisplay));
}

/**
 * Alterna clases CSS en un elemento.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {...string} clases - Clases a alternar.
 * @example
 * OrorokJSFunciones.Funciones.Visualizacion.toggleClases("#boton", "activo"); // Activa o desactiva la clase
 * OrorokJSFunciones.Funciones.Visualizacion.toggleClases(".menu", "visible", "activo"); // Alterna ambas clases
 * OrorokJSFunciones.Funciones.Visualizacion.toggleClases("[data-toggle='clase']", "oculto", "visible"); // Alterna oculto y visible
 * OrorokJSFunciones.Funciones.Visualizacion.toggleClases("#elemento", "clase1", "clase2"); // Alterna clase1 y clase2
 * @example
 * 🛠️ Implementación interna:
 * function toggleClases(selector, ...clases) {
 *     const el = getElemento(selector);
 *     if (el) clases.forEach(clase => el.classList.toggle(clase));
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const toggleClases = (selector, ...clases) => {
 *     clases.forEach(clase => $(selector).toggleClass(clase));
 * }
 */
export function toggleClases(selector, ...clases) {
    const el = getElemento(selector);
    if (el) clases.forEach(clase => el.classList.toggle(clase));
}