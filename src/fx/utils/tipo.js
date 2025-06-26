/**
 * Verifica que un valor sea un string no vacío.
 * @param {*} valor - Valor a validar.
 * @param {boolean} [throwError=true] - Si lanzar excepción al fallar.
 * @returns {boolean} `true` si es string válido, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaParametroTexto("Hola Mundo"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaParametroTexto(""); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaParametroTexto(123); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaParametroTexto("  "); // false
 */
export function validaParametroTexto(valor, throwError = true) {
    if (typeof valor !== "string" || valor.trim() === "") {
        console.error("[validaParametroTexto] Se esperaba un string no vacío pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un string válido o el string está vacío.");
        return false;
    }
    return true;
}

/**
 * Confirma si el valor es un número entero.
 * @param {*} valor - Valor a validar.
 * @param {boolean} [throwError=true] - Si lanzar excepción al fallar.
 * @returns {boolean} `true` si es entero válido, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaInt(42); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaInt("100"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaInt(3.14); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaInt("texto"); // false
 */
export function validaInt(valor, throwError = true) {
    const num = typeof valor === "number" ? valor : Number(valor);
    if (!Number.isInteger(num)) {
        console.error("[validaInt] Se esperaba un entero pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un entero válido.");
        return false;
    }
    return true;
}

/**
 * Verifica si el valor es un número flotante (double).
 * @param {*} valor - Valor a evaluar.
 * @param {boolean} [throwError=true] - Determina si se lanza un error.
 * @returns {boolean} `true` si es número válido, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaDouble(3.14); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDouble("2.718"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDouble("texto"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaDouble(NaN); // false
 */
export function validaDouble(valor, throwError = true) {
    const num = typeof valor === "number" ? valor : Number(valor);
    if (Number.isNaN(num) || !isFinite(num)) {
        console.error("[validaDouble] Se esperaba un número (double) pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un número válido.");
        return false;
    }
    return true;
}

/**
 * Evalúa si el valor es una fecha válida (Date o string ISO YYYY-MM-DD).
 * @param {*} valor - Fecha a validar.
 * @param {boolean} [throwError=true] - Si lanzar error al fallar.
 * @returns {boolean} `true` si es fecha válida, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaDate(new Date()); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDate("2023-10-01"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDate("01-10-2023"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaDate("texto"); // false
 */
export function validaDate(valor, throwError = true) {
    // Permite Date o string con formato ISO (YYYY-MM-DD)
    if (
        !(valor instanceof Date && !isNaN(valor.valueOf())) &&
        !(typeof valor === "string" && /^\d{4}-\d{2}-\d{2}$/.test(valor) && !isNaN(Date.parse(valor)))
    ) {
        console.error("[validaDate] Se esperaba una fecha (Date o string YYYY-MM-DD) pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió una fecha válida.");
        return false;
    }
    return true;
}

/**
 * Evalúa si el valor es un datetime válido (Date o string ISO con hora).
 * @param {*} valor - Fecha y hora a validar.
 * @param {boolean} [throwError=true] - Si lanzar error al fallar.
 * @returns {boolean} `true` si es datetime válido, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaDateTime(new Date()); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDateTime("2023-10-01T12:30"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDateTime("2023-10-01 12:30"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDateTime("2023-10-01 12:30:45"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaDateTime("01-10-2023 12:30"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaDateTime("texto"); // false
 */
export function validaDateTime(valor, throwError = true) {
    // Permite Date o string con formato ISO (YYYY-MM-DDTHH:MM o YYYY-MM-DD HH:MM)
    if (
        !(valor instanceof Date && !isNaN(valor.valueOf())) &&
        !(typeof valor === "string" &&
            (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}(:\d{2})?$/.test(valor)) &&
            !isNaN(Date.parse(valor)))
    ) {
        console.error("[validaDateTime] Se esperaba un datetime (Date o string ISO) pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un datetime válido.");
        return false;
    }
    return true;
}

/**
 * Comprueba si el valor es estrictamente un booleano.
 * @param {*} valor - Valor a validar.
 * @param {boolean} [throwError=true] - Si se lanza error si falla.
 * @returns {boolean} `true` si es booleano, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaBoolean(true); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaBoolean(false); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaBoolean("true"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaBoolean(1); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaBoolean(null); // false
 */
export function validaBoolean(valor, throwError = true) {
    if (typeof valor !== "boolean") {
        console.error("[validaBoolean] Se esperaba un booleano pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un booleano válido.");
        return false;
    }
    return true;
}

/**
 * Verifica si el valor es un arreglo (array).
 * @param {*} valor - Valor a verificar.
 * @param {boolean} [throwError=true] - Si se lanza error si falla.
 * @returns {boolean} `true` si es array, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaArray([1, 2, 3]); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaArray("texto"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaArray({}); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaArray(null); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaArray(undefined); // false
 */
