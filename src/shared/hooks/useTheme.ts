import { ThemeParams } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

interface Props extends ThemeParams {
  section_bg_color?: string;
  bottom_bar_bg_color?: string;
}

const useTheme = (themeParameters: Props) => {
  useEffect(() => {
    if (themeParameters) {
      document.documentElement.style.setProperty(
        '--background',
        themeParameters.bg_color ?? '',
      );
      document.documentElement.style.setProperty(
        '--secondary',
        themeParameters.bottom_bar_bg_color ?? '',
      );
      document.documentElement.style.setProperty(
        '--foreground',
        themeParameters.text_color ?? '',
      );
      document.documentElement.style.setProperty(
        '--primary',
        themeParameters.button_color ?? '',
      );
    }
  }, [themeParameters]);
};

export default useTheme;