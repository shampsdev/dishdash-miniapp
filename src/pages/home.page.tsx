import { postLobby } from "@/shared/api/lobby.api";
import { useInitData, useWebApp } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";

export const HomePage = () => {
    const [position, setPosition] = useState({ lat: 59.9311, lon: 30.3609 });
    const webApp = useWebApp();
    const { MainButton, enableVerticalSwipes, disableVerticalSwipes } = webApp;
    const navigate = useNavigate();
    const [initDataUnsafe] = useInitData();

    const handleClick = async () => {
        const lobby = await postLobby(position);
        navigate(`/${lobby?.id}`);
    };

    useEffect(() => {
        MainButton.onClick(handleClick);

        return () => {
            MainButton.offClick(handleClick);
        }
    }, [handleClick])

    useEffect(() => {
        MainButton.setText('Создать Лобби');
        MainButton.show();
        MainButton.enable();
        MainButton.onClick(handleClick);

        disableVerticalSwipes();

        return () => {
            MainButton.hide();
            enableVerticalSwipes();
        };
    }, []);

    const MapEvents = () => {
        useMapEvents({
            moveend(e) {
                const newCenter = e.target.getCenter();
                setPosition(() => ({ lat: newCenter.lat, lon: newCenter.lng }));
            }
        });
        return null;
    };

    return (
        <div className="flex justify-center items-center h-[100vh] w-full relative">
            <div className="w-[90%] relative h-[80%] mx-auto rounded-xl overflow-hidden">
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
            </div>
        </div>
    );
};

