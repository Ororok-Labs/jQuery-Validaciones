import {
    getElementosPorName
} from '../fx/utils/selectores.js';

/**
 * Validador.js
 * Clase para validar inputs de formularios con diferentes tipos de salida.
 * Soporta validaciones personalizadas, mensajes de error y éxito, y diferentes configuraciones de visualización.
 */
export class Validador {
    constructor(tipoSalida = "inputs", opcionesValidacion = {}) {
        this.errores = [];
        this.inputs = [];
        this.configuracion(tipoSalida, opcionesValidacion);
    }

    configuracion(tipoSalida, opcionesValidacion) {
        this.tipoSalida = this.definirTipoSalida(tipoSalida);
        this.opcionesValidacion = {
            //REACTIVIDAD al validar inputs
            reactivo: opcionesValidacion.reactivo !== false, //true = se valida al escribir, false = se valida al enviar el formulario.

            //CLASSES CSS para inputs al validar
            inputError: opcionesValidacion.inputError || "input-error", //Clase css que se le dará al input en caso de error.
            inputExito: opcionesValidacion.inputExito || "input-exito", //Clase css que se le dará al input en caso de éxito.

            //CONTENEDOR DE MENSAJES DE VALIDACIÓN
            //En caso de mostrar errores en inputs, se usa "error-{name del input}" como id del contenedor (Ej: span al lado del input).
            //En caso de mostrar errores en HTML, se usa el id del contenedor (Ej: ventana modal con mensajes).
            contenedorMsg: opcionesValidacion.contenedorMsg,
            mensajeError: opcionesValidacion.mensajeError || "msg-error", //Clase css que se le dará al contenedor de error.
            mensajeExito: opcionesValidacion.mensajeExito || "msg-exito", //Clase css que se le dará al contenedor de éxito.
        };
    }


    /**
     * Se usa para definir el tipo de salida del validador.
     * @param {string} tipo
     * @returns {string}
     * @throws {Error} Si el tipo de salida no está definido.
     */
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

    input(name, reglas) {
        const elementos = getElementosPorName(name);
        if (!elementos || elementos.length === 0) return this;

        // Normalizar reglas
        const reglasArray = [];
        if (typeof reglas === "function") {
            reglas((arr) => reglasArray.push(arr));
        } else if (Array.isArray(reglas)) {
            reglasArray.push(...reglas);
        } else if (typeof reglas === "object" && reglas !== null) {
            for (const clave in reglas) {
                const valor = reglas[clave];
                if (Array.isArray(valor) && typeof valor[0] === "function") {
                    reglasArray.push(valor);
                }
            }
        }

        // REGISTRA input solo si no existe
        const yaRegistrado = this.inputs.find(i => i.name === name);
        if (!yaRegistrado) {
            this.inputs.push({
                name,
                reglas: reglasArray
            });
        }

        const validarGrupo = () => {
            this.errores = this.errores.filter(e => e.name !== name);

            let valor;
            const tipo = elementos[0].type;

            if (tipo === "radio") {
                const seleccionado = elementos.find(el => el.checked);
                valor = seleccionado ? seleccionado.value : null;
            } else if (tipo === "checkbox") {
                valor = Array.from(elementos).filter(el => el.checked).map(el => el.value);
            } else {
                valor = elementos[0].value;
            }

            let valido = true;
            for (const [fn, mensaje] of reglasArray) {
                if (!fn(valor)) {
                    valido = false;

                    // Clases CSS
                    elementos.forEach(el => {
                        el.classList.add(this.opcionesValidacion.inputError);
                        el.classList.remove(this.opcionesValidacion.inputExito);
                    });

                    this.mostrarMensajeEnInput(name, mensaje, this.opcionesValidacion.mensajeError);
                    this.errores.push({
                        name,
                        mensaje
                    });
                    break;
                }
            }

            if (valido) {
                elementos.forEach(el => {
                    el.classList.remove(this.opcionesValidacion.inputError);
                    el.classList.add(this.opcionesValidacion.inputExito);
                });
                this.mostrarMensajeEnInput(name, "", this.opcionesValidacion.mensajeExito);
            }
        };

        // Reactividad
        if (this.opcionesValidacion.reactivo) {
            elementos.forEach(el => {
                el.addEventListener("input", validarGrupo);
                el.addEventListener("change", validarGrupo);
                el.addEventListener("blur", validarGrupo);
            });
        }

        return this;
    }


