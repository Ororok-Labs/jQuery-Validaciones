import {
    getElementoPorId,
    getElementosPorName
} from '../fx/utils/selectores.js';
import * as Formulario from '../fx/form/formulario.js';

/**
 * Validador.js
 * Clase para validar inputs de formularios con diferentes tipos de salida.
 * Soporta validaciones personalizadas, mensajes de error y éxito, y diferentes configuraciones de visualización.
 */
export class Validador {
    constructor(formulario = "form", tipoSalida = "inputs", opcionesValidacion = {}) {
        this.errores = [];
        this.inputs = [];
        this.reglasPorCampo = [];
        this.#configuracion(formulario, tipoSalida, opcionesValidacion);
    }

    #configuracion(formulario, tipoSalida, opcionesValidacion) {
        this.formulario = formulario;
        this.tipoSalida = this.#definirTipoSalida(tipoSalida);
        this.opcionesValidacion = {
            //REACTIVIDAD al validar inputs
            reactivo: opcionesValidacion.reactivo !== false, //true = se valida al escribir, false = se valida al enviar el formulario.

            //CLASSES CSS para inputs al validar
            cssInputError: opcionesValidacion.cssInputError || "input-error", //Clase css que se le dará al input en caso de error.
            cssInputExito: opcionesValidacion.cssInputExito || "input-exito", //Clase css que se le dará al input en caso de éxito.

            //CONTENEDOR DE MENSAJES DE VALIDACIÓN
            //En caso de mostrar errores en inputs, se usa "error-{name del input}" como id del contenedor (Ej: span al lado del input).
            //En caso de mostrar errores en HTML, se usa el id del contenedor (Ej: ventana modal con mensajes).
            contenedorMsg: opcionesValidacion.contenedorMsg,
            cssMensajeError: opcionesValidacion.cssMensajeError || "msg-error", //Clase css que se le dará al contenedor de error.
            cssMensajeExito: opcionesValidacion.cssMensajeExito || "msg-exito", //Clase css que se le dará al contenedor de éxito.

            //FORMULARIO
            autoIniciar: opcionesValidacion.autoIniciar !== false, //guarda los valores iniciales del formulario al iniciar el validador, true = se guarda, false = no se guarda.
            protegerSalida: opcionesValidacion.protegerSalida !== false, //true = se protege la salida del formulario si no está guardado, false = no se protege.
        };

