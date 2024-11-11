import Layout from '@/components/layout';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { Avatar } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';

import { swipesEvent } from '@/shared/events/app-events/swipes.event';
import { Toaster } from 'react-hot-toast';
import { AddPersonIcon } from '@/assets/icons/add-person.icon';
import { BOT_USERNAME } from '@/shared/constants';

export const LobbyPreviewPage = () => {
    const { settings, users, setState, tags, lobbyId } = useLobbyStore();
    const [buttonState, setButtonState] = useState<'single' | 'double'>('single');
    const { openTelegramLink } = useWebApp();

    const webApp = useWebApp();

    const onShareClick = () => {
        openTelegramLink(`https://t.me/share/url?url=https://t.me/${BOT_USERNAME}/app?startapp=${lobbyId}`);
    }

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
        if (buttonState === 'single') {
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
            if (buttonState === 'single') {
                webApp.MainButton.hide();
                webApp.MainButton.offClick(setSettings);
            } else {
                webApp.MainButton.hide();
                webApp.MainButton.offClick(setStart);

                webApp.SecondaryButton.hide();
                webApp.SecondaryButton.offClick(setSettings);
            }
        };
    }, [webApp, buttonState]);

    useEffect(() => {
        if (settings.tags.length == 0) {
            setButtonState('single');
        } else {
            setButtonState('double');
        }
    }, [settings.tags])

    return (
        <Layout>
            <Toaster
                toastOptions={{
                    className: '!bg-secondary !text-foreground !rounded-xl !w-full',
                }}
            />
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
                                (<Avatar key={`${x.id}_${x.name}`} src={x.avatar} style={{ height: 'auto', width: '80px', borderWidth: '6px' }} />)
                            )}
                            <div onClick={onShareClick} className="h-[80px] w-[80px] border-[6px] border-secondary flex items-center justify-center rounded-full">
                                <AddPersonIcon className="text-primary pr-1 pb-1" />
                            </div>
                        </div>
                    </div>
                    <div className="py-5 text-center space-y-2 pt-10">
                        <h1 className="text-2xl font-medium">Настройки лобби</h1>
                        {settings.tags.length > 0 ? <div className="flex flex-col items-center gap-2">
                            <div className="flex justify-center flex-wrap px-16 gap-2">
                                {tags.filter(x => settings.tags.includes(x.id)).map((x, index) => (
                                    <div key={`${x.id}_${index}`} className="h-20 w-20 flex items-center bg-secondary rounded-xl">
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
