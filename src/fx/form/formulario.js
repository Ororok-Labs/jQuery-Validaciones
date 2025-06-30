import {
    getElementoPorId,
    normalizarSelectores
} from '../utils/selectores.js';

/** @type {string} Valores iniciales del formulario para seguimiento de cambios */
let valoresIniciales = "";

/**
 * Obtiene los valores actuales de todos los inputs de un formulario.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @returns {string} Valores concatenados.
 * @example
 * ✅ Uso real:
 * const valores = OrorokJSFunciones.Funciones.Formulario.obtenerValores("#formLogin");
 * @example
 * 🛠️ Implementación interna:
 * function obtenerValores(selector) {
 *     const form = getElementoPorId(selector);
 *     const campos = form.querySelectorAll("input, select, textarea");
 *     return Array.from(campos).reduce((acc, el) => acc + (el.value || ""), "");
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * function obtenerValores(formSelector) {
 *     const $form = $(formSelector);
 *     if (!$form.length) return "";
 *
 *     return $form.find("input, select, textarea").get().reduce((acc, el) => {
 *         const value = $(el).val() || "";
 *         return acc + value;
 *     }, "");
 * }
 * @example
 * 💡 Equivalente en jQuery sin función contenedora:
 * $("#formLogin").find("input, select, textarea").map((i, el) => $(el).val()).get().join("")
 */
export function obtenerValores(selector) {
    const form = getElementoPorId(selector);
    const campos = form.querySelectorAll("input, select, textarea");
    return Array.from(campos).reduce((acc, el) => acc + (el.value || ""), "");
}

/**
 * Guarda los valores iniciales del formulario para luego detectar cambios.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @example
 * OrorokJSFunciones.Funciones.Formulario.iniciar("formPerfil");
 * OrorokJSFunciones.Funciones.Formulario.iniciar("#formLogin");
 * OrorokJSFunciones.Funciones.Formulario.iniciar(document.getElementById("form1"));
 */
export function iniciar(selector) {
    valoresIniciales = obtenerValores(selector);
}

/**
 * Verifica si los valores actuales del formulario han cambiado respecto a los iniciales.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @returns {boolean} True si hubo cambios.
 * @example
 * const conCambios = OrorokJSFunciones.Funciones.Formulario.validaCambios("#formLogin");
 * if(conCambios) alert("El formulario ha cambiado");
 */
export function validaCambios(selector) {
    const valoresActuales = obtenerValores(selector);
    return valoresActuales !== valoresIniciales;
}

/**
 * Restablece los valores iniciales al estado actual del formulario.
 * @param {string|HTMLElement} selector - Selector CSS o elemento.
 * @example
 * OrorokJSFunciones.Funciones.Formulario.reset("formPerfil");
 * OrorokJSFunciones.Funciones.Formulario.reset("#formLogin");
 * OrorokJSFunciones.Funciones.Formulario.reset(document.getElementById("form1"));
 */
export function reset(selector) {
    valoresIniciales = obtenerValores(selector);
}

/**
 * Ejecuta detección de cambios en tiempo real en un formulario usando eventos `input` y `change`.
 * @note
 * Esta función permite reaccionar a cualquier cambio en el formulario,
 * útil para validar si hay campos modificados o activar botones dinámicamente.
 * Requiere que previamente hayas llamado a `iniciar(selector)` para guardar los valores iniciales.
 * @param {string|HTMLElement} selector - Selector CSS del formulario o elemento formulario directo.
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Formulario.iniciar("#formLogin");
 * OrorokJSFunciones.Funciones.Formulario.cambiosEnTiempoReal("#formLogin");
 *
 * OrorokJSFunciones.Funciones.Formulario.iniciar(document.getElementById("form1"));
 * OrorokJSFunciones.Funciones.Formulario.cambiosEnTiempoReal(document.getElementById("form1"));
 *
 * @example
 * 🛠️ Implementación interna:
 * function cambiosEnTiempoReal(selector) {
 *     const form = getElementoPorId(selector);
 *     form.addEventListener("input", () => validaCambios(form));
 *     form.addEventListener("change", () => validaCambios(form));
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const cambiosEnTiempoReal = (selector) => {
 *     const $form = typeof selector === "string" ? $(selector) : $(selector);
 *     $form.on("input change", () => {
 *         const huboCambios = OrorokJSFunciones.Funciones.Formulario.validaCambios($form[0]);
 *         console.log(\"Cambios detectados:\", huboCambios);
 *     });
 * };
 */
