// FUNCIONES (generales)
import * as Booleano from './fx/functions/booleano.js';
import * as Custom from './fx/functions/custom.js';
import * as Email from './fx/functions/email.js';
import * as Fecha from './fx/functions/fecha.js';
import * as Nombre from './fx/functions/nombre.js';
import * as Numero from './fx/functions/numero.js';
import * as Password from './fx/functions/password.js';
import * as Texto from './fx/functions/texto.js';

// FUNCIONES (DNI)
import * as DNIChile from './fx/functions/dni/chile.js';
const Persona = {
    chile: DNIChile,
}

// FUNCIONES (Fono)
import * as FonoGenerico from './fx/functions/phone/generico.js';
import * as FonoArgentina from './fx/functions/phone/argentina.js';
import * as FonoChile from './fx/functions/phone/chile.js';
import * as FonoColombia from './fx/functions/phone/colombia.js';
import * as FonoHaiti from './fx/functions/phone/haiti.js';
import * as FonoMexico from './fx/functions/phone/mexico.js';
import * as FonoPeru from './fx/functions/phone/peru.js';
import * as FonoVenezuela from './fx/functions/phone/venezuela.js';
const Fono = {
    generico: FonoGenerico,
    argentina: FonoArgentina,
    chile: FonoChile,
    colombia: FonoColombia,
    haiti: FonoHaiti,
    mexico: FonoMexico,
    peru: FonoPeru,
    venezuela: FonoVenezuela,
}

export const Funciones = {
    booleano: Booleano,
    custom: Custom,
    email: Email,
    fecha: Fecha,
    nombre: Nombre,
    numero: Numero,
    password: Password,
    texto: Texto,
    persona: Persona,
    fono: Fono,
}

// FUNCIONES (inputs)
export * as Input from './fx/input/input.js';

// FUNCIONES (Formulario)
export * as Formulario from './fx/form/formulario.js';

// FUNCIONES (UI)
import * as Dispositivo from './fx/ui/dispositivo.js';
import * as Navegador from './fx/ui/navegador.js';
import * as Pantalla from './fx/ui/pantalla.js';
import * as Visualizacion from './fx/ui/visualizacion.js';
export const UI = {
    dispositivo: Dispositivo,
    navegador: Navegador,
    pantalla: Pantalla,
    visualizacion: Visualizacion,
}

// FUNCIONES (utilidades)
import * as Selectores from './fx/utils/selectores.js';
import * as Tipo from './fx/utils/tipo.js';
export const Utilidades = {
    selectores: Selectores,
    tipo: Tipo,
}

// CORE
export * as Validador from './core/validador.js';