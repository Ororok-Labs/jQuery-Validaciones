/**
 * Obtiene un elemento HTML desde un selector o retorna el mismo si ya es un elemento.
 * @note
 * Si el selector es un string y no se encuentra el elemento:
 * - En modo normal (`modoEstricto = false`), retorna `null`.
 * - En modo estricto (`modoEstricto = true`), lanza un Error.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @param {boolean} [modoEstricto=false] - true para lanzar error si no se encuentra el elemento.
 * @returns {HTMLElement|null}
 * @throws {Error} Si el parámetro no es válido o no se encuentra (si modoEstricto es true).
 * @example
 * ✅ Uso real:
 * const el = OrorokJSFunciones.Funciones.Utilidades.getElemento("#miId");
 * const el = OrorokJSFunciones.Funciones.Utilidades.getElemento(document.querySelector(".miClase"));
 * const el = OrorokJSFunciones.Funciones.Utilidades.getElemento("#boton", true); // Modo estricto: lanza error si no existe
 * @example
 * 🛠️ Implementación interna:
 * function getElemento(selector, modoEstricto = false) {
 *     if (typeof selector === "string") {
 *         const el = document.querySelector(selector);
 *         if (modoEstricto && !el) throw new Error("Elemento no encontrado: " + selector);
 *         return el;
 *     }
 *     if (selector instanceof Element) {
 *         return selector;
 *     }
 *     throw new Error("Selector inválido: debe ser string o instancia de Element");
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const getElemento = (selector) => {
 *     if (typeof selector === "string") return $(selector).get(0);
 *     if (selector instanceof Element) return selector;
 *     throw new Error("Selector inválido: debe ser string o instancia de Element");
 * }
 */
export function getElemento(selector) {
    if (typeof selector === "string") {
        // Intenta primero como selector CSS
        let el = document.querySelector(selector);
        if (el) return el;

        // Si no funciona como selector, intenta como name
        if (!selector.startsWith("#") && !selector.startsWith(".")) {
            const group = document.getElementsByName(selector);
            if (group.length > 0) return group[0]; // Devuelve el primero (útil para radio/checkbox en reglas simples)
        }
    }

    // Si ya es un nodo
    if (selector instanceof HTMLElement) return selector;

    throw new Error("No se pudo obtener el elemento: " + selector);
}



/**
 * Obtiene un elemento HTML **por su ID** (obligatorio) o lanza error si no existe.
 * @param {string|HTMLElement} id ID del elemento (con o sin #) o el mismo elemento con ID.
 * @returns {HTMLElement} El elemento encontrado.
 * @throws {Error} Si el ID no es válido o no se encuentra el elemento.
 * @example
 * ✅ Uso real:
 * const btn = OrorokJSFunciones.Funciones.Utilidades.getElementoPorId("miBoton");
 * const caja = OrorokJSFunciones.Funciones.Utilidades.getElementoPorId("#cajaPrincipal"); // También funciona con #
 * const div = OrorokJSFunciones.Funciones.Utilidades.getElementoPorId(document.getElementById("zona1"));
 *
 * @example
 * 🛠️ Implementación interna:
 * function getElementoPorId(id) {
 *     if (typeof id === "string") {
 *         const limpio = id.startsWith("#") ? id.slice(1) : id;
 *         const el = document.getElementById(limpio);
 *         if (!el) throw new Error("No se encontró un elemento con ID: " + limpio);
 *         return el;
 *     }
 *     if (id instanceof HTMLElement && id.id) {
 *         return id;
 *     }
 *     throw new Error("El parámetro debe ser un ID string o un elemento con ID");
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const getElementoPorId = (id) => {
 *     const limpio = typeof id === "string" ? id.replace(/^#/, '') : null;
 *     if (limpio) return $("#" + limpio)[0] || (() => { throw new Error("No existe") })();
 *     if (id instanceof HTMLElement && id.id) return id;
 *     throw new Error("Debe ser string o HTMLElement con ID");
 * };
 */
export function getElementoPorId(id) {
    if (typeof id === "string") {
        const limpio = id.startsWith("#") ? id.slice(1) : id;
        const el = document.getElementById(limpio);
        if (!el) throw new Error("No se encontró un elemento con ID: " + limpio);
        return el;
    }
    if (id instanceof HTMLElement && id.id) {
        return id;
    }
    throw new Error("El parámetro debe ser un ID string o un elemento con ID");
}