export function cambiosEnTiempoReal(selector) {
    const form = getElementoPorId(selector);
    form.addEventListener("input", () => validaCambios(form));
    form.addEventListener("change", () => validaCambios(form));
}



/**
 * Detecta cambios en todos los inputs, textareas y selects de un formulario.
 * @param {string|HTMLElement} selector - Selector CSS o elemento del formulario.
 * @param {function} callback - Función a ejecutar cuando un campo cambia. Recibe el elemento como argumento.
 */
export function detectarCambiosInputs(selector, callback) {
    const form = getElementoPorId(selector);
    const campos = form.querySelectorAll('input, textarea, select');
    campos.forEach(campo => {
        campo.addEventListener('input', () => callback(campo));
        campo.addEventListener('change', () => callback(campo));
    });
}


/**
 * Activa una advertencia al usuario si intenta salir de la página con cambios no guardados en un formulario.
 * @note
 * Esta función es ideal para prevenir pérdidas accidentales de datos, por ejemplo en formularios largos o sensibles.
 * Solo funcionará correctamente si antes llamaste a `iniciar(selector)` para registrar el estado inicial del formulario.
 * @param {string|HTMLElement} selector - Selector CSS del formulario o elemento formulario directo.
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Formulario.iniciar("formPublicacion");
 * OrorokJSFunciones.Funciones.Formulario.saliendoSinGuardar("formPublicacion");
 *
 * OrorokJSFunciones.Funciones.Formulario.iniciar("#formPublicacion");
 * OrorokJSFunciones.Funciones.Formulario.saliendoSinGuardar("#formPublicacion");
 *
 * OrorokJSFunciones.Funciones.Formulario.iniciar(document.getElementById("formPublicacion"));
 * OrorokJSFunciones.Funciones.Formulario.saliendoSinGuardar(document.getElementById("formPublicacion"));
 * @example
 * 🛠️ Implementación interna:
 * function saliendoSinGuardar(selector) {
 *     const form = getElementoPorId(selector);
 *     window.addEventListener("beforeunload", (e) => {
 *         if (validaCambios(form)) {
 *             e.preventDefault();
 *             e.returnValue = "";
 *         }
 *     });
 * }
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const saliendoSinGuardar = (selector) => {
 *     const $form = typeof selector === "string" ? $("#" + selector) : $(selector);
 *     window.addEventListener("beforeunload", (e) => {
 *         const huboCambios = OrorokJSFunciones.Funciones.Formulario.validaCambios($form[0]);
 *         if (huboCambios) {
 *             e.preventDefault();
 *             e.returnValue = "";
 *         }
 *     });
 * };
 */
export function saliendoSinGuardar(selector) {
    const form = getElementoPorId(selector);
    window.addEventListener("beforeunload", (e) => {
        if (validaCambios(form)) {
            e.preventDefault();
            e.returnValue = "";
        }
    });
}

/**
 * Valida si todos los campos requeridos de un formulario están completos (no vacíos).
 * @note
 * Esta función es útil para saber si un formulario está listo para enviarse,
 * incluso si no se ha presionado el botón "submit". Se basa en un selector de campos requeridos.
 * Por defecto, busca `.requerido` y `[required]`, pero puedes personalizarlo.
 *
 * @param {string|HTMLElement} form - ID del formulario (con o sin `#`) o elemento `form` directo.
 * @param {string} [selector='.requerido, [required]'] - Selector CSS para los campos obligatorios a revisar.
 * @returns {boolean} `true` si **todos** los campos requeridos tienen valor, `false` si al menos uno está vacío.
 *
 * @example
 * ✅ Uso real:
 * const listo = OrorokJSFunciones.Funciones.Formulario.completado("formLogin");
 * if (!listo) alert("Faltan campos por completar");
 *
 * const ok = OrorokJSFunciones.Funciones.Formulario.completado(document.getElementById("formPerfil"));
 *
 * @example
 * 🛠️ Implementación interna:
 * function completado(form, selector = ".requerido, [required]") {
 *     const elForm = getElementoPorId(form);
 *     const campos = elForm.querySelectorAll(selector);
 *     return Array.from(campos).every(el => el.value && el.value.toString().trim() !== "");
 * }
 *
 * @example
 * 💡 Equivalente en jQuery con arrow function:
 * const completado = (form, selector = ".requerido, [required]") => {
 *     const $form = typeof form === "string" ? $("#" + form) : $(form);
 *     return $form.find(selector).toArray().every(el => $(el).val().trim() !== "");
 * };
 */
