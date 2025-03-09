import { useCallback, useEffect } from 'react';
import Layout from '@/components/layout';
import { Slider } from '@/components/ui/slider';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { settingsUpdateEvent } from '@/shared/events/app-events/settings.event';

import { Tags } from '@/modules/settings/tags';
import { Users } from '@/modules/settings/users';
import useTheme from '@/shared/hooks/useTheme';
import { useSettingsStore } from '@/shared/stores/settings.store';
import { ClassicPlacesSettings } from '@/shared/types/settings/settings.interface';

export const LobbySettingsPage = () => {
  const { setState, users } = useLobbyStore();

  const { settings: rawSettings } = useSettingsStore();
  const settings = rawSettings as ClassicPlacesSettings;

  const theme = useTheme();
  const webApp = useWebApp();

  const handleSettingsChange = useCallback(
    (newSettings: ClassicPlacesSettings) => {
      settingsUpdateEvent.update(newSettings);
    },
    []
  );

  const onPriceChange = (value: number[]) => {
    handleSettingsChange({
      type: 'classicPlaces',
      classicPlaces: {
        location: settings.classicPlaces.location,
        priceAvg: value[0],
        tags: settings.classicPlaces.tags,
        recommendation: settings.classicPlaces.recommendation
      }
    });
  };

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

  const setPreview = () => {
    setState('lobby');
    webApp.MainButton.color = theme.button_color;
    webApp.MainButton.textColor = '#FFFFFF';
  };

  useEffect(() => {
    webApp.MainButton.setText('Выбрать');
    webApp.MainButton.show();
    if (settings.classicPlaces.tags.length === 0) {
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

            <div className="grid grid-cols-2 gap-2 w-full max-h-[70vh] overflow-y-auto no-scrollbar">
              <Tags />
            </div>
          </div>
          <div className="mb-5 w-[90%] max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="text-md font-medium">Средняя цена</p>
              <p className="text-md font-medium">
                {settings.classicPlaces.priceAvg}
              </p>{' '}
            </div>
            <Slider
              className="mt-1 mb-1 pt-2 pb-3"
              value={[settings.classicPlaces.priceAvg || 0]}
              onValueChange={onPriceChange}
              max={3000}
              min={0}
              step={100}
              id="price"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1 mb-2">
              <p>0 ₽</p>
              <p>3 000 ₽</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};
