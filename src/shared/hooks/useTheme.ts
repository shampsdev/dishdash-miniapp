import {
  ThemeParams,
  useThemeParams
} from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { areColorsTooClose, lightnessHex } from '../util/theme.util';

interface Props extends ThemeParams {
  section_bg_color?: string;
  bottom_bar_bg_color?: string;
  accent_text_color?: string;
}

const useTheme = () => {
  const params = useThemeParams();

  const themeParameters: Props = params[1];
  const darkMode = params[0] === 'dark';

  const background = themeParameters.bg_color ?? '';
  const secondaryCandidate =
    themeParameters.bottom_bar_bg_color ??
    lightnessHex(background, darkMode ? 10 : -10) ??
    '';

  const useAdjustedSecondary = areColorsTooClose(
    background,
    secondaryCandidate,
    1
  );

  const secondary = useAdjustedSecondary
    ? lightnessHex(background, darkMode ? 10 : -10)
    : secondaryCandidate;

  useEffect(() => {
    if (themeParameters) {
      document.documentElement.style.setProperty('--background', background);
      document.documentElement.style.setProperty(
        '--secondary',
        secondary ?? ''
      );
      document.documentElement.style.setProperty(
        '--foreground',
        themeParameters.text_color ?? ''
      );
      document.documentElement.style.setProperty(
        '--accent-foreground',
        themeParameters.button_text_color ?? ''
      );
      document.documentElement.style.setProperty(
        '--primary',
        themeParameters.button_color ?? ''
      );
    }
  }, [params]);

  return {
    secondary,
    background,
    text_color: themeParameters.text_color,
    button_text_color: themeParameters.text_color,
    button_color: themeParameters.button_color,
    darkMode
  };
};

export default useTheme;
