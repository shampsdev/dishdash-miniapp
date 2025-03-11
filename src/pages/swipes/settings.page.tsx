import Layout from '@/modules/swipes/layout';
import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

import { Users } from '@/modules/swipes/lobby/users';
import { isClassicPlaces } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useSettingsStore } from '@/modules/swipes/settings/settings.store';
import { ClassicPlacesSettingsPanel } from '@/modules/swipes/settings/classic-places/classic-places-pannel';
import { useEffect } from 'react';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import useTheme from '@/shared/hooks/useTheme';

export const SettingsPage = () => {
  const { users } = useLobbyStore();
  const { settings, ready } = useSettingsStore();
  const { setRoute } = useServerRouteStore();

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0.84, 0, 0) }
    }
  };

  const webApp = useWebApp();
  const theme = useTheme();

  const setPreview = () => {
    setRoute('lobby');
    webApp.MainButton.color = theme.button_color;
    webApp.MainButton.textColor = '#FFFFFF';
  };

  useEffect(() => {
    webApp.MainButton.setText('Выбрать');
    webApp.MainButton.show();
    if (!ready) {
      webApp.MainButton.disable();
      webApp.MainButton.color = theme.secondary;
      webApp.MainButton.textColor = '#6F7072';
    }
    webApp.MainButton.onClick(setPreview);

    webApp.BackButton.show();
    webApp.BackButton.onClick(setPreview);

    return () => {
      webApp.MainButton.hide();
      webApp.MainButton.offClick(setPreview);

      webApp.BackButton.hide();
      webApp.BackButton.offClick(setPreview);
    };
  }, [webApp]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key="lobbySettings"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex flex-col h-screen items-center justify-between w-full p-0 bg-background"
        >
          <div className="flex flex-col items-center justify-center w-[90%] max-w-lg">
            <div className="flex w-full justify-between items-center">
              <h3 className="text-2xl font-medium my-4 w-full text-left">
                Настройки
              </h3>
              <Users users={users} />
            </div>
          </div>
          {isClassicPlaces(settings) && (
            <ClassicPlacesSettingsPanel settings={settings} />
          )}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};
