import chalk from "chalk";

export const logError = (err) => {
  console.error(chalk.red(`[Error]: ${err.message || err}`));
};
