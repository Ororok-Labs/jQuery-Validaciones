import { getElemento, getElementosPorName } from '../utils/selectores.js';

/**
 * Convierte cualquier entrada (selector, HTMLElement, valor crudo) a string procesable.
 * @param {string|HTMLElement|any} entrada
 * @returns {string}
 * @example
 * ✅ Uso real:
 * const valor = OrorokJSFunciones.Input.extraerValor("#miInput"); // "valor del input"
 * const valor = OrorokJSFunciones.Input.extraerValor(document.querySelector("#miInput")); // "valor del input"
 * const valor = OrorokJSFunciones.Input.extraerValor("Texto sin espacios"); // "Texto sin espacios"
 * const valor = OrorokJSFunciones.Input.extraerValor(12345); // "12345"
 * @example
 * 🛠️ Implementación interna:
 * function extraerValor(entrada) {
 *     try {
 *         const el = getElemento(entrada);
 *         return el?.val?.() ?? String(el?.value ?? '').trim();
 *     } catch {
 *         return String(entrada ?? '').trim();
 *     }
 * }
 * @example
 * 💡 Equivalente en jQuery:
 * const extraerValor = (entrada) => {
 *    const el = $(entrada);
 *    return el.length ? el.val() : String(entrada ?? '').trim();
 * };
 */
export function extraerValor(entrada) {
    try {
        const el = getElemento(entrada);
        return el?.val?.() ?? String(el?.value ?? '').trim();
    } catch {
        return String(entrada ?? '').trim();
    }
}



/**
 * Obtiene el valor del radiobutton seleccionado por name.
 * @param {string} name - El atributo name del grupo de radios.
 * @returns {string|null} - El valor seleccionado o null si ninguno está marcado.
 * @example
 * const sexo = OrorokJSFunciones.Input.valorRadio("sexo"); // "masculino", "femenino" o null
 */
export function valorRadio (name) {
    return [...document.getElementsByName(name)].find(r => r.checked)?.value ?? null;
}

/**
 * Obtiene los valores de todos los checkboxes seleccionados por name.
 * @param {string} name - El atributo name del grupo de checkboxes.
 * @returns {string[]} - Un array con los valores seleccionados.
 * @example
 * const seleccionados = OrorokJSFunciones.Input.valoresCheckbox("intereses"); // ["deporte", "musica"]
 */
export function valoresCheckbox(name) {
    return [...document.getElementsByName(name)]
        .filter(chk => chk.checked)
        .map(chk => chk.value);
}

/**
 * Obtiene los valores seleccionados de un <select multiple> por name.
 * @param {string} name - El atributo name del select múltiple.
 * @returns {string[]} - Array de valores seleccionados.
 * @example
 * const paises = OrorokJSFunciones.Input.valoresSelect("paises"); // ["chile", "argentina"]
 */
export function valoresSelect(name) {
    const el = document.querySelector(`select[name="${name}"]`);
    if (!el) throw new Error(`No se encontró un <select> con name="${name}"`);
    if (!el.multiple) throw new Error(`El <select name="${name}"> no tiene el atributo 'multiple'`);

    return [...el.options]
        .filter(opt => opt.selected)
        .map(opt => opt.value);
}



/**
 * Valida que un campo tenga contenido (no esté vacío).
 * @param {string|HTMLElement} el - Selector o elemento.
 * @returns {boolean}
 * @example
 * Funciones.input.requerido('#campo'); // true si el campo tiene contenido
 * Funciones.input.requerido('#campo'); // false si el campo está vacío
 * Funciones.input.requerido(document.querySelector('#campo')); // true si el campo tiene contenido
 */
export function requerido(el) {
    const valor = extraerValor(el);
    return valor.trim().length > 0;
}

/**
 * Valida si un checkbox está marcado.
 * @param {string|HTMLElement} el
 * @returns {boolean}
 * @example
 * Funciones.input.checkboxMarcado('#checkbox'); // true si el checkbox está marcado
 * Funciones.input.checkboxMarcado('#checkbox'); // false si el checkbox NO está marcado
 * Funciones.input.checkboxMarcado(document.querySelector('#checkbox')); // true si el checkbox está marcado
 */
export function checkboxMarcado(el) {
    const nodo = typeof el === 'string' ? document.querySelector(el) : el;
    return nodo?.checked === true;
}


/**
 * Checkea si al menos un checkbox del grupo está marcado. (Checkboxs múltiple, con el mismo name)
 * @param {*} el
 * @returns
 * @example
 * Funciones.input.algunCheckboxMarcado('[name='checkbox']'); // true si al menos un checkbox del grupo está marcado
 * Funciones.input.algunCheckboxMarcado('[name='checkbox']'); // false si ninguno del grupo está
 */
export function algunCheckboxMarcado(el) {
  const grupo = getElementosPorName(el.name);
  return Array.from(grupo).some(c => c.checked);
}

