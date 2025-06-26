import {
    getElementosPorName
} from '../fx/utils/selectores.js';
import {
    extraerValor
} from '../fx/input/input.js';

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
            case "array":
            case "html":
            case "inputs":
            case "input":
            case "consola":
            case "console":
            case "alerta":
            case "alert":
            case "corto-circuito":
                return tipo;
            default:
                throw new Error("Se pasó un tipo de salida no definido.");
        }
    }

    /**
     * Registra un input para validación.
     * Permite definir reglas de validación personalizadas para el input.
     * Las reglas deben ser un arreglo de pares [función, mensaje], donde la función recibe el valor del input y retorna true si es válido o false si no lo es.
     * @param {*} name
     * @param {*} reglas
     * @returns
     */
    input(name, reglas) {
        const elementos = getElementosPorName(name);
        if (!elementos || elementos.length === 0) return this;

        // Convierte la lista de reglas recibidas en un arreglo uniforme de [función, mensaje].
        // Este validador solo acepta arrays planos: [[fn, "mensaje"], ...]
        const reglasArray = [];
        if (Array.isArray(reglas)) {
            reglas.forEach(regla => {
                if (Array.isArray(regla) && typeof regla[0] === "function") {
                    const [fn, msg, ...args] = regla;
                    reglasArray.push([this.regla(fn, ...args), msg]);
                } else {
                    reglasArray.push(regla);
                }
            });
        }

        // Guarda el input y sus reglas de validación en la lista interna, solo si no fue registrado previamente
        const yaRegistrado = this.inputs.find(i => i.name === name);
        if (!yaRegistrado) {
            this.inputs.push({
                name,
                reglas: reglasArray
            });
        } else {
            this.inputs.push({
                name,
                reglas: reglasArray
            });
        }

        // Si no hay reglas, no se hace nada
        const validarGrupo = () => {
            this.#validarInput(name, reglasArray, elementos);
        };

        // Reactividad
        if (this.opcionesValidacion.reactivo) { // Si la reactividad está habilitada, añade eventos de input, change y blur
            elementos.forEach(el => { // Añade los eventos a todos los elementos del grupo
                el.addEventListener("input", validarGrupo); //Eventos para validar al escribir
                el.addEventListener("change", validarGrupo); //Eventos para validar al cambiar el valor
                el.addEventListener("blur", validarGrupo); //Eventos para validar al perder el foco
            });
        }

        return this; // Retorna la instancia del validador para encadenar métodos
    }

    // Método privado que adapta funciones puras
    regla(fn, ...args) {
        return (valor) => {
            return fn(valor, ...args);
        };
    }


   #validarInput(name, reglas, elementos) {
        this.errores = this.errores.filter(e => e.name !== name); // Limpiar errores previos

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

        let esValido = true;

        for (const [fn, mensaje] of reglas) {
            if (!fn(valor)) {
                elementos.forEach(el => {
                    el.classList.add(this.opcionesValidacion.inputError);
                    el.classList.remove(this.opcionesValidacion.inputExito);
                });
                this.mostrarMensajeJuntoAInput(name, mensaje, this.opcionesValidacion.mensajeError);
                this.errores.push({ name, mensaje });
                esValido = false;
            }
        }

        if (esValido) {
            elementos.forEach(el => {
                el.classList.remove(this.opcionesValidacion.inputError);
                el.classList.add(this.opcionesValidacion.inputExito);
            });
            this.mostrarMensajeJuntoAInput(name, "", this.opcionesValidacion.mensajeExito);
            this.mostrarMensajeExitoEnInput?.(name); // por si existe
        }

        return esValido;
    }



    /**
     * Muestra los errores de validación según el tipo de salida configurado.
     * @returns {void|Array<string>}
     */
    mostrarErrores() {
        switch (this.tipoSalida) {
            case "consola":
            case "console":
                this.errores.forEach(({
                    mensaje
                }) => console.warn(mensaje));
                break;

            case "alerta":
            case "alert":
                alert(this.errores.map(e => e.mensaje).join("\n"));
                break;

            case "html":
                if (this.opcionesValidacion.contenedorMsg) { // Si se ha configurado un contenedor para los mensajes de error
                    const contenedor = document.getElementById(this.opcionesValidacion.contenedorMsg);
                    if (contenedor) {
                        contenedor.innerHTML = this.errores.map(({ // Muestra los mensajes de error en el contenedor HTML
                            mensaje
                        }) => {
                            return `<div class="${this.opcionesValidacion.mensajeError}">${mensaje}</div>`; // Crea un div para cada mensaje de error
                        }).join("");
                    }
                }
                break;

            case "inputs":
            case "input":
                this.errores.forEach(({
                    name,
                    mensaje
                }) => {
                    this.mostrarMensajeJuntoAInput(name, mensaje, this.opcionesValidacion.mensajeError); // Muestra el mensaje de error al lado del input correspondiente
                });
                break;

            case "arreglo":
            case "array":
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
    mostrarMensajeJuntoAInput(name, mensaje, clase = "div-error") {
        const input = document.querySelector(`[name="${name}"]`);
        if (!input) return;

        // 1. Quitar clase de éxito y poner clase de error
        input.classList.remove(this.opcionesValidacion.inputExito);
        input.classList.add(this.opcionesValidacion.inputError);

        // 2. Buscar el contenedor de mensaje (por ID)
        const contenedor = document.getElementById("error-" + name);
        if (!contenedor) return;

        contenedor.className = clase;
        contenedor.textContent = mensaje;
    }

    mostrarMensajeExitoEnInput(name) {
        const input = document.querySelector(`[name="${name}"]`);
        if (!input) return;

        input.classList.remove(this.opcionesValidacion.inputError);
        input.classList.add(this.opcionesValidacion.inputExito);

        const contenedor = document.getElementById("error-" + name);
        if (contenedor) {
            contenedor.className = this.opcionesValidacion.mensajeExito;
            contenedor.textContent = "";
        }
    }


    /**
     * Ejecuta todas las validaciones registradas y devuelve si hay errores.
     * @returns {boolean} true si no hay errores, false si hay errores.
     */
    valida() {
        this.errores = [];

        for (const input of this.inputs) {
            const elementos = getElementosPorName(input.name);
            this.#validarInput(input.name, input.reglas, elementos);
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
        });
        // Elimina clases de éxito y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.inputExito).forEach(el => {
            el.classList.remove(this.opcionesValidacion.inputExito);
        });
        // Elimina contenedores de error y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.mensajeError).forEach(el => {
            el.classList.remove(this.opcionesValidacion.mensajeError);
            el.textContent = "";
        });
        // Elimina contenedores de éxito (si existieran) y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.mensajeExito).forEach(el => {
            el.classList.remove(this.opcionesValidacion.mensajeExito);
            el.textContent = "";
        });
        return this;
    }
}