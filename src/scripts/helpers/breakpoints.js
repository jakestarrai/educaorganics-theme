import resolveConfig from 'tailwindcss/resolveConfig';
import config from '../../../tailwind.config.js';

export const breakpoints = resolveConfig(config).theme.screens;
