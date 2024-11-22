export const areColorsTooClose = (
    color1: string | null,
    color2: string | null,
    threshold: number = 10
): boolean => {

    function hexToLightness(hex: string): number {
        if (!hex) return 0;

        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        return Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2) * 100;
    }

    if (!color1 || !color2) {
        return false; // If either color is null or undefined, they're not "too close"
    }

    const lightness1 = hexToLightness(color1);
    const lightness2 = hexToLightness(color2);

    return Math.abs(lightness1 - lightness2) < threshold;
}

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
