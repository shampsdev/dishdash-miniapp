import { useMatchStore } from '@/shared/stores/match.store';
import { matchEvent } from '@/shared/events/app-events/match.event';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

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
                <div className="relative h-full">
                    <div className="h-[380px] w-full">
                        <div className="bg-slate-100 h-full w-full rounded-t-3xl overflow-hidden">
                            <img
                                draggable="false"
                                className="h-full w-auto min-w-full object-cover"
                                src={card?.image}
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
                </div >
            </div>
        </div>
    );
};

export default MatchCard;
