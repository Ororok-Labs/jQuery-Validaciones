export class Formulario {

    /** @type {string} Valores iniciales del formulario para seguimiento de cambios */
    static valoresIniciales = "";
    /** @type {Formulario} Instancia con patrón singleton */
    static #instancia;

    constructor() {
        if (Formulario.#instancia) {
            return Formulario.#instancia;
        }

        // Inicialización normal si no existe aún
        Formulario.#instancia = this;
    }

    /**
     * Obtiene los valores actuales de todos los inputs de un formulario.
     * @param {string} formSelector - Selector del formulario ("#form").
     * @returns {string} - Valores concatenados.
     */
    static obtenerValores(formSelector) {
        const $form = $(formSelector);
        if (!$form.length) return "";

        return $form.find("input, select, textarea").get().reduce((acc, el) => {
            const value = $(el).val() || "";
            return acc + value;
        }, "");
    }

    /**
     * Inicializa el tracker guardando los valores iniciales.
     * @param {string} formSelector - Selector del formulario.
     */
    static iniciar(formSelector) {
        this.valoresIniciales = this.obtenerValores(formSelector);
    }

    /**
     * Verifica si los valores actuales difieren de los iniciales.
     * @param {string} formSelector - Selector del formulario.
     * @returns {boolean} - True si hubo cambios.
     */
    static validaCambios(formSelector) {
        const valoresActuales = this.obtenerValores(formSelector);
        return valoresActuales !== this.valoresIniciales;
    }

    /**
     * Restablece el tracker a los valores actuales.
     * @param {string} formSelector - Selector del formulario.
     */
    static reset(formSelector) {
        this.valoresIniciales = this.obtenerValores(formSelector);
    }

    /**
     * Ejecuta detección de cambios en tiempo real con eventos input y change.
     * (No hace nada visible, útil para extender lógicas personalizadas).
     * @param {string} idFormulario - ID del formulario (sin #).
     * @example
     * Formulario.cambiosEnTiempoReal("formPerfil");
     */
    static cambiosEnTiempoReal(idFormulario) {
        $(`#${idFormulario}`).on("input change", () => {
            if (Formulario.validaCambios(`#${idFormulario}`)) {
                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * Retorna true o false al cerrar la pestaña si hay cambios no guardados.
     * @param {string} idFormulario - ID del formulario (sin #).
     * @example
     * Formulario.saliendoSinGuardar("formPublicacion");
     */
    static saliendoSinGuardar(idFormulario) {
        window.addEventListener("beforeunload", (e) => {
            if (Formulario.validaCambios(`#${idFormulario}`)) {
                e.preventDefault();
                return true;
            } else {
                return false;
            }
        });

    }



    /**
     * Valida que todos los campos requeridos de un formulario tengan valor.
     * Busca por clase personalizada o por atributo required.
     * @param {jQuery} $form - Formulario a validar.
     * @param {string} [selector='.requerido, [required]'] - Selector de campos requeridos.
     * @returns {boolean} True si todos tienen valor, false si no.
     * @example
     * // Por defecto, valida todos los campos con atributo required
     * Funciones.formulario.completado($form);
     * @example
     * // Valida todos los campos con clase .obligatorio
     * Funciones.formulario.completado($form, '.obligatorio');
     */
    static completado = ($form, selector = '.requerido, [required]') =>
        $form.find(selector).toArray().every(el => $(el).val() && $(el).val().toString().trim() !== "");


    /**
     * Limpia todos los inputs de un formulario identificado por ID.
     * Versión estricta de limpiarInputsDeContenedor que solo acepta IDs de formularios.
     * @param {string} id - ID del formulario (debe empezar con '#', ej: '#miForm' o 'miForm').
     * @param {boolean|string} [presionandoCheckboxs=false] - Si es true, desmarca checkboxes con .click().
     * @param {number|string} [valorRadioButtonsPorDefecto=0] - Valor para seleccionar en radios (por grupo).
     * @throws {Error} Si el ID no es válido o no referencia un formulario.
     * @returns {void}
     * @example
     * // Limpia el formulario con ID 'formLogin' y desmarca checkboxes con click
     * Funciones.limpiar("formLogin", true);
     * @example
     * // Limpia el mismo formulario estableciendo valor por defecto 1 en radios
     * Funciones.limpiar("formLogin", false, 1);
     */
    static limpiar(id, presionandoCheckboxs = false, valorRadioButtonsPorDefecto = 0) {
        // Validación del ID
        if (typeof id !== 'string' || !id.match(/^#?[a-zA-Z][\w-]*$/)) {
            throw new Error("El ID debe ser un string válido (ej: 'miForm' o '#miForm')");
        }

        // Asegurar que el ID tenga el #
        const idFormateado = id.startsWith('#') ? id : `#${id}`;
        const $form = $(idFormateado);

        // Validar que sea un formulario
        if (!$form.length || !$form.is('form')) {
            throw new Error(`El elemento ${idFormateado} no es un formulario o no existe`);
        }

        limpiarInputsDeContenedor($form, presionandoCheckboxs, valorRadioButtonsPorDefecto);
    }

    /**
     * Limpia todos los inputs, selects, radios y checkboxes de un contenedor.
     * Úsese para un form o un div que agrupe inputs dentro de un form.
     * Soporta cualquier selector jQuery (ID, clase, atributo) u objeto jQuery directamente.
     * @param {string|jQuery} contenedor - Selector (string) u objeto jQuery del contenedor.
     * @param {boolean|string} [presionandoCheckboxs=false] - Si es true, desmarca checkboxes con .click().
     * @param {number|string} [valorRadioButtonsPorDefecto=0] - Valor para seleccionar en radios (por grupo).
     * @returns {void}
     * @example
     * // Limpia por ID (string) y desmarca checkboxes con click
     * Funciones.limpiarInputsDeContenedor("#miFormulario", true);
     * @example
     * // Limpia por objeto jQuery y establece valor por defecto en radios
     * Funciones.limpiarInputsDeContenedor($(".formulario"), false, 1);
     */
    static limpiarInputsDeContenedor(contenedor, presionandoCheckboxs = false, valorRadioButtonsPorDefecto = 0) {
        // Convertir el contenedor a objeto jQuery (soporta cualquier selector: "#id", ".clase", "[name=...]", etc.)
        const $contenedor = typeof contenedor === "string" ? $(contenedor) : contenedor;

        // Validar que el contenedor exista en el DOM
        if (!$contenedor.length) {
            console.warn("Contenedor no encontrado:", contenedor);
            return;
        }

        // Limpiar inputs normales (text, number, email, etc.)
        $contenedor.find("input").not('[type=radio], [type=checkbox]').val("");

        // Resetear selects (seleccionar primera opción válida)
        $contenedor.find("select").each(function () {
            const $select = $(this);
            const primeraOpcionValida = $select.find("option").first().val();
            $select.val(primeraOpcionValida || "");
        });

        // Desmarcar todos los radio buttons inicialmente
        $contenedor.find("input[type=radio]").prop("checked", false);

        // Extraer valor por defecto si viene en formato especial (legacy support)
        if (typeof valorRadioButtonsPorDefecto === "string" &&
            valorRadioButtonsPorDefecto.includes("valor de radiobuttons por defecto:")) {
            valorRadioButtonsPorDefecto = valorRadioButtonsPorDefecto.split(":")[1].trim();
        }

        // Seleccionar radios por defecto en CADA GRUPO (por nombre)
        const radioGroups = new Set();
        $contenedor.find("input[type=radio]").each(function () {
            const name = $(this).attr("name");
            if (name) radioGroups.add(name); // Ignora radios sin nombre
        });

        radioGroups.forEach(groupName => {
            const $radioDefecto = $contenedor.find(`input[name="${groupName}"][value="${valorRadioButtonsPorDefecto}"]`);
            if ($radioDefecto.length) {
                $radioDefecto.prop("checked", true);
            } else {
                // Si no existe el valor por defecto, selecciona el primer radio del grupo
                $contenedor.find(`input[name="${groupName}"]`).first().prop("checked", true);
            }
        });

        // Manejo de checkboxes
        const $checkboxes = $contenedor.find("input[type=checkbox]");
        if (presionandoCheckboxs === true || presionandoCheckboxs === "presionando checkboxs") {
            $checkboxes.each(function () {
                if (this.checked) $(this).trigger("click"); // Usar trigger() en lugar de click() nativo
            });
        } else {
            $checkboxes.prop("checked", false);
        }
    }



    #alternarEstadoInputs(selectores, bloquear = true) {
        const estado = !!bloquear;
        const lista = typeof selectores === 'string' ?
            selectores.split(',').map(sel => sel.trim()) :
            Array.isArray(selectores) ?
            selectores : [selectores];

        lista.forEach(sel => {
            $(sel).find('input, select, textarea').each(function () {
                $(this).prop('disabled', estado);
            });
        });
    }


    #normalizarSelectores(selectores) {
        if (selectores instanceof jQuery) {
            return selectores;
        } else if (typeof selectores === 'string') {
            return $(selectores.split(',').map(sel => sel.trim()).join(', '));
        } else if (Array.isArray(selectores)) {
            return $(selectores.join(', '));
        } else if (selectores instanceof HTMLElement) {
            return $(selectores);
        } else {
            return $(String(selectores));
        }
    }

    /**
     * Bloquea todos los inputs dentro de contenedores usando selectores.
     * @param {string|string[]|jQuery} selectores - Uno o varios selectores CSS o jQuery.
     * @example
     * Formulario.bloquearContenedor("#form1, .bloqueable");
     */
    static bloquearContenedor(selectores) {
        const Form = new Formulario();
        Form.#alternarEstadoInputs(selectores, true);
    }

    /**
     * Desbloquea todos los inputs dentro de contenedores usando selectores.
     * @param {string|string[]|jQuery} selectores - Uno o varios selectores CSS o jQuery.
     * @example
     * Formulario.desbloquearContenedor(["#form1", ".zonaActiva"]);
     */
    static desbloquearContenedor(selectores) {
        const Form = new Formulario();
        Form.#alternarEstadoInputs(selectores, false);
    }


    /**
     * Bloquea inputs individuales (text, select, etc.) usando selectores.
     * @param {string|string[]|jQuery} selectores - Selectores CSS o jQuery.
     * @param {string} [tipo='disabled'] - Propiedad booleana a establecer (disabled, readonly, etc.).
     * @example
     * Formulario.bloquearInputs(".soloLectura");
     */
    static bloquearInputs(selectores, tipo = "disabled") {
        const Form = new Formulario();
        Form.#normalizarSelectores(selectores).prop(tipo, true);
    }


    /**
     * Desbloquea inputs individuales usando selectores.
     * @param {string|string[]|jQuery} selectores - Selectores CSS o jQuery.
     * @param {string} [tipo='disabled'] - Propiedad a remover (disabled, readonly, etc.).
     * @example
     * Formulario.desbloquearInputs("[name=campo1]");
     */
    static desbloquearInputs(selectores, tipo = "disabled") {
        const Form = new Formulario();
        Form.#normalizarSelectores(selectores).prop(tipo, false);
    }

    /**
     * Establece el atributo "required" en inputs seleccionados.
     * @param {string|string[]|jQuery} selectores - Selectores CSS o jQuery.
     * @example
     * Formulario.requerirInputs("#nombre, #email");
     */
    static requerirInputs(selectores) {
        const Form = new Formulario();
        Form.#normalizarSelectores(selectores).prop("required", true);
    }

    /**
     * Elimina el atributo "required" en inputs seleccionados.
     * @param {string|string[]|jQuery} selectores - Selectores CSS o jQuery.
     * @example
     * Formulario.desrequerirInputs(".opcional");
     */
    static desrequerirInputs(selectores) {
        const Form = new Formulario();
        Form.#normalizarSelectores(selectores).prop("required", false);
    }
}