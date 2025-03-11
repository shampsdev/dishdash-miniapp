import { BOT_USERNAME } from '@/shared/constants';

import Layout from '@/modules/swipes/layout';
import { Icons } from '@/assets/icons/icons';
import { Avatar } from '@/components/ui/avatar';

import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

import { useLobbyStore } from '@/modules/swipes/lobby/lobby.store';
import { useSettingsStore } from '@/modules/swipes/settings/settings.store';

import { ClassicPlacesSettingsPreview } from '@/modules/swipes/settings/classic-places/classic-places-preview';
import { CollectionPlacesSettingsPreview } from '@/modules/swipes/settings/collection-places/collection-places-preview';
import {
  isClassicPlaces,
  isCollectionPlaces
} from '@/modules/swipes/interfaces/settings/settings.interface';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LobbyPage = () => {
  const { users, lobbyId } = useLobbyStore();
  const webApp = useWebApp();
  const { settings: rawSettings, ready } = useSettingsStore();
  const navigate = useNavigate();

  const { openTelegramLink } = webApp;
  const onShareClick = () => {
    openTelegramLink(
      `https://t.me/share/url?url=https://t.me/${BOT_USERNAME}/app?startapp=${lobbyId}`
    );
  };

  const setMainScreen = () => {
    navigate('/');
  };

  useEffect(() => {
    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    return () => {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);
    };
  }, [webApp]);

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

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key="lobbySettings"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="grid grid-cols-1 h-screen w-full p-0 bg-background"
        >
          <div>
            <div className="py-5 text-center space-y-2">
              <h1 className="text-2xl font-medium">Участники</h1>
              <p>Дождитесь всех и начинайте свайпать!</p>
            </div>
            <div className="flex px-5 flex-wrap justify-center gap-5">
              {users.map((user) => (
                <Avatar
                  key={`${user.id}_${user.name}`}
                  src={user.avatar}
                  style={{
                    maxHeight: '80px',
                    maxWidth: '80px',
                    borderWidth: '6px'
                  }}
                  fallback={'?'}
                  fallbackElement={
                    <span className="text-[30px] font-medium text-primary">
                      {user?.name
                        .split(' ')
                        .slice(0, 2)
                        .map((x) => x.charAt(0))
                        .join('')
                        .toUpperCase()}
                    </span>
                  }
                />
              ))}
              <div
                onClick={onShareClick}
                className="h-[80px] w-[80px] border-[6px] border-secondary flex items-center justify-center rounded-full"
              >
                <Icons.addPerson className="text-primary pr-1 pb-1" />
              </div>
            </div>
          </div>
          <div className="py-5 text-center space-y-2 pt-10">
            <h1 className="text-2xl font-medium">Настройки лобби</h1>
            {isClassicPlaces(rawSettings) && (
              <ClassicPlacesSettingsPreview
                settings={rawSettings}
                ready={ready}
              />
            )}
            {isCollectionPlaces(rawSettings) && (
              <CollectionPlacesSettingsPreview
                settings={rawSettings}
                ready={ready}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};
