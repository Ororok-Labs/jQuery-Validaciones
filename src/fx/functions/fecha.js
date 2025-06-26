import { extraerValor } from '../input/input.js';

/**
 * Valida si el valor es una fecha válida (parseable por Date).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @returns {boolean} True si es una fecha válida, false si no.
 * @example
 * Funciones.fecha.valida(entrada); // true si entrada.value === "2024-06-12"
 * Funciones.fecha.valida(entrada); // false si entrada.value === "no-es-fecha"
 * Funciones.fecha.valida("2024-06-12"); // true
 * Funciones.fecha.valida("no-es-fecha"); // false
 * Funciones.fecha.valida(new Date()); // true
 * Funciones.fecha.valida("2024-06-12T00:00:00"); // true
 * Funciones.fecha.valida("#input-no-fecha"); // false
 */
export function valida(entrada) {
  const valor = extraerValor(entrada);
  return !isNaN(Date.parse(valor));
}

/**
 * Valida si la fecha es mayor o igual a la mínima permitida.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(string|Date)} min - Fecha mínima permitida.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.fecha.fechaMinima(entrada, "2024-01-01");
 * Funciones.fecha.fechaMinima(entrada, new Date());
 * Funciones.fecha.fechaMinima(document.getElementById("input"), new Date("2024-01-01"));
 * Funciones.fecha.fechaMinima("#input", "2024-01-01");
 */
export function fechaMinima(entrada, min) {
  const valor = new Date(extraerValor(entrada));
  return valor >= new Date(min);
}

/**
 * Valida si la fecha es menor o igual a la máxima permitida.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(string|Date)} max - Fecha máxima permitida.
 * @returns {boolean} True si cumple, false si no.
 * @example
 * Funciones.fecha.fechaMaxima(entrada, "2024-12-31");
 * Funciones.fecha.fechaMaxima(entrada, new Date());
 * Funciones.fecha.fechaMaxima(document.getElementById("input"), new Date("2024-12-31"));
 * Funciones.fecha.fechaMaxima("#input", "2024-12-31");
 */
export function fechaMaxima(entrada, max) {
  const valor = new Date(extraerValor(entrada));
  return valor <= new Date(max);
}

/**
 * Valida si la fecha está entre un mínimo y un máximo (incluye extremos).
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(string|Date)} min - Fecha mínima permitida.
 * @param {(string|Date)} max - Fecha máxima permitida.
 * @returns {boolean} True si está en el rango, false si no.
 * @example
 * Funciones.fecha.fechaEntre(entrada, "2024-01-01", "2024-12-31");
 * Funciones.fecha.fechaEntre("#fecha", new Date("2024-01-01"), new Date("2024-12-31"));
 * Funciones.fecha.fechaEntre(document.getElementById("fecha"), new Date(), new Date("2024-12-31"));
 */
export function fechaEntre(entrada, min, max) {
  const valor = new Date(extraerValor(entrada));
  const fechaMin = new Date(min);
  const fechaMax = new Date(max);
  if (isNaN(valor) || isNaN(fechaMin) || isNaN(fechaMax)) return false;
  return valor >= fechaMin && valor <= fechaMax;
}

/**
 * Valida si la fecha y hora está entre un mínimo y un máximo.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(string|Date)} min - Fecha y hora mínima permitida.
 * @param {(string|Date)} max - Fecha y hora máxima permitida.
 * @returns {boolean} True si está en el rango, false si no.
 * @example
 * Funciones.fecha.fechaHoraEntre(entrada, "2024-06-12 00:00:00", "2024-06-12 23:59:59");
 * Funciones.fecha.fechaHoraEntre("#fechaHora", new Date("2024-06-12 00:00:00"), new Date("2024-06-12 23:59:59"));
 * Funciones.fecha.fechaHoraEntre(document.getElementById("fechaHora"), new Date(), new Date("2024-06-12 23:59:59"));
 */
export function fechaHoraEntre(entrada, min, max) {
  const valor = new Date(extraerValor(entrada));
  const fechaMin = new Date(min);
  const fechaMax = new Date(max);
  if (isNaN(valor) || isNaN(fechaMin) || isNaN(fechaMax)) return false;
  return valor >= fechaMin && valor <= fechaMax;
}

/**
 * Valida el formato de la fecha según los formatos indicados.
 * Si la fecha no cumple el formato, devuelve false.
 * @note
 * Acepta formatos comunes como:
 * - "YYYY-MM-DD"
 * - "YYYY/MM/DD"
 * - "DD-MM-YYYY"
 * - "DD/MM/YYYY"
 *
 * Si el formato no es reconocido, se usa "YYYY-MM-DD" por defecto.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {string} [formato="YYYY-MM-DD"] - Formato de fecha a validar.
 * @returns {boolean} True si cumple el formato, false si no.
 * @example
 * Funciones.fecha.formatoFecha(entrada, "DD/MM/YYYY");
 * Funciones.fecha.formatoFecha("#fecha", "YYYY-MM-DD");
 * Funciones.fecha.formatoFecha(document.getElementById("fecha"), "DD-MM-YYYY");
 * Funciones.fecha.formatoFecha("2024-06-12", "YYYY/MM/DD");
 * Funciones.fecha.formatoFecha("12-06-2024", "DD-MM-YYYY");
 * Funciones.fecha.formatoFecha("2024/06/12", "YYYY/MM/DD");
 * Funciones.fecha.formatoFecha("12/06/2024", "DD/MM/YYYY");
 * Funciones.fecha.formatoFecha("#fecha", "DD/MM/YYYY");
 */
