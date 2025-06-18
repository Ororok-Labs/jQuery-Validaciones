export class Email {
    /**
     * Valida formato de email genérico.
     * @example
     * Funciones.email.generico($el); // true si $el.val() === "usuario@dominio.com"
     * Funciones.email.generico($el); // false si $el.val() === "usuario@dominio"
     * Funciones.email.generico($el); // false si $el.val() === "usuario@"
     * Funciones.email.generico($el); // false si $el.val() === "usuario"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @returns {boolean} True si cumple formato de email, false si no.
     */
    static generico = ($el) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($el.val());

    /**
     * Valida que el email pertenezca a un dominio específico (ejemplo: solo gmail.com).
     * @example
     * Funciones.email.dominio($el, "gmail.com"); // true si $el.val() === "usuario@gmail.com"
     * Funciones.email.dominio($el, "gmail.com"); // false si $el.val() === "usuario@yahoo.com"
     * Funciones.email.dominio($el, "empresa.cl"); // true si $el.val() === "empleado@empresa.cl"
     * Funciones.email.dominio($el, "empresa.cl"); // false si $el.val() === "empleado@otraempresa.cl"
     * @param {(jQuery|string)} $el - Elemento jQuery o string a validar.
     * @param {string} dominio - Dominio permitido (ej: "gmail.com").
     * @returns {boolean} True si el email pertenece al dominio, false si no.
     */
    static dominio = ($el, dominio) => {
        const valor = $el.val();
        const regex = new RegExp(`^[^\\s@]+@${dominio.replace('.', '\\.')}$`, 'i');
        return regex.test(valor);
    };

    /**
     * Valida que dos campos de email sean iguales (por ejemplo, para repetir email).
     * @example
     * Funciones.email.repetido($el, $otro); // true si ambos tienen el mismo valor
     * Funciones.email.repetido($el, $otro); // false si los valores son distintos
     * @param {(jQuery|string)} $el - Primer campo.
     * @param {(jQuery|string)} $otro - Segundo campo a comparar.
     * @returns {boolean} True si son iguales, false si no.
     */
    static repetido = ($el, $otro) => $el.val() === $otro.val();
}