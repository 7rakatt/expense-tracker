import * as commander from '@commander-js/extra-typings';

export const helpers = (() => {
  const log = (v: unknown) => console.log(`\n${v}\n`);

  const logError = (v: unknown) => console.error(`\n${v}\n`);

  const parseString = (s: string) => s.trim();

  const parseNumber = (v: unknown) => {
    const n = Number(v);

    if (Number.isNaN(n)) {
      throw new commander.InvalidArgumentError('Not a number.');
    } else {
      return n;
    }
  };

  const parseMonth = (v: unknown) => {
    const n = parseNumber(v);
    if (n < 0 || n > 11) {
      throw new commander.InvalidArgumentError('Choose a month between 0 - 11');
    }

    return n;
  };

  return {
    log,
    logError,
    parseString,
    parseNumber,
    parseMonth,
  };
})();