export function completado(form, selector = '.requerido, [required]') {
    const elForm = getElementoPorId(form);
    const campos = elForm.querySelectorAll(selector);
    return Array.from(campos).every(el => el.value && el.value.toString().trim() !== "");
}


/**
 * Limpia todos los campos de un formulario: textos, selects, checkboxes y radios.
 * @note
 * Esta función no hace `.reset()`, sino que **borra manualmente** el contenido de cada campo,
 * permitiendo más control. Se puede desmarcar checkboxes con `.click()` y establecer un valor por defecto para radios.
 * @param {string|HTMLElement} selector - ID del formulario (con o sin `#`) o el formulario como elemento directo.
 * @param {boolean} [presionandoCheckboxs=false] - Si es `true`, desmarca checkboxes simulando `click`, útil si hay lógica asociada al evento.
 * @param {string|number} [valorRadioButtonsPorDefecto=0] - Valor a dejar seleccionado en los radios. Si no se encuentra ese valor, todos quedan sin marcar.
 * @returns {void}
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Formulario.limpiar("formPublicacion");
 * OrorokJSFunciones.Funciones.Formulario.limpiar("#formEdicion", true);
 * OrorokJSFunciones.Funciones.Formulario.limpiar(document.getElementById("formLogin"), true, 1);
 * @example
 * 🛠️ Implementación interna:
 * function limpiar(selector, presionandoCheckboxs = false, valorRadioButtonsPorDefecto = 0) {
 *     const form = getElementoPorId(selector);
 *     if (!form || form.tagName !== "FORM") {
 *         throw new Error("El elemento no es un formulario válido");
 *     }
 *     limpiarInputsDeContenedor(form, presionandoCheckboxs, valorRadioButtonsPorDefecto);
 * }
 * @example
 * 💡 Equivalente en jQuery:
 * const limpiar = (selector) => {
 *     const $form = typeof selector === "string" ? $("#" + selector.replace(/^#/, "")) : $(selector);
 *     $form[0].reset();
 * };
 */
export function limpiar(selector, presionandoCheckboxs = false, valorRadioButtonsPorDefecto = 0) {
    const form = getElementoPorId(selector);
    if (!form || form.tagName !== "FORM") {
        throw new Error("El elemento no es un formulario válido o no existe.");
    }
    limpiarInputsDeContenedor(form, presionandoCheckboxs, valorRadioButtonsPorDefecto);
}


/**
 * Limpia **todos los campos de entrada** dentro de un contenedor: inputs, textareas, selects, radios y checkboxes.
 * @note
 * Esta función es más flexible que un `.reset()`, ya que **funciona sobre cualquier contenedor**, no solo formularios.
 * Se puede usar en formularios parciales, diálogos modales o secciones específicas de una vista.
 *
 * - Borra textos y textareas (`input`, `textarea`).
 * - Reinicia selects al primer `<option>`.
 * - Desmarca todos los radios, y luego selecciona el radio con valor coincidente al parámetro `valorRadioButtonsPorDefecto` (si existe).
 * - Desmarca checkboxes con `.click()` si `presionandoCheckboxs` es `true`, útil si hay lógica asociada al evento.
 *
 * @param {string|HTMLElement} selector - Selector CSS o contenedor directo (`form`, `div`, `section`, etc.).
 * @param {boolean} [presionandoCheckboxs=false] - Si es `true`, desmarca checkboxes con `.click()` (en lugar de solo cambiar `.checked`).
 * @param {string|number} [valorRadioButtonsPorDefecto=0] - Valor a marcar por defecto entre los radios. Si no existe, se marcará el primero del grupo.
 * @returns {void}
 *
 * @example
 * ✅ Uso real:
 * OrorokJSFunciones.Funciones.Formulario.limpiarInputsDeContenedor("#modalContacto");
 * OrorokJSFunciones.Funciones.Formulario.limpiarInputsDeContenedor(document.getElementById("formEdicion"), true);
 * OrorokJSFunciones.Funciones.Formulario.limpiarInputsDeContenedor("formBlog", true, "si");
 *
 * @example
 * 🛠️ Implementación interna:
 * function limpiarInputsDeContenedor(selector, presionandoCheckboxs = false, valorRadioButtonsPorDefecto = false) {
 *     const contenedor = getElementoPorId(selector);
 *     contenedor.querySelectorAll("input:not([type=radio]):not([type=checkbox]), textarea").forEach(el => el.value = "");
 *     contenedor.querySelectorAll("select").forEach(select => {
 *         const firstOption = select.querySelector("option");
 *         select.value = firstOption?.value || "";
 *     });
 *     contenedor.querySelectorAll("input[type=radio]").forEach(r => r.checked = false);
 *     const radiosAgrupados = new Set();
 *     contenedor.querySelectorAll("input[type=radio]").forEach(r => { if (r.name) radiosAgrupados.add(r.name); });
 *     radiosAgrupados.forEach(name => {
 *         const radios = contenedor.querySelectorAll(`input[name='${name}'][type=radio]`);
 *         const match = Array.from(radios).find(r => r.value == valorRadioButtonsPorDefecto);
 *         (match || radios[0])?.click();
 *     });
 *     contenedor.querySelectorAll("input[type=checkbox]").forEach(chk => {
 *         if (presionandoCheckboxs && chk.checked) chk.click();
 *         else chk.checked = false;
 *     });
 * }
 *
 * @example
 * 💡 Equivalente en jQuery (sin lógica avanzada):
 * const $c = $("#formLogin");
 * $c.find("input, textarea").val("");
 * $c.find("input[type=checkbox], input[type=radio]").prop("checked", false);
 * $c.find("select").prop("selectedIndex", 0);
 */
