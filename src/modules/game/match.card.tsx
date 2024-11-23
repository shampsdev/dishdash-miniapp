import { useMatchStore } from '@/shared/stores/match.store';
import { matchEvent } from '@/shared/events/app-events/match.event';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MatchCard = () => {
    const { card } = useMatchStore();

    const webApp = useWebApp();
    const { openLink } = webApp;

    const voteFinish = () => {
        matchEvent.vote(card?.id ?? 0, 1);
    };

    const voteContinue = () => {
        matchEvent.vote(card?.id ?? 0, 0);
    };

    // SecondaryButton слишком новая фича, либа ещё не имплементировала, надо будет сделать)
    useEffect(() => {
        webApp.MainButton.setText('Продолжить');
        webApp.MainButton.show();
        webApp.MainButton.enable();
        webApp.MainButton.onClick(voteContinue);

        webApp.SecondaryButton.setText('Закончить');
        webApp.SecondaryButton.show();
        webApp.SecondaryButton.enable();
        webApp.SecondaryButton.onClick(voteFinish);

        return () => {
            webApp.MainButton.hide();
            webApp.MainButton.offClick(voteContinue);

            webApp.SecondaryButton.hide();
            webApp.SecondaryButton.offClick(voteFinish);
        };
    }, [webApp]);

    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div
            className="flex h-screen flex-col justify-center items-center overflow-hidden  ${
      isDragging"
        >
            <div className="text-3xl py-5">Это мэтч!</div>
            <div
                id="cardsWrapper"
                className="w-full aspect-[30/35] max-w-[90vw] relative z-10"
            >
                <div className="w-full z-50 absolute opacity-50 px-5 gap-4 flex p-2 top-0 justify-between">
                    {card !== null && card.images.length > 1 && card.images.map((_, index) => {
                        return (
                            <div
                                key={`image_${index}`}
                                className={`${index == imageIndex ? 'bg-muted' : 'bg-muted-foreground'} h-[2px] w-full rounded-full`}
                            />
                        )
                    })}
                </div>
                <motion.div
                    onTap={(e: MouseEvent) => {
                        const boundingBox = (e.target as HTMLElement).getBoundingClientRect();
                        const tapX = e.clientX - boundingBox.left;
                        const elementWidth = boundingBox.width;

                        if (card == null) return;

                        setImageIndex((prevIndex) => {
                            if ((tapX + elementWidth / 4) < elementWidth / 2) {
                                return (prevIndex - 1 + card.images.length) % card.images.length;
                            } else if ((tapX - elementWidth / 4) > elementWidth / 2) {
                                return (prevIndex + 1) % card.images.length;
                            }
                            return prevIndex;
                        });
                    }}
                    className="relative h-full rounded-3xl overflow-hidden">
                    <div className="h-[380px] w-full">
                        <div className="bg-slate-100 h-full w-full rounded-3xl pb-4 overflow-hidden">
                            <img
                                draggable="false"
                                className="h-full w-auto min-w-full object-cover"
                                src={card?.images[imageIndex]}
                            />
                        </div>
                    </div>
                    <div className="absolute top-0 w-full h-full">
                        <div
                            className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden"
                        >
                            <h1 className="text-foreground text-lg font-medium mx-4">{card?.title}</h1>
                            <div className="h-full">
                                <p onClick={() => {
                                    const url = `https://yandex.ru/maps/?rtext=${card?.location.lat}%2C${card?.location.lon}`
                                    openLink(url);
                                }} className="p-4 pt-0 cursor-pointer underline flex flex-col justify-between overflow-hidden text-foreground">
                                    {card?.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div >
            </div>
        </div>
    );
};

export default MatchCard;
