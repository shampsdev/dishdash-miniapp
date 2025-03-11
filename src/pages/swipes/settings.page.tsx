import Layout from '@/modules/swipes/layout';
import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

import { Users } from '@/modules/swipes/lobby/users';
import { isClassicPlaces } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useSettingsStore } from '@/modules/swipes/settings/settings.store';
import { ClassicPlacesSettingsPanel } from '@/modules/swipes/settings/classic-places/classic-places-pannel';
import { useEffect } from 'react';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import { useTheme } from '@/shared/hooks/useTheme';
import { backButton, mainButton } from '@telegram-apps/sdk-react';

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

  const theme = useTheme();

  const setPreview = () => {
    setRoute('lobby');
    mainButton.setParams({
      backgroundColor: theme.buttonColor,
      textColor: '#FFFFFF'
    });
  };

  useEffect(() => {
    mainButton.setParams({
      text: 'Выбрать',
      isVisible: true
    });

    if (!ready) {
      mainButton.setParams({
        isEnabled: false,
        // @ts-expect-error what the fuck
        backgroundColor: theme.secondary,
        textColor: '#6F7072'
      });
    }
    mainButton.onClick(setPreview);

    backButton.show();
    backButton.onClick(setPreview);

    return () => {
      mainButton.setParams({
        isVisible: false
      });
      mainButton.offClick(setPreview);

      backButton.hide();
      backButton.offClick(setPreview);
    };
  }, []);

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
