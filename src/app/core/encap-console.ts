import { environment } from '@environments/environment';

const isProd = environment.production;

export const CONSOLE = {
  log: isProd ? () => {} : window.console.log.bind(window.console, '>>>')
};