    /**
     * Muestra los errores de validación según el tipo de salida configurado.
     * @returns {void|Array<string>}
     */
    mostrarErrores() {
        switch (this.tipoSalida) {
            case "consola":
                this.errores.forEach(({
                    mensaje
                }) => console.error(mensaje));
                break;

            case "alerta":
                alert(this.errores.map(e => e.mensaje).join("\n"));
                break;

            case "html":
                if (this.opcionesValidacion.contenedorMsg) {
                    const contenedor = document.getElementById(this.opcionesValidacion.contenedorMsg);
                    if (contenedor) {
                        contenedor.innerHTML = this.errores.map(({
                            mensaje
                        }) => {
                            return `<div class="${this.opcionesValidacion.mensajeError}">${mensaje}</div>`;
                        }).join("");
                    }
                }
                break;

            case "inputs":
                this.errores.forEach(({
                    name,
                    mensaje
                }) => {
                    this.mostrarMensajeEnInput(name, mensaje, this.opcionesValidacion.mensajeError);
                });
                break;

            case "arreglo":
                return this.errores;

            case "corto-circuito":
                if (this.errores.length) {
                    alert(this.errores[0].mensaje);
                }
                break;

            default:
                this.errores.forEach(({
                    mensaje
                }) => console.error(mensaje));
        }
    }

    /**
     * Muestra un mensaje de error en el input correspondiente.
     */
    mostrarMensajeEnInput(name, mensaje, clase = "div-error") {
        const contenedor = document.getElementById("error-" + name);
        if (!contenedor) return;
        contenedor.className = clase;
        contenedor.innerHTML = mensaje;
    }


    /**
     * Ejecuta todas las validaciones registradas y devuelve si hay errores.
     * @returns {boolean} true si no hay errores, false si hay errores.
     */
    valida() {
        this.errores = [];

        for (const input of this.inputs) {
            const elementos = getElementosPorName(input.name);
            let valor;

            const tipo = elementos[0].type;
            if (tipo === "radio") {
                const seleccionado = elementos.find(el => el.checked);
                valor = seleccionado ? seleccionado.value : null;
            } else if (tipo === "checkbox") {
                valor = Array.from(elementos).filter(el => el.checked).map(el => el.value);
            } else {
                valor = elementos[0].value;
            }

            for (const [fn, mensaje] of input.reglas) {
                if (!fn(valor)) {
                    this.errores.push({
                        name: input.name,
                        mensaje
                    });
                    elementos.forEach(el => {
                        el.classList.add(this.opcionesValidacion.inputError);
                        el.classList.remove(this.opcionesValidacion.inputExito);
                    });
                    this.mostrarMensajeEnInput(input.name, mensaje, this.opcionesValidacion.mensajeError);
                    break;
                }
            }
        }

        return this.errores.length === 0;
    }



    /**
     * Resetea el validador, eliminando todos los errores y limpiando el formulario.
     * @returns {Validador} - Retorna la instancia del validador para encadenar métodos.
     */
    reset() {
        this.errores = [];
        this.resetVisual();
        return this;
    }

    /**
     * Limpia el formulario de mensajes.
     * @returns {Validador} - Retorna la instancia del validador para encadenar métodos.
     */
    resetVisual() {
        // Elimina clases de error y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.inputError).forEach(el => {
            el.classList.remove(this.opcionesValidacion.inputError);
            el.innerHTML = "";
        });
        // Elimina clases de éxito y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.inputExito).forEach(el => {
            el.classList.remove(this.opcionesValidacion.inputExito);
            el.innerHTML = "";
        });
        // Elimina contenedores de error y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.mensajeError).forEach(el => {
            el.classList.remove(this.opcionesValidacion.mensajeError);
            el.innerHTML = "";
        });
        // Elimina contenedores de éxito (si existieran) y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.mensajeExito).forEach(el => {
            el.classList.remove(this.opcionesValidacion.mensajeExito);
            el.innerHTML = "";
        });
        return this;
    }
}