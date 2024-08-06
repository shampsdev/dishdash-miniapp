import React, { useEffect, useState } from 'react';
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
import { useSocket } from '@/shared/providers/socket.provider';

const LobbySettingsPage = () => {
  const {
    tags,
    price,
    radius,
    setPrice,
    setRadius,
    setTags,
    fetchTags,
    users,
    addUser,
  } = useLobbyStore();

  const { joinLobby, updateSettings, startGame } = useSettings();
  const { user } = useAuth();
  const { subscribe } = useSocket();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // extract lobbyId from the URL, fix later
  const { id: lobbyId } = useParams<{ id: string }>();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (lobbyId && user) {
      console.log('Joining lobby with ID:', lobbyId);
      joinLobby(lobbyId);

      toast.success(`${user.name} has joined the lobby!`, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#333',
          color: '#fff',
        },
      });
    }
  }, [lobbyId, user]);

  useEffect(() => {
    const handleUserJoined = (data: any) => {
      if (data.lobbyId === lobbyId) {
        addUser(data.user);
        toast.success(`${data.user.name} has joined the lobby!`, {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#333',
            color: '#fff',
          },
        });
      }
    };

    const unsubscribe = subscribe('userJoined', handleUserJoined);

    return () => {
      unsubscribe();
    };
  }, [lobbyId, addUser, subscribe]);

  useEffect(() => {
    const handleSettingsUpdate = (data: any) => {
      if (data.lobbyId === lobbyId) {
        console.log('Received settingsUpdate:', data);

        setPrice(data.priceMin);
        setRadius(data.maxDistance);
        setTags(data.tags);
        toast.success('Settings updated!');
      } else {
        console.warn(
          'Received settingsUpdate for a different lobby:',
          data.lobbyId,
        );
      }
    };

    const unsubscribeSettings = subscribe(
      'settingsUpdate',
      handleSettingsUpdate,
    );

    return () => {
      unsubscribeSettings();
    };
  }, [subscribe, lobbyId, setPrice, setRadius, setTags, addUser]);

  const handleSettingsChange = (newSettings: any) => {
    updateSettings({
      ...newSettings,
      userId: user?.id,
    });
    console.log('Updating settings with:', {
      priceMin: price,
      priceMax: 10000,
      maxDistance: radius,
      tags: [],
      userId: user?.id,
    });
  };

  const onPriceChange = (value: number) => {
    setPrice(value);
    handleSettingsChange({
      priceMin: value,
      priceMax: 10000,
      maxDistance: radius,
      tags: [],
    });
  };

  const onRadiusChange = (value: number) => {
    setRadius(value);
    handleSettingsChange({
      priceMin: price,
      priceMax: 10000,
      maxDistance: value,
      tags: [],
    });
  };

  const onToggleTag = (tagId: number) => {
    const updatedTags = tags.includes(tagId)
      ? tags.filter((id) => id !== tagId)
      : [...tags, tagId];

    setTags(updatedTags);
    handleSettingsChange({
      priceMin: price,
      priceMax: 10000,
      maxDistance: radius,
      tags: updatedTags,
    });
  };

  const copyLinkToClipboard = () => {
    const link = `https://dishdash.ru/${lobbyId}`;
    navigator.clipboard.writeText(link).then(
      () => alert('Ссылка скопирована!'),
      (err) => alert('Ошибка при копировании: ' + err),
    );
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
    },
  };

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
          {/* Header */}
          <div className="flex flex-col items-center justify-center w-[90%] max-w-lg mb-4 mt-4">
            <div className="flex items-center justify-between w-full">
              <img
                src="src/assets/icons/logo.png"
                alt="Dishdash Logo"
                className="h-12"
              />
              <div
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className="rounded-full bg-gray-100 p-2 cursor-pointer"
              >
                <img
                  src="src/assets/icons/user-icon.png"
                  alt="User Icon"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </div>
            <h3 className="text-2xl font-medium mt-2 w-full text-left">
              Настройки
            </h3>
          </div>

          {/* Toggle Options */}
          <div className="space-y-4 mb-8 w-[90%] max-w-lg">
            {tags.map((tag) => (
              <Toggle
                key={tag.id}
                className="flex items-center justify-between px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150 w-[90%]"
                onClick={() =>
                  handleSettingsChange({
                    tags: [...tags, tag.id],
                  })
                }
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

          {/* Sliders */}
          <div className="mb-2 w-[90%] max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <p className="text-md font-medium">Средняя цена</p>
              <p className="text-md font-medium">{price} ₽</p>
            </div>
            <Slider
              className="mt-1 mb-1"
              value={[price]}
              onValueChange={(value) => {
                onPriceChange(value[0]);
              }}
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
              <p className="text-md font-medium">{radius} м</p>
            </div>
            <Slider
              className="mt-1 mb-1"
              value={[radius]}
              onValueChange={(value) => {
                onRadiusChange(value[0]);
              }}
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

          {/* Start Button */}
          <div className="flex justify-center w-[70%] max-w-lg mb-4">
            <Button
              className="w-full py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-colors duration-150"
              onClick={startGame}
            >
              Начать
            </Button>
          </div>

          {/* Bottom Drawer */}
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
                  key={user.id}
                  className="flex flex-col items-center w-20 p-2 bg-white rounded-lg shadow-md"
                >
                  <img
                    src={`src/assets/icons/${user.avatar}`}
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
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
