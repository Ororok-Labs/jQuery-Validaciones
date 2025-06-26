/**
 * Obtiene el nombre del navegador web actual.
 * @returns {string} Nombre del navegador (Chrome, Firefox, Safari, etc.).
 * @example
 * const nombreNavegador = OrorokJSFunciones.Funciones.Navegador.nombre(); // "Chrome", "Firefox", etc.
 */
export function nombre() {
    const ua = navigator.userAgent;
    if (/chrome|crios|crmo/i.test(ua) && !/edge|edg|opr|opera/i.test(ua)) return "Chrome";
    if (/firefox|fxios/i.test(ua)) return "Firefox";
    if (/safari/i.test(ua) && !/chrome|crios|crmo|android/i.test(ua)) return "Safari";
    if (/edg/i.test(ua)) return "Edge";
    if (/opr|opera/i.test(ua)) return "Opera";
    return "Otro";
}


/**
 * Obtiene la versión del navegador web.
 * @returns {string} Cadena de versión del navegador.
 * @example
 * const versionNavegador = OrorokJSFunciones.Funciones.Navegador.version(); // "124.0.0.0"
 */
export function version() {
    return navigator.appVersion;
}


/**
 * Detecta si el usuario está navegando desde un dispositivo móvil.
 * @returns {boolean} True si es móvil, false si es escritorio.
 * @example
 * if (OrorokJSFunciones.Funciones.Navegador.esMovil()) alert("Estás en un móvil");
 */
export function esMovil() {
    return /Mobi|Android/i.test(navigator.userAgent);
}
