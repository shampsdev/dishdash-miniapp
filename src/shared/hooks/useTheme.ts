import { useEffect } from 'react';
import { areColorsTooClose, lightnessHex } from '../util/theme.util';

import { useSignal, themeParams } from '@telegram-apps/sdk-react';

export const useTheme = () => {
  const isDark = useSignal(themeParams.isDark);
  const isMounted = useSignal(themeParams.isMounted);

  console.log(themeParams.isMounted())

  const background = themeParams.backgroundColor() ?? '';

  const secondaryCandidate =
    themeParams.bottomBarBgColor() ??
    lightnessHex(background, isDark ? 10 : -10) ??
    '';

  const useAdjustedSecondary = areColorsTooClose(
    background,
    secondaryCandidate,
    1
  );

  const secondary = useAdjustedSecondary
    ? lightnessHex(background, isDark ? 10 : -10)
    : secondaryCandidate;

  const secondaryForeground = lightnessHex(secondary ?? '', isDark ? 5 : -5);

  useEffect(() => {
    if (themeParams) {
      document.documentElement.style.setProperty('--background', background);
      document.documentElement.style.setProperty(
        '--secondary',
        secondary ?? ''
      );
      document.documentElement.style.setProperty(
        '--secondary-foreground',
        secondaryForeground ?? ''
      );
      document.documentElement.style.setProperty(
        '--foreground',
        themeParams.textColor() ?? ''
      );
      document.documentElement.style.setProperty(
        '--accent-foreground',
        themeParams.buttonTextColor() ?? ''
      );
      document.documentElement.style.setProperty(
        '--primary',
        themeParams.buttonColor() ?? ''
      );
    }
  }, [isDark, isMounted]);

  return {
    secondary,
    secondaryForeground,
    background: themeParams.backgroundColor(),
    textColor: themeParams.textColor(),
    buttonTextColor: themeParams.buttonTextColor(),
    buttonColor: themeParams.buttonColor(),
    darkMode: isDark
  };
};
