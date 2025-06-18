export class Password {
    /**
     * Valida el valor usando una expresión regular personalizada.
     * @example
     * Funciones.password.regexp($el, /^[a-z]+$/); // true si $el.val() === "abc"
     * Funciones.password.regexp($el, /^[0-9]+$/); // false si $el.val() === "abc"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {RegExp} regexp - Expresión regular a aplicar.
     * @returns {boolean} True si cumple, false si no.
     */
    static regexp = ($el, regexp) => regexp.test($el.val());

    /**
     * Valida que la contraseña tenga al menos 'min' caracteres.
     * @example
     * Funciones.password.largoMinimo($el, 8); // true si $el.val() === "abcd1234"
     * Funciones.password.largoMinimo($el, 10); // false si $el.val() === "abcd1234"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {number} min - Largo mínimo requerido.
     * @returns {boolean} True si cumple, false si no.
     */
    static largoMinimo = ($el, min) => $el.val().length >= min;

    /**
     * Valida que la contraseña sea solo alfanumérica (letras y números).
     * @example
     * Funciones.password.alfanumerico($el); // true si $el.val() === "abc123"
     * Funciones.password.alfanumerico($el); // false si $el.val() === "abc123!"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si cumple, false si no.
     */
    static alfanumerico = ($el) => /^[a-zA-Z0-9]+$/.test($el.val());

    /**
     * Valida que la contraseña tenga letras, números y al menos un caracter especial.
     * @example
     * Funciones.password.numerosLetrasEspecial($el); // true si $el.val() === "abc123!"
     * Funciones.password.numerosLetrasEspecial($el); // false si $el.val() === "abc123"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si cumple, false si no.
     */
    static numerosLetrasEspecial = ($el) =>
        /[a-zA-Z]/.test($el.val()) &&
        /[0-9]/.test($el.val()) &&
        /[^a-zA-Z0-9]/.test($el.val());

    /**
     * Valida que la contraseña sea fuerte: mínimo 'min' caracteres, al menos una minúscula, una mayúscula, un número y un caracter especial.
     * @example
     * Funciones.password.fuerte($el, 8); // true si $el.val() === "Abc123!@"
     * Funciones.password.fuerte($el, 8); // false si $el.val() === "abc12345"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {number} [min=8] - Largo mínimo requerido.
     * @returns {boolean} True si cumple, false si no.
     */
    static fuerte = ($el, min = 8) =>
        $el.val().length >= min &&
        /[a-z]/.test($el.val()) &&
        /[A-Z]/.test($el.val()) &&
        /[0-9]/.test($el.val()) &&
        /[^a-zA-Z0-9]/.test($el.val());

    /**
     * Valida que dos campos de contraseña sean iguales (por ejemplo, para repetir contraseña).
     * @example
     * Funciones.password.repetido($el, $otro); // true si ambos tienen el mismo valor
     * Funciones.password.repetido($el, $otro); // false si los valores son distintos
     * @param {(jQuery|string)} $el - Primer campo.
     * @param {(jQuery|string)} $otro - Segundo campo a comparar.
     * @returns {boolean} True si son iguales, false si no.
     */
    static repetido = ($el, $otro) => $el.val() === $otro.val();


    /**
     * Cambia la visibilidad de un input tipo password y alterna el ícono correspondiente.
     * @example
     * // Uso con Bootstrap y botón como control
     * Funciones.password.mostrarOcultar('#btnMostrarClave', '#inputClave', '#btnMostrarClave i', 'bootstrap');
     * @example
     * // Uso con Tailwind y botón con ícono SVG HeroIcons
     * Funciones.password.mostrarOcultar('#togglePassword', '#passwordInput', '#togglePassword svg', 'tailwind', ['heroicon-eye-off', 'heroicon-eye']);
     * @example
     * // Uso sin framework CSS, solo FontAwesome
     * Funciones.password.mostrarOcultar(document.getElementById('verClave'), document.getElementById('clave'),'#verClave i');
     * @example
     * // Uso con elementos jQuery ya instanciados
     * const $btn = $('#switchClave');
     * const $input = $('#miPassword');
     * const $icon = $btn.find('i');
     * Funciones.password.mostrarOcultar($btn, $input, $icon);
     * @example
     * // Uso con clases personalizadas para los íconos (sin librería de estilos)
     * Funciones.password.mostrarOcultar('.boton-toggle', '.input-password', '.boton-toggle .icono', '', ['oculto', 'visible']);
     * @param {(string|jQuery)} $control - Elemento que activa el evento (botón, ícono, etc.).
     * @param {(string|jQuery)} $input - Input de tipo password a mostrar/ocultar.
     * @param {(string|jQuery)} $elementoIcon - Elemento donde cambiar las clases del ícono.
     * @param {string} [libreriaEstilos=""] - Framework CSS usado ("bootstrap", "tailwind", o vacío si no hay framework).
     * @param {string[]} [iconos=["fa-eye-slash", "fa-eye"]] - Clases FontAwesome, HeroIcons, etc. para ocultar/mostrar.
     */
    static mostrarOcultar = ($control, $input, $elementoIcon, libreriaEstilos = "", iconos = ["fa-eye-slash", "fa-eye"]) => {
        $control = (typeof $control === "string") ? $($control) : $control;
        $input = (typeof $input === "string") ? $($input) : $input;
        $elementoIcon = (typeof $elementoIcon === "string") ? $($elementoIcon) : $elementoIcon;

        const [iconOcultarPassword, iconMostrarPassword] = iconos;

        switch ((libreriaEstilos || "").toLowerCase()) {
            case "bootstrap":
            case "tailwind":
            case "":
                if ($input.attr("type") === "password") {
                    $elementoIcon.removeClass(iconOcultarPassword).addClass(iconMostrarPassword);
                    $input.attr('type', 'text');
                } else {
                    $elementoIcon.removeClass(iconMostrarPassword).addClass(iconOcultarPassword);
                    $input.attr('type', 'password');
                }
                break;

            default:
                // Podrías mostrar un warning si la librería no es reconocida
                console.warn("Librería de estilos no reconocida:", libreriaEstilos);
                break;
        }
    }
}