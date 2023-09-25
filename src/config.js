import colors from 'tailwindcss/colors';
import { MINTAILOR_CLASSES, MINTAILOR_CONTENT } from './constants.js';

delete colors.lightBlue;
delete colors.warmGray;
delete colors.trueGray;
delete colors.coolGray;
delete colors.blueGray;

export const createConfig = function (config = {}) {
  const colorSafeList = (config.theme?.colors || []).join('|');

  // content
  config.content ||= [];
  config.content.push(MINTAILOR_CONTENT);

  // theme
  config.theme ||= {};
  config.theme.colors = {
    // default
    ...colors,

    // special
    primary: colors.cyan,
    secondary: colors.stone,
    danger: colors.rose,
    info: colors.violet,
    warn: colors.amber,
    success: colors.lime
  };

  // safelist
  config.safelist ||= [];
  config.safelist.push.apply(config.safelist, MINTAILOR_CLASSES);
  if (colorSafeList)
    config.safelist.push.apply(config.safelist, [
      {
        pattern: new RegExp(`^bg-(${colorSafeList})-(300|500|700)$`),
        variants: ['hover']
      },
      {
        pattern: new RegExp(`^border-(${colorSafeList})-700$`)
      },
      {
        pattern: new RegExp(`^text-(${colorSafeList})-700$`)
      }
    ]);

  return config;
};
