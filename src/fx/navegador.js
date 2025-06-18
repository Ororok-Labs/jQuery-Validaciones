export class Navegador {
    /**
     * Obtiene el nombre del navegador.
     * @example
     * Funciones.navegador.nombre(); // "Chrome", "Firefox", "Edge", etc.
     * @returns {string}
     */
    static nombre = () => {
        const ua = navigator.userAgent;
        if (/chrome|crios|crmo/i.test(ua) && !/edge|edg|opr|opera/i.test(ua)) return "Chrome";
        if (/firefox|fxios/i.test(ua)) return "Firefox";
        if (/safari/i.test(ua) && !/chrome|crios|crmo|android/i.test(ua)) return "Safari";
        if (/edg/i.test(ua)) return "Edge";
        if (/opr|opera/i.test(ua)) return "Opera";
        return "Otro";
    };

    /**
     * Obtiene la versión del navegador.
     * @example
     * Funciones.navegador.version(); // "124.0.0.0"
     * @returns {string}
     */
    static version = () => navigator.appVersion;

    /**
     * Valida si el navegador es móvil.
     * @example
     * Funciones.navegador.esMovil(); // true en móviles, false en escritorio
     * @returns {boolean}
     */
    static esMovil = () => /Mobi|Android/i.test(navigator.userAgent);
}