export class Validador {
    constructor(tipoSalida = "inputs", opcionesValidacion = {}) {
        this.errores = [];
        this.inputs = [];
        this.configuracion(tipoSalida, opcionesValidacion);
    }

    configuracion(tipoSalida, opcionesValidacion) {
        this.tipoSalida = this.definirTipoSalida(tipoSalida);
        this.opcionesValidacion = {
            claseError: opcionesValidacion.claseError || "input-error",
            claseExito: opcionesValidacion.claseExito || "input-exito",
            elementoMensaje: opcionesValidacion.elementoMensaje || "div",
            resaltadoError: opcionesValidacion.resaltadoError || "div-error",
            resaltadoExito: opcionesValidacion.resaltadoExito || "div-exito",

            // 👇 Opciones para el tipo "inputs"
            contenedorError: opcionesValidacion.contenedorError || "span", // o div
            posicionError: opcionesValidacion.posicionError || "after", // after | append | prepend | replace
            mostrarInmediato: opcionesValidacion.mostrarInmediato || false // true = se valida al escribir
        };
    }


    definirTipoSalida(tipo) {
        switch (tipo) {
            case "arreglo":
            case "html":
            case "inputs":
            case "consola":
            case "alerta":
            case "corto-circuito":
                return tipo;
            default:
                throw new Error("Se pasó un tipo de salida no definido.");
        }
    }

    // --- MÉTODO PRINCIPAL PARA VALIDAR CAMPOS ---
    input(selector, reglas) {
        const $elemento = (typeof selector === "string") ? $(selector) : selector;
        const self = this;

        const v = (arr) => {
            self.funcionPersonal(arr, $elemento);
            return v;
        };

        if (typeof reglas === "function") {
            reglas(v);

        } else if (Array.isArray(reglas)) {
            reglas.forEach(regla => self.funcionPersonal(regla, $elemento));

        } else if (typeof reglas === "object" && reglas !== null) {
            for (const clave in reglas) {
                const valor = reglas[clave];
                if (Array.isArray(valor) && typeof valor[0] === "function") {
                    self.funcionPersonal(valor, $elemento);
                }
            }
        }

        return this;
    }


    funcionPersonal(arr, $elemento) {
        if (Array.isArray(arr) && typeof arr[0] === "function") {
            const fn = arr[0];
            const mensaje = arr[1] || "Regla personalizada no cumplida";
            const valor = $elemento.val();
            if (!fn(valor)) {
                this.errores.push(mensaje);
            }
        }
        return this;
    }



    // --- UTILIDADES ---
    valida() {
        return this.errores.length === 0;
    }

    mostrarErrores() {
        switch (this.tipoSalida) {
            case "consola":
                this.errores.forEach((mensaje) => console.error(mensaje));
                break;
            case "alerta":
                alert(this.errores.join("\n"));
                break;
            case "html":
                if (this.opcionesValidacion.elementoMensaje && $(this.opcionesValidacion.elementoMensaje).length) {
                    const $elemento = $(this.opcionesValidacion.elementoMensaje);
                    $elemento.html(this.errores.map(mensaje => `<div class="${this.opcionesValidacion.resaltadoError}">${mensaje}</div>`).join(""));
                }
                break;
            case "inputs":
                // Aquí podrías resaltar los inputs con errores si guardas referencias a ellos
                // Ejemplo simple: solo muestra en consola
                this.errores.forEach((mensaje) => console.error(mensaje));
                break;
            case "arreglo":
                return this.errores;
            case "corto-circuito":
                // Muestra solo el primer error
                if (this.errores.length) {
                    alert(this.errores[0]);
                }
                break;
            default:
                // Por defecto, consola
                this.errores.forEach((mensaje) => console.error(mensaje));
        }
    }

    reset() {
        this.errores = [];
        this.resetVisual();
        return this;
    }

    resetVisual() {
        $("." + this.opcionesValidacion.claseError).removeClass(this.opcionesValidacion.claseError);
        $("." + this.opcionesValidacion.claseExito).removeClass(this.opcionesValidacion.claseExito);
        $("." + this.opcionesValidacion.resaltadoError).remove();
        $("." + this.opcionesValidacion.resaltadoExito).remove();
        return this;
    }

}