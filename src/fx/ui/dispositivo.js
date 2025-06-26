/**
 * Valida si el dispositivo es un móvil.
 * @returns {boolean} True si es móvil, false si no.
 * @example
 * const esMovil = OrorokJSFunciones.Funciones.Dispositivo.esMovil(); // true en móviles
 */
export function esMovil() {
    return /Mobi|Android/i.test(navigator.userAgent);
}


/**
 * Valida si el dispositivo es de escritorio.
 * @returns {boolean} True si es escritorio, false si es móvil.
 * @example
 * const esPC = OrorokJSFunciones.Funciones.Dispositivo.esEscritorio(); // true en escritorio
 */
export function esEscritorio() {
    return !/Mobi|Android/i.test(navigator.userAgent);
}

/**
 * Detecta si el dispositivo actual permite interacción táctil (touchscreen).
 *
 * @returns {boolean} True si el dispositivo tiene pantalla táctil (smartphones, tablets, híbridos táctiles).
 *
 * @example
 * ✅ Uso real:
 * const esTouch = OrorokJSFunciones.Funciones.Dispositivo.esTouch(); // true en dispositivos con pantalla táctil
 *
 * if (esTouch) document.body.classList.add("modo-touch");
 * else document.body.classList.add("modo-mouse");
 * @description
 * Esta función no es lo mismo que `esMovil()`. Un notebook con pantalla táctil puede devolver `true` en `esTouch()` y `false` en `esMovil()`.
 *
 * ### ¿Por qué es útil detectar dispositivos táctiles?
 * - Para ajustar el diseño de botones (más grandes en pantallas touch).
 * - Para evitar eventos `hover` no deseados en móviles.
 * - Para decidir si usar `click` o `touchstart` como evento principal.
 *
 * ### ¿Cómo funciona?
 * - Detecta si existe `ontouchstart` en `window`: esto indica soporte táctil.
 * - También verifica si `navigator.maxTouchPoints` es mayor a 0 (método moderno y confiable).
 */
export function esTouch() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}


/**
 * Obtiene el sistema operativo del dispositivo.
 * @returns {string} Nombre del sistema operativo (Windows, MacOS, Linux, Android, iOS, Otro).
 * @example
 * const so = OrorokJSFunciones.Funciones.Dispositivo.sistemaOperativo(); // "Android", "Windows", etc.
 */
export function sistemaOperativo() {
    const ua = navigator.userAgent;
    if (/windows/i.test(ua)) return "Windows";
    if (/macintosh|mac os x/i.test(ua)) return "MacOS";
    if (/linux/i.test(ua)) return "Linux";
    if (/android/i.test(ua)) return "Android";
    if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
    return "Otro";
}