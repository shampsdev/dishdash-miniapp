import { useExpand, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import { AnimatePresence, motion } from "framer-motion";

import { useAuth } from "@/shared/hooks/useAuth";
import { LobbyCard } from "@/modules/home/lobby.card";
import { MapButton } from "@/modules/home/map.button";
import { Avatar } from "@/components/ui/avatar";

import hat from "@/assets/hat.png";

export const HomePage = () => {
    const webApp = useWebApp();
    const { enableVerticalSwipes, disableVerticalSwipes, openTelegramLink } = webApp;
    const { user, recentLobbies, logoutUser } = useAuth();
    const [isExpanded, expand] = useExpand();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!isExpanded) expand();
        disableVerticalSwipes();

        return () => {
            enableVerticalSwipes();
        };
    }, [isExpanded]);

    return (
        <div className="flex flex-col spacy-y-5 overflow-y-hidden h-svh mt-5">
            <AnimatePresence>
                {!open && (
                    <motion.div
                        initial={{ opacity: 0, height: '0vh' }}
                        animate={{ opacity: 1, height: '40vh' }}
                        exit={{ opacity: 0, height: '0px' }}
                        className="flex space-y-5 flex-col mx-5 mb-5"
                        transition={{ duration: 0.3, ease: [0.25, 0.8, 0.5, 1] }}
                        onClick={() => {
                            logoutUser();
                            expand();
                        }}
                    >
                        <div className="flex gap-5 items-center">
                            {user && (
                                <Avatar
                                    src={user.avatar}
                                    fallback="?"
                                    style={{ maxHeight: '90px', maxWidth: '90px', borderWidth: '5px' }}
                                    fallbackElement={
                                        <span className="text-[50px] font-medium text-primary">
                                            {user?.name.split(' ').slice(0, 2).map(x => x.charAt(0)).join('').toUpperCase()}
                                        </span>
                                    }
                                />
                            )}
                            <h1 className="text-2xl font-medium">Привет, <br /> {user?.name}! </h1>
                        </div>
                        <div onTouchStart={() => {
                            openTelegramLink('https://t.me/shampsdev');
                        }} className="h-full w-full bg-secondary overflow-hidden rounded-xl">
                            <img src={hat} className="h-full w-full object-cover" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-col justify-end w-[90%] mx-auto mb-5">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, ease: [0.25, 0.8, 0.5, 1] }}
                    className="w-full gap-y-5 flex flex-col justify-end mb-5"
                >
                    <h1 className="text-center font-medium text-2xl">Последние лобби</h1>
                    {recentLobbies.length > 0 ?
                        recentLobbies.slice(0, 2).map((id, index) => (
                            <LobbyCard
                                id={id}
                                key={`${id}_${index}`}
                            />)
                        ) : (
                            <p className="text-center">
                                Здесь будет храниться история ваших последних лобби
                            </p>
                        )
                    }
                </motion.div>
                <MapButton onMapOpenUpdate={(open) => setOpen(open)} />
            </div>
        </div>
    );
};

