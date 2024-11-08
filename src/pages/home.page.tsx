import { postLobby } from "@/shared/api/lobby.api";
import { useInitData, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useLobbyStore } from "@/shared/stores/lobby.store";

export const HomePage = () => {
    const [position, setPosition] = useState({ lat: 59.9311, lon: 30.3609 });
    const webApp = useWebApp();
    const { MainButton, enableVerticalSwipes, disableVerticalSwipes } = webApp;
    const navigate = useNavigate();
    const [initDataUnsafe] = useInitData();

    const { resetStore } = useLobbyStore();

    const [showMap, setShowMap] = useState(false);

    const handleClick = async () => {
        if (!showMap) {
            setShowMap(true);
        } else {
            const lobby = await postLobby(position);
            navigate(`/${lobby?.id}`);
            resetStore();
        }
    };

    useEffect(() => {
        MainButton.onClick(handleClick);

        return () => {
            MainButton.offClick(handleClick);
        }
    }, [handleClick])

    useEffect(() => {
        disableVerticalSwipes();

        return () => {
            enableVerticalSwipes();
        };
    }, []);

    const MapEvents = () => {
        const map = useMap();

        useMapEvents({
            moveend(e) {
                const newCenter = e.target.getCenter();
                setPosition(() => ({ lat: newCenter.lat, lon: newCenter.lng }));
            }
        });

        useEffect(() => {
            console.log('kek');
            map.invalidateSize();
        }, [showMap, map]);

        return null;
    };

    return (
        <div className="pointer-events-none flex flex-col justify-end items-center h-svh pb-8 w-full relative">
            <div className="relative w-[90%] h-fit">
                <motion.div animate={{ height: showMap ? '55vh' : 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
                    className="w-full z-10 top-2 pointer-events-auto relative mx-auto rounded-t-xl overflow-hidden">
                    <MapContainer
                        zoomControl={false}
                        attributionControl={false}
                        center={[position.lat, position.lon]}
                        zoom={15}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWlrZWRlZ2VvZnJveSIsImEiOiJja3ZiOGQwc3I0N29uMnVxd2xlbGVyZGQzIn0.11XK5mqIzfLBTfNTYOGDgw"
                        />
                        <MapEvents />
                    </MapContainer>

                    {/* Marker icon centered over the map */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000
                        }}
                    >
                        <Avatar src={`https://t.me/i/userpic/320/${initDataUnsafe?.user?.username}.jpg`} style={{ width: '30px', height: '30px' }} />
                    </div>
                </motion.div>
                <div onClick={handleClick} className="z-50 cursor-pointer relative bottom-0 pointer-events-auto flex justify-center items-center rounded-lg bg-primary w-full h-14 active:opacity-95 font-medium">
                    {showMap ? "Создать Лобби" : "Начать"}
                </div>
            </div>
        </div>
    );
};

