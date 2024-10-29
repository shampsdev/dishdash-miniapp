import { useEffect, useCallback } from 'react';
import Layout from '@/components/layout';
import { Toggle } from '@/components/ui/toggle';
import { Slider } from '@/components/ui/slider';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useAuth } from '@/shared/hooks/useAuth';
import { Settings } from '@/shared/types/settings.interface';
import { settingsUpdateEvent } from '@/shared/events/app-events/settings.event';
import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { fetchTags } from '@/shared/api/tags.api';

const LobbySettingsPage = () => {
    const { settings, tags, setTags } = useLobbyStore();
    const { user } = useAuth();
    const { priceMin, priceMax, maxDistance } = settings;

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
            location: settings.location,
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
            location: settings.location,
        });
    };

    useEffect(() => {
        fetchTags().then((tags) => {
            if (tags != undefined) setTags(tags);
        });
    }, [user]);

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
                        <div className="flex w-full justify-between">
                            <h3 className="text-2xl font-medium my-4 w-full text-left">
                                Настройки
                            </h3>
                            penis
                        </div>

                        <div className="space-y-4 mb-8 w-full">
                            {tags
                                .sort((a, b) => a.id - b.id)
                                .map((tag) => (
                                    <Toggle
                                        key={tag.id}
                                        pressed={settings.tags.some((x) => x === tag.id)}
                                        className={
                                            'flex items-center justify-between py-6 px-4 rounded-xl transition-colors bg-secondary border-none duration-150 w-full'
                                        }
                                        onClick={() => toggleCategoryType(tag.id)}
                                    >
                                        <div className="flex items-center">
                                            <span className="text-lg font-normal">{tag.name}</span>
                                        </div>
                                    </Toggle>
                                ))}
                        </div>
                    </div>

                    <div className="mb-5 w-[90%] max-w-lg">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-md font-medium">Средняя цена</p>
                            <p className="text-md font-medium">
                                {(priceMin + priceMax) / 2 || 0} ₽
                            </p>{' '}
                        </div>
                        <Slider
                            className="mt-1 mb-1"
                            value={[(priceMin + priceMax) / 2 || 0]}
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

                    <MainButton onClick={() => swipesEvent.start()} text="Начать" />
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
};

export default LobbySettingsPage;
