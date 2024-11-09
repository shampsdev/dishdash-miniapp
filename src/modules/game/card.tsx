import { Card } from '@/shared/types/card.interface';
import { useEffect, useState } from 'react';
import { motion, MotionValue, PanInfo, useTransform } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { getTime } from '@/shared/util/time.util';

import LikeIcon from '@/assets/icons/like.png';
import DislikeIcon from '@/assets/icons/dislike.png';
import WalkIcon from '@/assets/icons/walk.icon';

interface Props {
    data: Card;
    deltaY?: MotionValue;
}

export const CardComponent = ({ data, deltaY }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const { settings } = useLobbyStore();

    const { openLink } = useWebApp();

    const leftOpacity = deltaY ? useTransform(deltaY, [-5, 0, 5], [0, 0, 1]) : 0;
    const rightOpacity = deltaY ? useTransform(deltaY, [-5, 0, 5], [1, 0, 0]) : 0;

    const { disableVerticalSwipes, enableVerticalSwipes } = useWebApp();
    useEffect(() => {
        disableVerticalSwipes();

        return () => {
            enableVerticalSwipes();
        };
    }, []);

    useEffect(() => {
        console.log(expanded);
    }, [expanded]);

    const handleDrag = (_: any, info: PanInfo) => {
        if (Math.abs(info.delta.y) > Math.abs(info.delta.x)) {
            if (info.delta.y < 0 && Math.abs(info.offset.x) < 20) {
                setExpanded(true);
            } else {
                setExpanded(false);
            }
        }
    };

    return (
        <div className="relative h-full">
            <div className="h-[420px] w-full xs:h-[420px]">
                <div className="bg-slate-100 h-full w-full rounded-t-3xl overflow-hidden">
                    <img
                        draggable="false"
                        className="h-full w-auto min-w-full object-cover"
                        src={data.image}
                    />
                </div>
            </div>
            {deltaY &&
                <div className="w-full absolute flex p-5 top-0 justify-between h-14">
                    <motion.div style={{ opacity: leftOpacity }} className="w-12 h-12 bg-white rounded-full"><img className="p-3" src={LikeIcon} /></motion.div>
                    <motion.div style={{ opacity: rightOpacity }} className="w-12 h-12 bg-white rounded-full"><img className="p-3" src={DislikeIcon} /></motion.div>
                </div>}
            <div className="absolute top-0 w-full h-full">
                <motion.div
                    className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden"
                    initial={{ height: '43%' }}
                    animate={{ height: expanded ? '80%' : '43%' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    onDrag={handleDrag}
                >
                    <div className="h-1 bg-muted-foreground mb-1 rounded-full mx-auto w-14"></div>
                    <h1 className="text-white text-lg font-medium mx-4">{data.title}</h1>
                    <p className="px-4 text-muted-foreground">{data.tags.map(el => el.name).join(", ")}</p>
                    <div className="w-full grid grid-cols-2 gap-4 px-4 pt-3">
                        <div className="bg-background font-medium text-center py-1 rounded-xl">
                            ~ {data.priceAvg} ₽
                        </div>
                        <div className="flex bg-background font-medium gap-1 justify-center items-center py-1 rounded-xl">
                            <WalkIcon className="h-[1.2rem] w-[0.9rem] text-primary" /> {getTime(settings.location, data.location)}
                        </div>
                    </div>
                    <div className="h-full">
                        <p className="p-4 flex flex-col justify-between overflow-hidden text-foreground">
                            <div className={expanded ? 'line-clamp-[9]' : 'line-clamp-3'}>
                                {data?.description}
                            </div>
                            {
                                expanded &&
                                <div onClick={() => {
                                    const url = `https://yandex.ru/maps/?rtext=${data.location.lat}%2C${data.location.lon}`
                                    openLink(url);
                                }} className="underline pt-2">{data.address}</div>
                            }
                        </p>
                    </div>
                </motion.div>
            </div>
        </div >
    );
};
