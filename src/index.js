

// FUNCIONES (ordenadas por archivo)
import { Booleano }         from './fx/booleano.js';
import { Custom}            from './fx/custom.js';
import { Dispositivo }      from './fx/dispositivo.js';
import { Email }            from './fx/email.js';
import { Fecha }            from './fx/fecha.js';
import { Fono }             from './fx/fono.js';
import { Formulario }       from './fx/formulario.js';
import { Input }            from './fx/input.js';
import { Navegador }        from './fx/navegador.js';
import { Numero }           from './fx/numero.js';
import { Pantalla }         from './fx/pantalla.js';
import { Password }         from './fx/password.js';
import { Persona }          from './fx/persona.js';
import { Texto }            from './fx/texto.js';
import { Tipo }             from './fx/tipo.js';
import { Visualizacion }    from './fx/visualizacion.js';

// CORE (la importo después, por si usa visualizacion.js y formumlario.js)
import { Validador } from './core/validador.js';

// NAMESPACE GLOBAL
export class Funciones {
    static booleano         = Booleano;
    static custom           = Custom;
    static dispositivo      = Dispositivo;
    static email            = Email;
    static fecha            = Fecha;
    static fono             = Fono;
    static formulario       = Formulario;
    static input            = Input;
    static navegador        = Navegador;
    static numero           = Numero;
    static pantalla         = Pantalla;
    static password         = Password;
    static persona          = Persona;
    static texto            = Texto;
    static tipo             = Tipo;
    static visualizacion    = Visualizacion;
    static validador        = Validador;
}

if (typeof window !== "undefined") {
    window.jQueryFormTools = {
        Funciones
    };
}
