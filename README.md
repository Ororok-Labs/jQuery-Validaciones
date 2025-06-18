# 🧪 jQuery Validaciones

**jQuery Validaciones** es una micro-librería moderna y extensible para validar formularios HTML de forma simple, sin dependencias externas aparte de jQuery.
Pensada para desarrolladores que valoran la claridad, la personalización y el código legible, con validaciones potentes y sin magia oculta.

> ✨ Diseñada como herramienta pedagógica y utilitaria. Ideal para proyectos pequeños, medianos o educativos.

---

## 📦 Instalación

Puedes incluir el archivo UMD directamente:

```html
<script src="lib/validaciones.umd.js"></script>
```

---

## Uso básico

```javascript
const validador = new Validador("alerta");

validador.input("#nombre", [
  [valor => valor.length >= 3, "El nombre debe tener al menos 3 caracteres"],
  [valor => /^[a-zA-Z\s]+$/.test(valor), "El nombre solo debe contener letras"]
]);

if (validador.valida()) {
  alert("Todo OK");
} else {
  validador.mostrarErrores();
}
```

## 🎯 Modos de salida

- "alerta" → muestra alert() con errores.

- "html" → inserta errores en un contenedor definido.

- "inputs" → destaca los inputs individualmente (requiere configuración).

- "consola" → muestra los errores con console.error.

- "arreglo" → retorna los errores como array.

- "corto-circuito" → detiene y muestra solo el primer error.

## 🧩 Extensibilidad
```javascript
const mayorDeEdad = valor => parseInt(valor) >= 18;

validador.input("#edad", [
  [mayorDeEdad, "Debes ser mayor de edad"]
]);
```

## 🧠 Filosofía

Esta librería no busca reemplazar grandes frameworks como jquery-validation, sino ofrecer:

- Código más transparente
- Validaciones explícitas y personalizables
- Cero configuración obligatoria
- Fácil lectura, incluso por principiantes

## 🔧 Estructura del Proyecto

``` arduino
jquery-validaciones/
├── lib/                 ← Bundle final
├── src/                 ← Código fuente modular
├── docs/                ← Documentación y demos
├── vite.config.js       ← Build con Vite
└── package.json
```

## 📄 Licencia
MIT © Uriel Olivares
¡Copia, adapta y aprende!

> 🛠️ Este proyecto fue diseñado por un humano y asistido por IA (ChatGPT), como ejercicio de aprendizaje y desarrollo práctico.