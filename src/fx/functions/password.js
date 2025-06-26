import {extraerValor} from '../input/input.js';

/**
 * Valida el valor usando una expresión regular personalizada.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {RegExp} regexp - Expresión regular a aplicar.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.password.regexp(entrada, /^[a-z]+$/); // true si el valor es "abc"
 * Funciones.password.regexp("#entrada", /^[0-9]+$/); // false si el valor es "abc"
 * Funciones.password.regexp(document.getElementById("entrada"), /^[A-Z]+$/); // true si el valor es "ABC"
 */
export function regexp(entrada, regexp) {
    const valor = extraerValor(entrada);
    return regexp.test(valor);
}

/**
 * Valida que la contraseña tenga al menos 'min' caracteres.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} min - Largo mínimo requerido.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.password.largoMinimo(entrada, 8); // true si longitud >= 8
 * Funciones.password.largoMinimo("#entrada", 10); // false si longitud < 10
 * Funciones.password.largoMinimo(document.getElementById("entrada"), 5); // true si longitud >= 5
 */
export function largoMinimo(entrada, min) {
    const valor = extraerValor(entrada);
    return valor.length >= min;
}

/**
 * Valida que la contraseña sea solo alfanumérica (letras y números).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.password.alfanumerico(entrada); // true si "abc123"
 * Funciones.password.alfanumerico("#entrada"); // false si "abc123!"
 * Funciones.password.alfanumerico(document.getElementById("entrada")); // true si "ABC123"
 */
export function alfanumerico(entrada) {
    const valor = extraerValor(entrada);
    return /^[A-Za-z0-9]+$/.test(valor);
}

/**
 * Valida que la contraseña tenga letras, números y al menos un caracter especial.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.password.numerosLetrasEspecial(entrada); // true si "abc123!"
 * Funciones.password.numerosLetrasEspecial("#entrada"); // false si "abc123"
 * Funciones.password.numerosLetrasEspecial(document.getElementById("entrada")); // true si "ABC123@"
 */
export function numerosLetrasEspecial(entrada) {
    const valor = extraerValor(entrada);
    return /[A-Za-z]/.test(valor) && /[0-9]/.test(valor) && /[^A-Za-z0-9]/.test(valor);
}

/**
 * Valida que la contraseña sea fuerte: mínimo 'min' caracteres, al menos una minúscula,
 * una mayúscula, un número y un caracter especial.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {number} [min=8] - Largo mínimo requerido.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.password.fuerte(entrada, 8); // true si "Abc123!@"
 * Funciones.password.fuerte("#entrada", 8); // false si "abc12345"
 * Funciones.password.fuerte(document.getElementById("entrada"), 10); // true si "Abc123!@#"
 */
export function fuerte(entrada, min = 8) {
    const valor = extraerValor(entrada);
    return (
        valor.length >= min &&
        /[a-z]/.test(valor) &&
        /[A-Z]/.test(valor) &&
        /[0-9]/.test(valor) &&
        /[^A-Za-z0-9]/.test(valor)
    );
}

/**
 * Valida que dos campos de contraseña sean iguales.
 * @param {string|HTMLElement|any} entrada - Primer campo.
 * @param {string|HTMLElement|any} otra - Segundo campo a comparar.
 * @returns {boolean} True si son iguales, false si no.
 * @example
 * Funciones.password.repetido(entrada, "#otra"); // true si valores idénticos
 * Funciones.password.repetido("#entrada", otra); // false si difieren
 * Funciones.password.repetido(document.getElementById("entrada"), otra); // true si ambos son "abc123"
 */
export function repetido(entrada, otra) {
    const valor1 = extraerValor(entrada);
    const valor2 = extraerValor(otra);
    return valor1 === valor2;
}




/**
 * Alterna la visibilidad de un input tipo password y actualiza el ícono respectivo.
 * @note
 * Si el elemento no es un HTMLElement, se espera que sea un string de ID de elemento HTML válido.
 * @param {(String|HTMLElement)} elementoPassword - Input tipo password a mostrar u ocultar.
 * @param {(String|HTMLElement)} elementoIcono - Elemento del ícono asociado.
 * @param {string[]} [iconos=["fa-eye-slash", "fa-eye"]] - Clases para ocultar y mostrar.
 * @returns {void}
 * @throws {TypeError} Si los parámetros no son elementos HTML.
 * @example
 * // Muestra u oculta la contraseña al invocar:
 * Funciones.password.mostrarOcultar(document.getElementById('inputClave'), "#iconoMostrar"), ['fa-eye-slash', 'fa-eye']);
 * // Alternativamente, usando IDs y sin especificar los nombres de iconos:
 * Funciones.password.mostrarOcultar('#inputClave', '#iconoMostrar');
 */
export function mostrarOcultar(elementoPassword, elementoIcono, iconos = ["fa-eye-slash", "fa-eye"]) {
    let pwdEl = elementoPassword;
    let iconEl = elementoIcono;
    const [iconHide, iconShow] = iconos;

    if (typeof elementoPassword === 'string') {
        if (!elementoPassword.startsWith('#')) {
            throw new TypeError('ID de elementoPassword debe empezar con "#".');
        }
        pwdEl = document.getElementById(elementoPassword.slice(1));
        if (!pwdEl) throw new TypeError('No se encontró elementoPassword con el ID dado.');
    }
    if (typeof elementoIcono === 'string') {
        if (!elementoIcono.startsWith('#')) {
            throw new TypeError('ID de elementoIcono debe empezar con "#".');
        }
        iconEl = document.getElementById(elementoIcono.slice(1));
        if (!iconEl) throw new TypeError('No se encontró elementoIcono con el ID dado.');
    }
    if (!(pwdEl instanceof HTMLElement) || !(iconEl instanceof HTMLElement)) {
        throw new TypeError('elementoPassword y elementoIcono deben ser HTMLElement o IDs válidos.');
    }


    if (elementoPassword.getAttribute('type') === 'password') {
        elementoIcono.classList.remove(iconHide);
        elementoIcono.classList.add(iconShow);
        elementoPassword.setAttribute('type', 'text');
    } else {
        elementoIcono.classList.remove(iconShow);
        elementoIcono.classList.add(iconHide);
        elementoPassword.setAttribute('type', 'password');
    }
}