export function limpiarInputsDeContenedor(selector, presionandoCheckboxs = false, valorRadioButtonsPorDefecto = false) {
    const contenedor = getElementoPorId(selector);
    contenedor.querySelectorAll("input:not([type=radio]):not([type=checkbox]), textarea").forEach(el => el.value = "");

    contenedor.querySelectorAll("select").forEach(select => {
        const firstOption = select.querySelector("option");
        select.value = firstOption?.value || "";
    });

    contenedor.querySelectorAll("input[type=radio]").forEach(r => r.checked = false);

    const radiosAgrupados = new Set();
    contenedor.querySelectorAll("input[type=radio]").forEach(r => {
        if (r.name) radiosAgrupados.add(r.name);
    });

    if (valorRadioButtonsPorDefecto != false) {
        radiosAgrupados.forEach(name => {
            const radios = contenedor.querySelectorAll(`input[name='${name}'][type=radio]`);
            const match = Array.from(radios).find(r => r.value == valorRadioButtonsPorDefecto);
            (match || radios[0])?.click();
        });
    }

    contenedor.querySelectorAll("input[type=checkbox]").forEach(chk => {
        if (presionandoCheckboxs && chk.checked) chk.click();
        else chk.checked = false;
    });
}


/**
 * Aplica o elimina la propiedad "disabled" a inputs dentro de un contenedor.
 * @param {string|string[]|HTMLElement|NodeList} selectores - Selectores CSS o elementos.
 * @param {boolean} bloquear - Si es true, desactiva; si false, activa.
 */
function alternarEstadoInputs(selectores, bloquear = true) {
    const lista = normalizarSelectores(selectores);
    lista.forEach(el => {
        el.querySelectorAll("input, select, textarea").forEach(input => input.disabled = bloquear);
    });
}



/**
 * Bloquea todos los inputs dentro de uno o varios contenedores.
 * @param {string | string[] | HTMLElement | NodeList} selectores - Zona(s) a bloquear: selector, nodo o conjunto.
 * @example
 * bloquearContenedor("#formulario");
 * bloquearContenedor(["#form1", "#form2"]);
 * bloquearContenedor(document.querySelectorAll(".bloqueable"));
 * bloquearContenedor(document.getElementById("miContenedor"));
 */
export function bloquearContenedor(selectores) {
    alternarEstadoInputs(selectores, true);
}

/**
 * Desbloquea todos los inputs dentro de uno o varios contenedores.
 * @param {string | string[] | HTMLElement | NodeList} selectores - Zona(s) a desbloquear.
 * @example
 * desbloquearContenedor(".bloqueado");
 * desbloquearContenedor(["#form1", "#form2"]);
 * desbloquearContenedor(document.querySelectorAll(".editable"));
 * desbloquearContenedor(document.getElementById("miContenedor"));
 */
