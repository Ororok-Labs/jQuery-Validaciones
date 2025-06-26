/**
 * Obtiene el alto de la pantalla en píxeles.
 * @returns {number} Alto de la pantalla en píxeles.
 * @example
 * Funciones.pantalla.alto.obtener(); // 1080
 */
export function obtenerAlto() {
  return window.screen.height;
}

/**
 * Valida si el alto de la pantalla es mayor o igual a un valor.
 * @param {number} min - Altura mínima en píxeles.
 * @returns {boolean} True si el alto de la pantalla es >= min, false si no.
 * @example
 * Funciones.pantalla.alto.minimo(800); // true si la pantalla mide al menos 800px
 */
export function altoMinimo(min) {
  return window.screen.height >= min;
}

/**
 * Valida si el alto de la pantalla es menor o igual a un valor.
 * @param {number} max - Altura máxima en píxeles.
 * @returns {boolean} True si el alto de la pantalla es <= max, false si no.
 * @example
 * Funciones.pantalla.alto.maximo(1080); // true si la pantalla mide hasta 1080px
 */
export function altoMaximo(max) {
  return window.screen.height <= max;
}

/**
 * Obtiene el ancho de la pantalla en píxeles.
 * @returns {number} Ancho de la pantalla en píxeles.
 * @example
 * Funciones.pantalla.ancho.obtener(); // 1920
 */
export function obtenerAncho() {
  return window.screen.width;
}

/**
 * Valida si el ancho de la pantalla es mayor o igual a un valor.
 * @param {number} min - Ancho mínimo en píxeles.
 * @returns {boolean} True si el ancho de la pantalla es >= min, false si no.
 * @example
 * Funciones.pantalla.ancho.minimo(1024); // true si la pantalla mide al menos 1024px
 */
export function anchoMinimo(min) {
  return window.screen.width >= min;
}

/**
 * Valida si el ancho de la pantalla es menor o igual a un valor.
 * @param {number} max - Ancho máximo en píxeles.
 * @returns {boolean} True si el ancho de la pantalla es <= max, false si no.
 * @example
 * Funciones.pantalla.ancho.maximo(1920); // true si la pantalla mide hasta 1920px
 */
export function anchoMaximo(max) {
  return window.screen.width <= max;
}
