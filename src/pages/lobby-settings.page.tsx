import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/store/lobby.store';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useSettings } from '@/shared/providers/settings.provider';
import { useAuth } from '@/shared/hooks/useAuth';
import { useInitData } from '@vkruglikov/react-telegram-web-app';
import { Tag } from '@/shared/interfaces/tag.interface';
import axios from 'axios';

const LobbySettingsPage = () => {
  const { settings, users, setLobbyId } = useLobbyStore(); // -fetchTags
  const { joinLobby, updateSettings, startSwipes } = useSettings();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id: lobbyId } = useParams<{ id: string }>();
  const { user, authenticated, loginUser } = useAuth();
  const [initDataUnsafe] = useInitData();
  const { priceMin, priceMax, maxDistance } = settings;
  const [tags, setTags] = useState<Tag[]>([]);

  // gpt went crazy on this one
  const memoizedSetLobbyId = useCallback(() => {
    if (lobbyId) {
      setLobbyId(lobbyId);
      console.log('Lobby ID set:', lobbyId);
    }
  }, [lobbyId, setLobbyId]);

  // causes lag wihout callback
  const handleSettingsChange = useCallback(
    (newSettings: Partial<Settings>) => {
      if (lobbyId) {
        updateSettings({
          ...newSettings,
          userId: user?.id,
        });
        console.log('Updating settings with:', {
          ...settings,
          ...newSettings,
          userId: user?.id,
        });
      } else {
        console.error('Lobby ID is not defined!');
      }
    },
    [lobbyId, user?.id, updateSettings, settings],
  );

  const onPriceChange = (value: number[]) => {
    handleSettingsChange({
      priceMin: value[0],
      priceMax: 0,
      maxDistance,
      tags: settings.tags,
    });
  };

  const onRadiusChange = (value: number[]) => {
    handleSettingsChange({
      maxDistance: value[0],
      priceMin,
      priceMax: 0,
      tags: settings.tags,
    });
  };

  const toggleCategoryType = (tagId: number) => {
    const found = settings.tags.find((x) => x.id == tagId);
    let updatedTags: Tag[] = [];
    if (found != undefined) {
      updatedTags = settings.tags.filter((x) => x.id != found.id);
    } else {
      updatedTags = [
        ...settings.tags,
        tags.find((x) => x.id == tagId) ?? tags[0],
      ];
    }

    updateSettings({
      priceMin: settings.priceMin,
      priceMax: settings.priceMax,
      maxDistance: settings.maxDistance,
      tags: updatedTags,
    });
  };

  const copyLinkToClipboard = useCallback(() => {
    if (lobbyId) {
      const link = `https://dishdash.ru/${lobbyId}`;
      navigator.clipboard.writeText(link).then(
        () => alert('Ссылка скопирована!'),
        (err) => alert('Ошибка при копировании: ' + err),
      );
    } else {
      console.error('Lobby ID is not defined!');
    }
  }, [lobbyId]);

  // split effects bcs of lag
  useEffect(() => {
    memoizedSetLobbyId();
  }, [memoizedSetLobbyId]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<Tag[]>(
          `https://dishdash.ru/api/v1/cards/tags`,
        );
        setTags(response.data);
        console.log('Fethed tags', response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []); // wihout user does not fetch on login

  useEffect(() => {
    if (!user && initDataUnsafe?.user) {
      loginUser({
        name: initDataUnsafe.user.first_name,
        avatar: '0',
      });
    }
  }, [user, initDataUnsafe, loginUser]);

  useEffect(() => {
    if (lobbyId && authenticated && user) {
      joinLobby(lobbyId);
      console.log('User joined lobby with ID:', lobbyId);
    }
  }, [lobbyId, authenticated, user]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0.84, 0) },
    },
  };

  const currentUserAvatar =
    users.find((u) => u.id === user?.id)?.avatar || '😃'; // default to smiley if not found (always😃😃😃😃))))

  return (
    <Layout>
      <Toaster />
      <AnimatePresence mode="wait">
        <motion.div
          key="lobbySettings"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="flex flex-col items-center justify-between min-h-screen w-full p-0 bg-white"
        >
          <div className="flex flex-col items-center justify-center w-[90%] max-w-lg mb-4 mt-4">
            <div className="flex items-center justify-between w-full">
              <img
                src="src/assets/icons/logo.png"
                alt="Dishdash Logo"
                className="h-12"
              />
              <div
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="rounded-full bg-gray-100 p-2 cursor-pointer flex items-center"
              >
                <span className="text-3xl mr-2">{currentUserAvatar}</span>
              </div>
            </div>
            <h3 className="text-2xl font-medium mt-2 w-full text-left">
              Настройки
            </h3>
          </div>

          <div className="space-y-4 mb-8 w-[90%] max-w-lg">
            {tags.map((tag) => (
              <Toggle
                key={tag.id}
                className={`flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg transition-colors duration-150 w-[90%] ${settings.tags.some((t) => t.id === tag.id) ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                onClick={() => toggleCategoryType(tag.id)}
              >
                <div className="flex items-center">
                  <img
                    src={`src/assets/icons/${tag.icon}`}
                    alt={tag.name}
                    className="h-8 min-w-fit mr-2"
                  />
                  <span className="text-lg font-normal">{tag.name}</span>
                </div>
              </Toggle>
            ))}
          </div>

          <div className="mb-2 w-[90%] max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="text-md font-medium">Средняя цена</p>
              <p className="text-md font-medium">{priceMin || 0} ₽</p>{' '}
            </div>
            <Slider
              className="mt-1 mb-1"
              value={[priceMin || 0]}
              onValueChange={onPriceChange}
              max={10000}
              min={0}
              step={500}
              id="price"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1 mb-2">
              <p>0 ₽</p>
              <p>10 000 ₽</p>
            </div>

            <div className="flex justify-between items-center mb-2">
              <p className="text-md font-medium">Радиус поиска</p>
              <p className="text-md font-medium">{maxDistance || 0} м</p>{' '}
            </div>
            <Slider
              className="mt-1 mb-1"
              value={[maxDistance || 0]}
              onValueChange={onRadiusChange}
              max={10000}
              min={0}
              step={500}
              id="radius"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <p>0 м</p>
              <p>10 000 м</p>
            </div>
          </div>

          <div className="flex justify-center w-[70%] max-w-lg mb-4">
            <Button
              className="w-full py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-colors duration-150"
              onClick={startSwipes}
            >
              Начать
            </Button>
          </div>

          <div
            className={`fixed bottom-0 left-0 right-0 bg-gray-100 transition-transform duration-300 transform ${
              isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
            } p-4 rounded-t-lg shadow-lg`}
          >
            <div className="mb-4 flex justify-center items-center">
              <div className="w-12 h-1 bg-gray-400 rounded-full" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Скопировать ссылку</h4>
            <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-inner mb-4">
              <span className="text-gray-700">{`https://dishdash.ru/${lobbyId}`}</span>
              <button
                onClick={copyLinkToClipboard}
                className="text-blue-500 hover:text-blue-700"
              >
                <img
                  src="src/assets/icons/copy-icon.png"
                  alt="Copy Icon"
                  className="h-6 w-6"
                />
              </button>
            </div>
            <h4 className="text-lg font-semibold mb-2">Участники</h4>
            <div className="flex flex-wrap gap-4">
              {users.map((user) => (
                <div
                  key={user.id} // user.id should be unique...
                  className="flex flex-col items-center w-20 p-2 bg-white rounded-lg shadow-md"
                >
                  <span className="text-3xl">{user.avatar}</span>{' '}
                  <span className="mt-2 text-sm font-medium">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default LobbySettingsPage;