export function desbloquearContenedor(selectores) {
    alternarEstadoInputs(selectores, false);
}

/**
 * Bloquea inputs individuales usando un atributo específico.
 *
 * Aplica `disabled`, `readonly` u otros atributos que limiten la interacción directa con los campos.
 * @param {string | string[] | HTMLElement | NodeList} selectores - Inputs objetivo.
 * @param {string} [tipo="disabled"] - Atributo de bloqueo a usar.
 * @example
 * bloquearInputs(".campo", "readonly");
 * bloquearInputs(["#nombre", "#apellido"], "disabled");
 * bloquearInputs(document.querySelectorAll("input[type=text]"), "readonly");
 * bloquearInputs(document.getElementById("formulario"), "disabled");
 */
export function bloquearInputs(selectores, tipo = "disabled") {
    normalizarSelectores(selectores).forEach(el => el.setAttribute(tipo, true));
}

/**
 * Elimina el atributo de bloqueo en los inputs seleccionados.
 *
 * Rehabilita campos al eliminar atributos como `disabled` o `readonly`.
 * @param {string | string[] | HTMLElement | NodeList} selectores - Inputs objetivo.
 * @param {string} [tipo="disabled"] - Atributo a eliminar.
 * @example
 * desbloquearInputs("#telefono", "readonly");
 * desbloquearInputs(["#email", "#direccion"], "disabled");
 * desbloquearInputs(document.querySelectorAll("input[type=number]"), "readonly");
 * desbloquearInputs(document.getElementById("formulario"), "disabled");
 */
export function desbloquearInputs(selectores, tipo = "disabled") {
    normalizarSelectores(selectores).forEach(el => el.removeAttribute(tipo));
}

/**
 * Marca inputs como requeridos (`required = true`).
 * @param {string | string[] | HTMLElement | NodeList} selectores - Inputs a validar.
 * @example
 * requerirInputs(["#rut", "#email"]);
 * requerirInputs(".obligatorio");
 * requerirInputs(document.querySelectorAll("input[type=text]"));
 * requerirInputs(document.getElementById("formulario"));
 */
export function requerirInputs(selectores) {
    normalizarSelectores(selectores).forEach(el => el.required = true);
}

/**
 * Elimina la condición de obligatorio (`required = false`) de los inputs seleccionados.
 * @param {string | string[] | HTMLElement | NodeList} selectores - Inputs objetivo.
 * @example
 * desrequerirInputs(".opcional");
 * desrequerirInputs(["#telefono", "#direccion"]);
 * desrequerirInputs(document.querySelectorAll("input[type=email]"));
 * desrequerirInputs(document.getElementById("formulario"));
 */
export function desrequerirInputs(selectores) {
    normalizarSelectores(selectores).forEach(el => el.required = false);
}

/**
 * Quita clases de los inputs de un formulario y agrega otras nuevas.
 * @param {string} selector Selector CSS del formulario o elemento.
 * @param {array} clasesAEliminar Clases a eliminar de los inputs.
 * @param {array} clasesAAgregar Clases a agregar a los inputs. //Opcional
 * @param {string} prefijoError Prefijo del id de todos los elementos que muestran mensajes, para ocultarlos. //Opcional
 * @example
 * resetearClasesYErrores("#formulario", ["error", "invalid"], ["nueva-clase"]);
 * resetearClasesYErrores("formulario", ["error"], ["valid", "highlight"]);
 * resetearClasesYErrores(document.getElementById("formulario"), ["error", "invalid"], "error-");
 */
export function resetearClasesYErrores(selector, clasesAEliminar = [], clasesAAgregar = [], prefijoError = "error-") {
    const elemento = getElementoPorId(selector);
    const inputs = elemento.querySelectorAll('input, textarea, select');
    const elementosError = document.querySelectorAll(`[id^="${prefijoError}"]`);

    // Eliminar clases especificadas
    inputs.forEach(campo => {
        // Eliminar clases especificadas
        clasesAEliminar.forEach(clase => campo.classList.remove(clase));
        // Agregar nuevas clases
        clasesAAgregar.forEach(clase => campo.classList.add(clase));
    });

    elementosError.forEach(selector => {
        selector.innerHTML = ""; // Limpia el contenido HTML de los elementos de error
        selector.display = "none"; // Oculta los elementos de error
    });
}