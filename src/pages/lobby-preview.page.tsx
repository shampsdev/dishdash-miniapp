import Layout from '@/components/layout';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Avatar } from '@/components/ui/avatar';
import { useEffect } from 'react';

import { swipesEvent } from '@/shared/events/app-events/swipes.event';

export const LobbyPreviewPage = () => {
    const { settings, users, setState, tags } = useLobbyStore();

    const webApp = useWebApp();

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

    const setSettings = () => {
        setState('settings');
    }


    const setStart = () => {
        swipesEvent.start();
    }

    useEffect(() => {
        if (settings.tags.length == 0) {
            webApp.MainButton.setText('Настроить');
            webApp.MainButton.show();
            webApp.MainButton.enable();
            webApp.MainButton.onClick(setSettings);
        } else {
            webApp.MainButton.setText('Начать');
            webApp.MainButton.show();
            webApp.MainButton.enable();
            webApp.MainButton.onClick(setStart);

            webApp.SecondaryButton.setText('Настроить');
            webApp.SecondaryButton.show();
            webApp.SecondaryButton.enable();
            webApp.SecondaryButton.onClick(setSettings);
        }

        return () => {
            if (settings.tags.length == 0) {
                webApp.MainButton.hide();
                webApp.MainButton.offClick(setSettings);
            } else {
                webApp.MainButton.hide();
                webApp.MainButton.offClick(setStart);

                webApp.SecondaryButton.hide();
                webApp.SecondaryButton.offClick(setSettings);
            }
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
                    className="grid grid-cols-1 h-screen w-full p-0 bg-background"
                >
                    <div>
                        <div className="py-5 text-center space-y-2">
                            <h1 className="text-2xl font-medium">Участники</h1>
                            <p>Дождитесь всех и начинайте свайпать!</p>
                        </div>
                        <div className="flex px-5 flex-wrap justify-center gap-5">
                            {users.map(x =>
                                (<Avatar src={`https://t.me/i/userpic/320/${x.name}.jpg`} style={{ height: 'auto', width: '80px', borderWidth: '6px' }} />)
                            )}
                        </div>
                    </div>
                    <div className="py-5 text-center space-y-2 pt-10">
                        <h1 className="text-2xl font-medium">Настройки лобби</h1>
                        {settings.tags.length > 0 ? <div className="flex flex-col items-center gap-2">
                            <div className="flex justify-center flex-wrap px-16 gap-2">
                                {tags.filter(x => settings.tags.includes(x.id)).map(x => (
                                    <div className="h-20 w-20 flex items-center bg-secondary rounded-xl">
                                        <img className="p-1" src={x.icon} />
                                    </div>
                                ))}
                            </div>
                            <div className="text-primary font-medium py-2 px-3 bg-secondary rounded-xl w-fit text-center">~ {(settings.priceMax + settings.priceMin) / 2} ₽</div>
                        </div> : <p>Пока что вы ничего не выбрали :( <br />
                            Перейдите в настройки</p>}
                    </div>
                </motion.div>
            </AnimatePresence>
        </Layout>
    );
};