export function validaArray(valor, throwError = true) {
    if (!Array.isArray(valor)) {
        console.error("[validaArray] Se esperaba un array pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un array válido.");
        return false;
    }
    return true;
}

/**
 * Valida si el valor es un objeto plano (no null, no array).
 * @param {*} valor - Objeto a verificar.
 * @param {boolean} [throwError=true] - Si se lanza error si no cumple.
 * @returns {boolean} `true` si es objeto, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaObject({ clave: "valor" }); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaObject(null); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaObject([]); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaObject("texto"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaObject(42); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaObject(undefined); // false
 */
export function validaObject(valor, throwError = true) {
    if (typeof valor !== "object" || valor === null || Array.isArray(valor)) {
        console.error("[validaObject] Se esperaba un objeto pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un objeto válido.");
        return false;
    }
    return true;
}

/**
 * Valida si el parámetro es un objeto jQuery.
 * Lanza error si no lo es, a menos que se indique lo contrario.
 * @param {*} $objeto - Objeto a verificar.
 * @param {boolean} [throwError=true] - Si se lanza error al fallar.
 * @returns {boolean} `true` si es un objeto jQuery, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaObjetojQuery($("#miElemento")); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaObjetojQuery("texto"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaObjetojQuery(null); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaObjetojQuery(undefined); // false
 */
export function validaObjetojQuery($objeto, throwError = true) {
    if (!($objeto instanceof jQuery)) {
        console.error("[validaObjetojQuery] Se esperaba un objeto jQuery pero se recibió:", $objeto);
        console.error("Tipo:", typeof $objeto, "| Constructor:", $objeto?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un objeto jQuery válido.");
        return false;
    }
    return true;
}

/**
 * Valida si el parámetro es un elemento HTML válido (nodo del DOM).
 * Lanza error si no lo es, a menos que se indique lo contrario.
 * @param {*} elemento - Elemento a verificar (debe ser instancia de HTMLElement).
 * @param {boolean} [throwError=true] - Determina si se lanza un error al fallar.
 * @returns {boolean} `true` si es un HTML Element, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaHTMLElement(document.getElementById("miElemento")); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaHTMLElement("texto"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaHTMLElement(null); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaHTMLElement(undefined); // false
 */
export function validaHTMLElement(elemento, throwError = true) {
    if (!(elemento instanceof HTMLElement)) {
        console.error("[validaHTMLElement] Se esperaba un HTMLElement pero se recibió:", elemento);
        console.error("Tipo:", typeof elemento, "| Constructor:", elemento?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un HTMLElement válido.");
        return false;
    }
    return true;
}


/**
 * Comprueba si el valor es una función.
 * @param {*} valor - Función a evaluar.
 * @param {boolean} [throwError=true] - Si lanzar error si falla.
 * @returns {boolean} `true` si es función, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction(function() {}); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction(() => {}); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction("texto"); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction(123); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction(null); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction(undefined); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaFunction({}); // false
 */
export function validaFunction(valor, throwError = true) {
    if (typeof valor !== "function") {
        console.error("[validaFunction] Se esperaba una función pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió una función válida.");
        return false;
    }
    return true;
}

/**
 * Verifica que el valor no sea `null` ni `undefined`.
 * @param {*} valor - Valor a validar.
 * @param {boolean} [throwError=true] - Si lanzar error si falla.
 * @returns {boolean} `true` si es válido, `false` si no.
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaNoNull("texto"); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaNoNull(123); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaNoNull(null); // false
 * OrorokJSFunciones.Funciones.Utilidades.validaNoNull(undefined); // false
 */
export function validaNoNull(valor, throwError = true) {
    if (valor === null || valor === undefined) {
        console.error("[validaNoNull] Se esperaba un valor no nulo/indefinido pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un valor válido.");
        return false;
    }
    return true;
}

/**
 * Valida si el valor recibido es un **SVGElement** válido.
 * @function validaSVGElement
 * @param {*} valor - El valor que se desea comprobar.
 * @param {boolean} [throwError=true] - Si se lanza un error cuando la validación falla.
 * @returns {boolean} `true` si el valor es un SVGElement válido, `false` si no (o lanza error).
 * @example
 * OrorokJSFunciones.Funciones.Utilidades.validaSVGElement(document.querySelector("svg")); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaSVGElement(document.createElementNS("http://www.w3.org/2000/svg", "circle")); // true
 * OrorokJSFunciones.Funciones.Utilidades.validaSVGElement(document.createElement("div")); // false
 */
export function validaSVGElement(valor, throwError = true) {
    if (!(valor instanceof SVGElement)) {
        console.error("[validaSVGElement] Se esperaba un SVGElement pero se recibió:", valor);
        console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
        console.trace("Pila de ejecución");

        if (throwError) throw new Error("No se recibió un SVGElement válido.");
        return false;
    }
    return true;
}