import {capitalizarPalabrasExcepto} from './texto.js';

// Español
const excepcionesEs = [
    'de', 'del', 'la', 'las', 'los', 'y', 'van', 'von'
];

// Inglés
const excepcionesEn = [
    'of', 'and', 'the'
];

// Francés
const excepcionesFr = [
    'de', 'du', 'des', 'la', 'le', 'les',
    'et', 'à', 'au', 'aux', 'd\'', 'l\''
];

// Portugués
const excepcionesPt = [
    'de', 'da', 'do', 'das', 'dos',
    'e', 'em', 'ao', 'aos', 'na', 'nos'
];

// Italiano
const excepcionesIt = [
    'di', 'del', 'della', 'dei', 'degli',
    'e', 'la', 'le', 'in', 'al', 'allo'
];

// Alemán
const excepcionesDe = [
    'von', 'zu', 'zum', 'zur', 'am', 'im',
    'der', 'die', 'das', 'und', 'bei'
];

// Neerlandés (holandés)
const excepcionesNl = [
    'van', 'de', 'der', 'den', 'het',
    'en', 'te', 'op', 'aan'
];

// Gaélico Irlandés / Escocés
const excepcionesGa = [
    "O'", "Mac", "Mc", 'Ní', 'Nic'
];

//Une las excepciones de ambos idiomas
const excepcionesTodas = [...new Set([
    ...excepcionesEs,
    ...excepcionesEn,
    ...excepcionesFr,
    ...excepcionesPt,
    ...excepcionesIt,
    ...excepcionesDe,
    ...excepcionesNl,
    ...excepcionesGa
], )];



/**
 * Convierte a Title Case excepto partículas definidas (se mantienen en minúscula si no son la primera palabra).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor de texto.
 * @param {string[]} [excepciones=excepcionesTodas] - Partículas a mantener en minúscula.
 * @returns {string} Nombre formateado.
 * @example
 * Funciones.nombre.nombreRealDePersona('carlos de la fuente'); // 'Carlos de la Fuente'
 * Funciones.nombre.nombreRealDePersona('earl of grantham'); // 'Earl of Grantham'
 */
export function nombreRealDePersona(entrada, excepciones = excepcionesTodas) {
    return capitalizarPalabrasExcepto(entrada, excepciones);
}