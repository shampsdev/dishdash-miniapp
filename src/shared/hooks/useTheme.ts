import { ThemeParams } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { areColorsTooClose, lightnessHex } from '../util/theme.util';

interface Props extends ThemeParams {
    section_bg_color?: string;
    bottom_bar_bg_color?: string;
    accent_text_color?: string;
}

const useTheme = (themeParameters: Props, darkMode: boolean) => {
    const background = themeParameters.bg_color ?? '';
    const secondaryCandidate =
        themeParameters.bottom_bar_bg_color ??
        lightnessHex(background, darkMode ? 10 : -10) ??
        '';

    const useAdjustedSecondary =
        areColorsTooClose(background, secondaryCandidate, 1);

    const secondary = useAdjustedSecondary
        ? lightnessHex(background, darkMode ? 10 : -10)
        : secondaryCandidate;

    useEffect(() => {
        if (themeParameters) {
            document.documentElement.style.setProperty(
                '--background',
                background,
            );
            document.documentElement.style.setProperty(
                '--secondary',
                secondary ?? '',
            );
            document.documentElement.style.setProperty(
                '--foreground',
                themeParameters.text_color ?? '',
            );
            document.documentElement.style.setProperty(
                '--accent-foreground',
                themeParameters.button_text_color ?? '',
            );
            document.documentElement.style.setProperty(
                '--primary',
                themeParameters.button_color ?? '',
            );
        }
    }, [themeParameters]);
};

export default useTheme;