        this.#ejecutarOpcionesAdicionales(this.opcionesValidacion);
    }

    #ejecutarOpcionesAdicionales(opcionesValidacion) {
        if (opcionesValidacion.autoIniciar) Formulario.iniciar(this.formulario); // Inicia el formulario para guardar los valores iniciales
        if (opcionesValidacion.protegerSalida) Formulario.saliendoSinGuardar(this.formulario); // Protege la salida del formulario si no está guardado
    }

    /**
     * Se usa para definir el tipo de salida del validador.
     * @param {string} tipo
     * @returns {string}
     * @throws {Error} Si el tipo de salida no está definido.
     */
    #definirTipoSalida(tipo) {
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
        this.reglasPorCampo = this.reglasPorCampo || {};
        this.reglasPorCampo[name] = reglas;

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
            if (this.tipoSalida === "input" || this.tipoSalida === "inputs") {
                this.#validarInput(name, reglasArray, elementos, {
                    modo: "input"
                });
            } else {
                this.#validarInput(name, reglasArray, elementos, {
                    modo: "otros"
                });
            }
        };

        // Reactividad para validar inputs al escribir, cambiar o perder el foco
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
        return (elemento) => fn(elemento, ...args);
    }


    #validarInput(name, reglas, elementos, {
        modo = "otros",
        claseError = this.opcionesValidacion.cssMensajeError
    } = {}) {
        this.errores = this.errores.filter(e => e.name !== name);

        const valor = elementos[0];
        let erroresDeCampo = [];

        for (const [fn, mensaje] of reglas) {
            if (!fn(valor)) {
                erroresDeCampo.push(mensaje);
                if (modo === "otros") break; // Solo el primer error para "otros"
            }
        }

        if (erroresDeCampo.length > 0) {
            elementos.forEach(el => {
                el.classList.add(this.opcionesValidacion.cssInputError);
                el.classList.remove(this.opcionesValidacion.cssInputExito);
            });

            const mensajeFinal = (modo === "input") ? erroresDeCampo.map(msg => `<div>${msg}</div>`).join("") : erroresDeCampo[0];

            this.#actualizarInputEstado(name, {
                mensaje: mensajeFinal,
                esError: true,
                claseError
            });

            this.errores.push({
                name,
                mensaje: mensajeFinal
            });
            return false;
        }

        // Si no hay errores
        elementos.forEach(el => {
            el.classList.remove(this.opcionesValidacion.cssInputError);
            el.classList.add(this.opcionesValidacion.cssInputExito);
        });
        this.#actualizarInputEstado(name);

        return true;
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
                            return `<div class="${this.opcionesValidacion.cssMensajeError}">${mensaje}</div>`; // Crea un div para cada mensaje de error
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
                    this.#actualizarInputEstado(name, {
                        mensaje: mensaje,
                        esError: true,
                        claseError: this.opcionesValidacion.cssMensajeError
                    });
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


    #actualizarInputEstado(name, {
        mensaje = "",
        esError = false,
        claseError = "div-error"
    } = {}) {
        //Puede llegar un input solo o un grupo de inputs (radio, checkbox, select)
        const inputs = document.querySelector(`[name="${name}"]`);
        if (!inputs) return; //Debe tener name para poder actualizar el estado
        const grupo = document.querySelectorAll(`[name="${name}"]`);

        let opcionSeleccionada = null; //
        let inputVinculo = false; // Input vinculado al seleccionado, si existe (caso de innput texto vinculado a un radio o checkbox)
        let evitarValidar = false;

        if (inputs.type === "radio" || inputs.type === "checkbox") {
            // Si es un grupo, obtener el seleccionado
            grupo.forEach(el => {
                if (el.checked) opcionSeleccionada = el;
            });
        }

        if (opcionSeleccionada !== null) {
            const inputVinculado = opcionSeleccionada.getAttribute("data-vinculo");
            inputVinculo = inputVinculado ? document.getElementById(inputVinculado) : false;
        }

        if (!opcionSeleccionada) { //Caso input normal (no radio ni checkbox)
            inputs.classList.remove(this.opcionesValidacion.cssInputError, this.opcionesValidacion.cssInputExito);
            inputs.classList.add(esError ? this.opcionesValidacion.cssInputError : this.opcionesValidacion.cssInputExito);

            let padre = inputs.getAttribute("data-padre");
            if (padre !== null && !getElementoPorId(padre).checked) evitarValidar = true; // Si el input no está seleccionado, no se muestra error
        } else if (opcionSeleccionada && !inputVinculo) { //Caso radio o checkbox sin input vinculado
            inputs.classList.remove(this.opcionesValidacion.cssInputError, this.opcionesValidacion.cssInputExito);
            inputs.classList.add(esError ? this.opcionesValidacion.cssInputError : this.opcionesValidacion.cssInputExito);
        } else if (opcionSeleccionada && (inputVinculo instanceof HTMLInputElement || inputVinculo instanceof HTMLTextAreaElement)) { // Caso input vinculado con radio o checkbox seleccionado
            inputVinculo.classList.remove(this.opcionesValidacion.cssInputError, this.opcionesValidacion.cssInputExito);
            grupo.forEach(el => {
                el.classList.remove(this.opcionesValidacion.cssInputError, this.opcionesValidacion.cssInputExito);
            });
        }

        let contenedorError = document.getElementById(inputs.getAttribute("data-error"));
        if (!contenedorError) contenedorError = inputs;

        if (!evitarValidar) {
            if (esError) {
                contenedorError.className = claseError;
                contenedorError.innerHTML = mensaje;
                contenedorError.style.display = "block";
            } else {
                contenedorError.className = this.opcionesValidacion.cssMensajeExito;
                contenedorError.innerHTML = "";
                contenedorError.style.display = "none";
            }
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

            if (this.tipoSalida === "input" || this.tipoSalida === "inputs") this.#validarInput(input.name, input.reglas, elementos, {
                modo: "input"
            });
            else this.#validarInput(input.name, input.reglas, elementos, {
                modo: "otros"
            });
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
        document.querySelectorAll("." + this.opcionesValidacion.cssInputError).forEach(el => {
            el.classList.remove(this.opcionesValidacion.cssInputError);
        });
        // Elimina clases de éxito y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.cssInputExito).forEach(el => {
            el.classList.remove(this.opcionesValidacion.cssInputExito);
        });
        // Elimina contenedores de error y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.cssMensajeError).forEach(el => {
            el.classList.remove(this.opcionesValidacion.cssMensajeError);
            el.textContent = "";
        });
        // Elimina contenedores de éxito (si existieran) y limpia su contenido
        document.querySelectorAll("." + this.opcionesValidacion.cssMensajeExito).forEach(el => {
            el.classList.remove(this.opcionesValidacion.cssMensajeExito);
            el.textContent = "";
        });
        // Limpia los mensajes de error específicos de cada input
        const elementosError = document.querySelectorAll(`[id^="${prefijoError}"]`);
        elementosError.forEach(selector => {
            selector.innerHTML = ""; // Limpia el contenido HTML de los elementos de error
            selector.display = "none"; // Oculta los elementos de error
        });
        return this;
    }
}