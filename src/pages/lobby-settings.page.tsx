import { useEffect, useCallback } from 'react';
import Layout from '@/components/layout';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useAuth } from '@/shared/hooks/useAuth';
import axios from 'axios';
import { Settings } from '@/shared/types/settings.type';
import { Tag } from '@/shared/types/tag.type';
import { settingsUpdateEvent } from '@/shared/events/app-events/settings.event';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';

const LobbySettingsPage = () => {
  const { settings, tags, setTags } = useLobbyStore();
  const { user } = useAuth();
  const { priceMin, maxDistance } = settings;

  // causes lag wihout callback
  const handleSettingsChange = useCallback((newSettings: Settings) => {
    settingsUpdateEvent.update(newSettings);
  }, []);

  const onPriceChange = (value: number[]) => {
    handleSettingsChange({
      priceMin: value[0],
      priceMax: value[0],
      maxDistance,
      tags: settings.tags,
    });
  };

  const onRadiusChange = (value: number[]) => {
    handleSettingsChange({
      maxDistance: value[0],
      priceMin,
      priceMax: priceMin,
      tags: settings.tags,
    });
  };

  const toggleCategoryType = (tagId: number) => {
    const found = settings.tags.find((x) => x == tagId);
    let updatedTags: number[] = [];

    if (found != undefined) {
      updatedTags = settings.tags.filter((x) => x != found);
    } else {
      updatedTags = [...settings.tags, tagId];
    }

    settingsUpdateEvent.update({
      priceMin: settings.priceMin,
      priceMax: settings.priceMax,
      maxDistance: settings.maxDistance,
      tags: updatedTags,
    });
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<Tag[]>(
          `https://dishdash.ru/api/v1/places/tags`,
        );
        setTags(response.data);
        console.log('Fethed tags', response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, [user]); // wihout user does not fetch on login

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: cubicBezier(0.7, 0.84, 0, 0) },
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
          className="flex flex-col items-center justify-between w-full p-0 bg-white"
        >
          <div className="flex flex-col items-center justify-center w-[90%] max-w-lg mb-4 mt-4">
            <div className="flex items-center justify-between w-full">
              <img
                src="/icons/logo.png"
                alt="Dishdash Logo"
                className="h-8"
              />
            </div>
            <h3 className="text-2xl font-medium mt-4 w-full text-left">
              Настройки
            </h3>
          </div>

          <div className="space-y-4 mb-8 w-[90%] max-w-lg">
            {tags.map((tag) => (
              <Toggle
                key={tag.id}
                pressed={settings.tags.some((x) => x === tag.id)}
                className={`flex items-center justify-between py-6 px-4 border-[1.5px] border-gray-300 rounded-xl transition-colors duration-150 w-full ${settings.tags.some((t) => t === tag.id) ? 'bg-black border-black text-white' : ''}`}
                onClick={() => toggleCategoryType(tag.id)}
              >
                <div className="flex items-center">
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

          <div className="flex justify-center w-[90%] max-w-lg mt-4 mb-5">
            <Button
              className="w-full py-5 text-lg font-normal text-white bg-black rounded-xl hover:bg-gray-800 transition-colors duration-150"
              onClick={() => swipesEvent.start()}
            >
              Начать
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default LobbySettingsPage;
