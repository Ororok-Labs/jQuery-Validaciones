export class Tipo {
    static validaObjetojQuery($objeto, throwError = true) {
        if (!($objeto instanceof jQuery)) {
            console.error("[validaObjetojQuery] Se esperaba un objeto jQuery pero se recibió:", $objeto);
            console.error("Tipo:", typeof $objeto, "| Constructor:", $objeto?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió un objeto jQuery válido.");
            return false;
        }
        return true;
    }

    static validaParametroTexto(valor, throwError = true) {
        if (typeof valor !== "string" || valor.trim() === "") {
            console.error("[validaParametroTexto] Se esperaba un string no vacío pero se recibió:", valor);
            console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió un string válido o el string está vacío.");
            return false;
        }
        return true;
    }

    static validaInt(valor, throwError = true) {
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

    static validaDouble(valor, throwError = true) {
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

    static validaDate(valor, throwError = true) {
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

    static validaDateTime(valor, throwError = true) {
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

    static validaBoolean(valor, throwError = true) {
        if (typeof valor !== "boolean") {
            console.error("[validaBoolean] Se esperaba un booleano pero se recibió:", valor);
            console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió un booleano válido.");
            return false;
        }
        return true;
    }

    static validaArray(valor, throwError = true) {
        if (!Array.isArray(valor)) {
            console.error("[validaArray] Se esperaba un array pero se recibió:", valor);
            console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió un array válido.");
            return false;
        }
        return true;
    }

    static validaObject(valor, throwError = true) {
        if (typeof valor !== "object" || valor === null || Array.isArray(valor)) {
            console.error("[validaObject] Se esperaba un objeto pero se recibió:", valor);
            console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió un objeto válido.");
            return false;
        }
        return true;
    }

    static validaFunction(valor, throwError = true) {
        if (typeof valor !== "function") {
            console.error("[validaFunction] Se esperaba una función pero se recibió:", valor);
            console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió una función válida.");
            return false;
        }
        return true;
    }

    static validaNoNull(valor, throwError = true) {
        if (valor === null || valor === undefined) {
            console.error("[validaNoNull] Se esperaba un valor no nulo/indefinido pero se recibió:", valor);
            console.error("Tipo:", typeof valor, "| Constructor:", valor?.constructor?.name || "indefinido");
            console.trace("Pila de ejecución");

            if (throwError) throw new Error("No se recibió un valor válido.");
            return false;
        }
        return true;
    }
}