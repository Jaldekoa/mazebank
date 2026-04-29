const log = {
  red: (...args) => console.log(`\x1b[31m${args.join(" ")}\x1b[0m`),
  green: (...args) => console.log(`\x1b[32m${args.join(" ")}\x1b[0m`),
};

const logerror = {
  red: (...args) => console.error(`\x1b[31m${args.join(" ")}\x1b[0m`),
  green: (...args) => console.error(`\x1b[32m${args.join(" ")}\x1b[0m`),
};

export { log, logerror };
