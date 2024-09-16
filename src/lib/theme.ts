import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

const { theme } = resolveConfig(tailwindConfig);
export const themeColors = theme?.colors as unknown as Record<
  string,
  Record<string, string>
>;

export const lightnessHex = (col: string, amt: number) => {
  if (col.length < 5) return undefined;
  col = col.replace(/^#/, '');

  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00ff) + amt;
  let g = (num & 0x0000ff) + amt;
  let newColor = g | (b << 8) | (r << 16);
  return '#' + newColor.toString(16);
};