/**
 * Obtiene todos los elementos del DOM que tienen un atributo "name" específico.
 * Lanza un error si no se encuentra ninguno.
 * @param {string} name - El atributo name a buscar.
 * @returns {NodeListOf<HTMLElement>} Lista de elementos encontrados.
 * @throws {Error} Si no se encuentran elementos con ese name.
 * @example
 * ✅ Uso real:
 * const radios = getElementosPorName("sexo");
 * const seleccionado = Array.from(radios).find(r => r.checked);
 * if (seleccionado) console.log(seleccionado.value);
 * @example
 * 🛠️ Implementación interna:
 * function getElementosPorName(name) {
 *     if (typeof name !== "string" || name.trim() === "") {
 *         throw new Error("El parámetro debe ser un string válido con el atributo name");
 *     }
 *
 *     const elementos = document.getElementsByName(name);
 *     if (!elementos || elementos.length === 0) {
 *         throw new Error("No se encontró ningún elemento con name: " + name);
 *     }
 *
 *     return elementos;
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const getElementosPorName = (name) => {
 *     if (typeof name !== "string" || name.trim() === "") {
 *         throw new Error("El parámetro debe ser un string válido con el atributo name");
 *     }
 *     const $elementos = $(`[name="${name}"]`);
 *     if ($elementos.length === 0) {
 *         throw new Error(`No se encontró ningún elemento con name: ${name}`);
 *     }
 *     return $elementos;
 * };
 */
export function getElementosPorName(name) {
    if (typeof name !== "string" || name.trim() === "") {
        throw new Error("El parámetro debe ser un string válido con el atributo name");
    }

    const elementos = document.getElementsByName(name);
    if (!elementos || elementos.length === 0) {
        throw new Error("No se encontró ningún elemento con name: " + name);
    }

    return elementos;
}



/**
 * Transmuta selectores variados en una lista plana de elementos HTML.
 *
 * Acepta distintos formatos:
 * - String con selector CSS → ejecuta `querySelectorAll`.
 * - Array de strings → busca cada uno y fusiona resultados.
 * - Element, HTMLElement o SVGElement → lo envuelve en array.
 * - NodeList o array de elementos → se convierte a lista plana.
 * - Otros tipos → retorna `[]`.
 *
 * Ideal para funciones que operan sobre inputs, formularios o zonas de UI,
 * sin forzar al dev a normalizar por su cuenta.
 *
 * @param {string | string[] | Element | Element[] | NodeList | null | undefined} selectores - Selector(es) CSS o nodo(s) directo(s).
 * @returns {Element[]} Lista plana de elementos HTML.
 * @example
 * ✅ Uso real:
 * const campos = OrorokJSFunciones.Funciones.Utilidades.normalizarSelectores(".requerido"); //Un solo selector
 * const campos = OrorokJSFunciones.Funciones.Utilidades.normalizarSelectores(["#login", "#registro"]); //Array de selectores
 * const campos = OrorokJSFunciones.Funciones.Utilidades.normalizarSelectores("#id, .clase1, .clase2"); //String de selectores
 * const campos = OrorokJSFunciones.Funciones.Utilidades.normalizarSelectores(document.querySelector("#miForm")); //Elementos directos
 * @example
 * 🛠️ Implementación interna:
 * function normalizarSelectores(selectores) {
 *     let elementos = [];
 * 
 *     if (typeof selectores === 'string') {
 *         elementos = [...document.querySelectorAll(selectores)];
 *     } else if (Array.isArray(selectores)) {
 *         elementos = selectors.flatMap(sel => {
 *             if (typeof sel === 'string') {
 *                 return [...document.querySelectorAll(sel)];
 *             }
 *             if (sel instanceof Element) {
 *                 return [sel];
 *             }
 *             if (sel instanceof NodeList || Array.isArray(sel)) {
 *                 return [...sel];
 *             }
 *             return [];
 *         });
 *     } else if (selectores instanceof Element) {
 *         elementos = [selectores];
 *     } else if (selectores instanceof NodeList) {
 *         elementos = [...selectores];
 *     }
 * 
 *     // Eliminar duplicados preservando orden
 *     const set = new Set();
 *     return elementos.filter(el => {
 *         if (set.has(el)) return false;
 *         set.add(el);
 *         return true;
 *     });
 * }
 * @example
 * 💡 Equivalente jQuery:
 * $(selectors).toArray() <--- Así de simple, pero no soporta todos los casos. (Igual amo jQuery ❤️)
 */
export function normalizarSelectores(selectores) {
    let elementos = [];

    if (typeof selectores === 'string') {
        elementos = [...document.querySelectorAll(selectores)];
    } else if (Array.isArray(selectores)) {
        elementos = selectors.flatMap(sel => {
            if (typeof sel === 'string') {
                return [...document.querySelectorAll(sel)];
            }
            if (sel instanceof Element) {
                return [sel];
            }
            if (sel instanceof NodeList || Array.isArray(sel)) {
                return [...sel];
            }
            return [];
        });
    } else if (selectores instanceof Element) {
        elementos = [selectores];
    } else if (selectores instanceof NodeList) {
        elementos = [...selectores];
    }

    // Eliminar duplicados preservando orden
    const set = new Set();
    return elementos.filter(el => {
        if (set.has(el)) return false;
        set.add(el);
        return true;
    });
}