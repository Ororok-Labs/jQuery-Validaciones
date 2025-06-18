export class Dispositivo {
    /**
     * Valida si el dispositivo es móvil.
     * @example
     * Funciones.dispositivo.esMovil(); // true en móviles, false en escritorio
     * @returns {boolean}
     */
    static esMovil = () => /Mobi|Android/i.test(navigator.userAgent);

    /**
     * Valida si el dispositivo es de escritorio.
     * @example
     * Funciones.dispositivo.esEscritorio(); // true en escritorio, false en móviles
     * @returns {boolean}
     */
    static esEscritorio = () => !/Mobi|Android/i.test(navigator.userAgent);

    /**
     * Obtiene el sistema operativo del dispositivo.
     * @example
     * Funciones.dispositivo.sistemaOperativo(); // "Windows", "MacOS", "Linux", "Android", "iOS", "Otro"
     * @returns {string}
     */
    static sistemaOperativo = () => {
        const ua = navigator.userAgent;
        if (/windows/i.test(ua)) return "Windows";
        if (/macintosh|mac os x/i.test(ua)) return "MacOS";
        if (/linux/i.test(ua)) return "Linux";
        if (/android/i.test(ua)) return "Android";
        if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
        return "Otro";
    };
}