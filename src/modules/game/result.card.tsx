import WalkIcon from "@/assets/icons/walk.icon";
import { useLobbyStore } from "@/shared/stores/lobby.store";
import { Card } from "@/shared/types/card.interface";
import { getTime } from "@/shared/util/time.util";
import { useWebApp } from "@vkruglikov/react-telegram-web-app";

export const ResultCard = (data: { card: Card }) => {
    const { openLink } = useWebApp();
    const { settings } = useLobbyStore();

    return (
        <div className="bg-secondary flex justify-between gap-5 rounded-xl h-36 p-4 w-full">
            <div className="flex w-full flex-col justify-between">
                <div>
                    <p className="text-muted line-clamp-1">
                        {data.card.tags.map(el => el.name).join(", ")}
                    </p>
                    <p className="font-medium line-clamp-1">{data.card.title}</p>
                    <div onClick={() => {
                        const url = `https://yandex.ru/maps/?rtext=${data.card.location.lat}%2C${data.card.location.lon}`
                        openLink(url);
                    }} className="underline cursor-pointer line-clamp-1">{data.card.address}</div>
                </div>
                <div className="w-full text-primary grid grid-cols-2 gap-4 pt-3">
                    <div className="bg-background font-medium text-center py-1 rounded-xl">
                        ~ {data.card.priceAvg} ₽
                    </div>
                    <div className="flex bg-background font-medium gap-1 justify-center items-center py-1 rounded-xl">
                        <WalkIcon className="h-[1.2rem] w-[0.9rem] text-primary" /> {getTime(settings.location, data.card.location)}
                    </div>
                </div>
            </div>
            <img className="h-full aspect-square rounded-lg object-cover" src={data.card.image} />
        </div>
    )
}