export function formatoFecha(entrada, formato = "YYYY-MM-DD") {
  const valor = extraerValor(entrada);
  const formatos = {
    "YYYY-MM-DD": /^\d{4}-\d{2}-\d{2}$$/,
    "YYYY/MM/DD": /^\d{4}\/\d{2}\/\d{2}$$/,
    "DD-MM-YYYY": /^\d{2}-\d{2}-\d{4}$$/,
    "DD/MM/YYYY": /^\d{2}\/\d{2}\/\d{4}$$/
  };
  const regex = formatos[formato] || formatos["YYYY-MM-DD"];
  return regex.test(valor);
}

/**
 * Valida el formato de fecha y hora según el formato indicado.
 * Si la fecha no cumple el formato, devuelve false.
 * @note
 * Acepta formatos comunes como:
 * - "YYYY-MM-DD HH:MM:SS"
 * - "YYYY-MM-DD HH:MM"
 * - "YYYY/MM/DD HH:MM:SS"
 * - "YYYY/MM/DD HH:MM"
 * Si el formato no es reconocido, se usa "YYYY-MM-DD HH:MM:SS" por defecto.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(string|RegExp)} [formato="YYYY-MM-DD HH:MM:SS"] - Formato o expresión regular.
 * @returns {boolean} True si cumple el formato, false si no.
 * @example
 * Funciones.fecha.formatoFechaHora(entrada, "YYYY/MM/DD HH:MM");
 * Funciones.fecha.formatoFechaHora("#fechaHora", "YYYY-MM-DD HH:MM:SS");
 * Funciones.fecha.formatoFechaHora(document.getElementById("fechaHora"), "YYYY/MM/DD HH:MM");
 * Funciones.fecha.formatoFechaHora("2024-06-12 14:30:00", "YYYY-MM-DD HH:MM:SS");
 * Funciones.fecha.formatoFechaHora("2024/06/12 14:30", "YYYY/MM/DD HH:MM");
 * Funciones.fecha.formatoFechaHora("12-06-2024 14:30:00", "DD-MM-YYYY HH:MM:SS");
 */
export function formatoFechaHora(entrada, formato = "YYYY-MM-DD HH:MM:SS") {
  const valor = extraerValor(entrada);
  const formatos = {
    "YYYY-MM-DD HH:MM:SS": /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$$/,
    "YYYY-MM-DD HH:MM": /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$$/,
    "YYYY/MM/DD HH:MM:SS": /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$$/,
    "YYYY/MM/DD HH:MM": /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$$/
  };
  let regex;
  if (formato instanceof RegExp) {
    regex = formato;
  } else {
    regex = formatos[formato] || formatos["YYYY-MM-DD HH:MM:SS"];
  }
  return regex.test(valor);
}

/**
 * Valida el formato de fecha y hora de forma flexible según el nivel indicado.
 * Si la fecha no cumple el formato, devuelve false.
 * @note
 * Acepta formatos comunes como:
 * - "dia" => "YYYY-MM-DD"
 * - "hora" => "YYYY-MM-DD HH"
 * - "minuto" => "YYYY-MM-DD HH:MM"
 * - "segundo" => "YYYY-MM-DD HH:MM:SS"
 *
 * Si el nivel no es reconocido, se usa "minuto" por defecto.
 * @param {string|HTMLElement|any} entrada - Selector CSS, elemento o valor.
 * @param {(string|RegExp)} [nivel="minuto"] - Nivel de precisión o expresión regular.
 * @returns {boolean} True si cumple el formato, false si no.
 * @example
 * Funciones.fecha.fechaHoraFlexible(entrada, "segundo");
 * Funciones.fecha.fechaHoraFlexible("#fechaHora", "hora");
 * Funciones.fecha.fechaHoraFlexible(document.getElementById("fechaHora"), "dia");
 * Funciones.fecha.fechaHoraFlexible("2024-06-12 14:30:00", "segundo");
 * Funciones.fecha.fechaHoraFlexible("2024/06/12 14:30", "hora");
 * Funciones.fecha.fechaHoraFlexible("12-06-2024 14:30:00", "dia");
 * Funciones.fecha.fechaHoraFlexible("2024-06-12 14:30", "minuto");
 */
export function fechaHoraFlexible(entrada, nivel = "minuto") {
  const valor = extraerValor(entrada);
  const niveles = {
    dia: "YYYY-MM-DD",
    hora: "YYYY-MM-DD HH",
    minuto: "YYYY-MM-DD HH:MM",
    segundo: "YYYY-MM-DD HH:MM:SS"
  };
  if (nivel instanceof RegExp) {
    return nivel.test(valor);
  }
  const formatoDeseado = niveles[nivel] || nivel;
  return formatoFechaHora({ val: () => valor }, formatoDeseado);
}
