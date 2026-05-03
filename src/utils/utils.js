/**
 * @file utils.js
 * @description Utilidades auxiliares para el proyecto.
 * Proporciona herramientas de logging con colores para mejorar la legibilidad
 * en la consola durante el desarrollo y depuración.
 */

/**
 * Objeto de logging para mensajes informativos o de éxito.
 * Utiliza `console.log` (stdout).
 *
 * @namespace log
 */
const log = {
  /**
   * Imprime un mensaje en color rojo en la salida estándar.
   * Útil para resaltar advertencias importantes que no son errores fatales.
   * @param {...any} args - Elementos a imprimir.
   */
  red: (...args) => console.log(`\x1b[31m${args.join(" ")}\x1b[0m`),

  /**
   * Imprime un mensaje en color verde en la salida estándar.
   * Ideal para confirmar que un proceso (como el servidor) se ha iniciado con éxito.
   * @param {...any} args - Elementos a imprimir.
   */
  green: (...args) => console.log(`\x1b[32m${args.join(" ")}\x1b[0m`),
};

/**
 * Objeto de logging para reportar errores.
 * Utiliza `console.error` (stderr), lo cual es fundamental para capturar fallos
 * de forma independiente en sistemas de monitorización o archivos de log.
 *
 * @namespace logerror
 */
const logerror = {
  /**
   * Imprime un error en color rojo en la salida de errores.
   * @param {...any} args - Detalles del error.
   */
  red: (...args) => console.error(`\x1b[31m${args.join(" ")}\x1b[0m`),

  /**
   * Imprime un error en color verde en la salida de errores (uso poco frecuente).
   * @param {...any} args - Detalles a imprimir.
   */
  green: (...args) => console.error(`\x1b[32m${args.join(" ")}\x1b[0m`),
};

export { log, logerror };
