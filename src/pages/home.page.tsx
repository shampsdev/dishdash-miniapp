import { useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { motion } from "framer-motion";

import { useAuth } from "@/shared/hooks/useAuth";
import { LobbyCard } from "@/modules/home/lobby.card";
import { MapButton } from "@/modules/home/map.button";


export const HomePage = () => {
    const webApp = useWebApp();
    const { enableVerticalSwipes, disableVerticalSwipes } = webApp;
    const { user } = useAuth();

    const { recentLobbies } = useAuth();


    useEffect(() => {
        disableVerticalSwipes();

        return () => {
            enableVerticalSwipes();
        };
    }, []);


    return (
        <div className="flex overflow-y-hidden h-svh items-end">
            <div className="min-h-svh flex flex-col justify-between w-[90%] mx-auto">
                <div className="pt-8 space-y-5 pb-5 mb-auto">
                    <img className="h-20 w-20 mx-auto rounded-full border-4 border-secondary" src={user?.avatar} />
                    <h1 className="text-2xl font-medium text-center">Привет, <br /> {user?.name}! </h1>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, ease: [0.25, 0.8, 0.5, 1] }}
                    className="w-full gap-y-5 flex flex-col justify-end pb-5"
                >
                    <h1 className="text-center font-medium text-2xl">Последние лобби</h1>
                    {recentLobbies.slice(0, 2).map((id, index) => <LobbyCard
                        id={id}
                        key={`${id}_${index}`}
                    />)}
                </motion.div>
                <MapButton />
            </div>
        </div>
    );
};