/**
 * Valida si algún radio del grupo está marcado.
 * @param {string|HTMLElement} el - Cualquier radio del grupo.
 * @returns {boolean}
 * @example
 * Funciones.input.radioMarcado('#radio'); // true si algún radio del grupo está marcado
 * Funciones.input.radioMarcado('#radio'); // false si ninguno del grupo está marcado
 * Funciones.input.radioMarcado(document.querySelector('#radio')); // true si algún radio del grupo está marcado
 */
export function radioMarcado(el) {
    const nodo = typeof el === 'string' ? document.querySelector(el) : el;
    const nombre = nodo?.name;
    if (!nombre) return false;
    return document.querySelector(`input[name="${nombre}"]:checked`) !== null;
}

export function radioSeleccionado(el) {
  const grupo = getElementosPorName(el.name);
  return Array.from(grupo).some(r => r.checked);
}

/**
 * Valida si un select tiene valor seleccionado válido.
 * @param {string|HTMLElement} el
 * @returns {boolean}
 * @example
 * Funciones.input.selectValido('#select'); // true si el select tiene un valor seleccionado
 * Funciones.input.selectValido('#select'); // false si el select está vacío o no es un <select>
 * Funciones.input.selectValido(document.querySelector('#select')); // true si el select tiene un valor seleccionado
 */
export function selectValido(el, invalido = "0") {
  return el.value !== invalido;
}

/**
 * Valida si un select múltiple tiene al menos una opción seleccionada.
 * @param {*} el
 * @returns
 */
export function selectMultipleSeleccionado(el) {
  if (!el || el.tagName !== 'SELECT' || !el.multiple) return false;
  return Array.from(el.selectedOptions).length > 0;
}

/**
 * Valida si hay al menos un archivo seleccionado.
 * @param {string|HTMLElement} el
 * @returns {boolean}
 * @example
 * Funciones.input.archivoSeleccionado('#archivo'); // true si hay archivos seleccionados
 * Funciones.input.archivoSeleccionado('#archivo'); // false si no hay archivos seleccionados
 * Funciones.input.archivoSeleccionado(document.querySelector('#archivo')); // true si hay archivos seleccionados
 */
export function archivoSeleccionado(el) {
    const nodo = typeof el === 'string' ? document.querySelector(el) : el;
    return nodo?.files?.length > 0;
}

/**
 * Valida la extensión del archivo seleccionado.
 * @param {string|HTMLElement} el
 * @param {string[]} extensiones - Lista sin punto, en minúscula.
 * @returns {boolean}
 * @example
 * Funciones.input.archivoExtensionValida('#archivo', ['jpg', 'png']); // true si el archivo es .jpg o .png
 * Funciones.input.archivoExtensionValida('#archivo', ['pdf']); // false si el archivo es .doc
 * Funciones.input.archivoExtensionValida(document.querySelector('#archivo'), ['txt', 'md']); // true si el archivo es .txt o .md
 */
export function archivoExtensionValida(el, extensiones) {
    const nodo = typeof el === 'string' ? document.querySelector(el) : el;
    const nombre = nodo?.value || '';
    const ext = nombre.split('.').pop().toLowerCase();
    return extensiones.includes(ext);
}

/**
 * Valida el tamaño máximo del archivo en bytes.
 * @param {string|HTMLElement} el
 * @param {number} maxBytes
 * @returns {boolean}
 * @example
 * Funciones.input.archivoTamanioMaximo('#archivo', 1048576); // true si el archivo pesa 1MB o menos
 * Funciones.input.archivoTamanioMaximo('#archivo', 1024); // false si el archivo pesa más de 1KB
 * Funciones.input.archivoTamanioMaximo(document.querySelector('#archivo'), 5242880); // true si el archivo pesa 5MB o menos
 */
export function archivoTamanioMaximo(el, maxBytes) {
    const nodo = typeof el === 'string' ? document.querySelector(el) : el;
    const archivo = nodo?.files?.[0];
    return archivo ? archivo.size <= maxBytes : false;
}

/**
 * Valida si el valor es una URL válida (http o https).
 * @param {string|HTMLElement} el
 * @returns {boolean}
 * @example
 * Funciones.input.urlValida('#url'); // true si el valor es una URL válida
 * Funciones.input.urlValida('#url'); // false si el valor no es una URL válida
 * Funciones.input.urlValida(document.querySelector('#url')); // true si el valor es una URL válida
 */
export function urlValida(el) {
    const valor = extraerValor(el);
    return /^(https?:\/\/)[^\s/$.?#].[^\s]*$/.test(valor);
}

/**
 * Valida si la URL comienza con "https://".
 * @param {string|HTMLElement} el
 * @returns {boolean}
 * @example
 * Funciones.input.urlEsHttps('#url'); // true si el valor comienza con "https://"
 * Funciones.input.urlEsHttps('#url'); // false si el valor no comienza con "https://"
 * Funciones.input.urlEsHttps(document.querySelector('#url')); // true si el valor comienza con "https://"
 */
export function urlEsHttps(el) {
    const valor = extraerValor(el);
    return /^https:\/\//.test(valor);
}
