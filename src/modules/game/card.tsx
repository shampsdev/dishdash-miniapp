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
        if (Math.abs(info.delta.y) > Math.abs(info.delta.x) && Math.abs(info.offset.y) < 50) {
            if (info.delta.y < 0 && Math.abs(info.offset.x) < 20) {
                setExpanded(true);
            } else {
                setExpanded(false);
            }
        }
    };

    const [imageIndex, setImageIndex] = useState(0);

    return (
        <div className="relative h-full overflow-hidden rounded-3xl">
            <div className="w-full aspect-square">
                <div
                    className="bg-slate-100 h-full w-full rounded-t-3xl pb-4 overflow-hidden">
                    <img
                        draggable="false"
                        className="h-full w-auto min-w-full object-cover"
                        src={data.images[imageIndex]}
                    />
                </div>
            </div>
            <div className="w-full absolute opacity-50 px-5 gap-4 flex p-2 top-0 justify-between">
                {data.images.length > 1 && data.images.map((_, index) => {
                    return (
                        <div
                            key={`image_${index}`}
                            className={`${index == imageIndex ? 'bg-muted' : 'bg-muted-foreground'} h-[2px] w-full rounded-full`}
                        />
                    )
                })}
            </div>
            {deltaY &&
                <div className="w-full absolute flex p-5 top-0 justify-between h-14">
                    <motion.div style={{ opacity: leftOpacity }} className="w-12 h-12 bg-white rounded-full"><img className="p-3" src={LikeIcon} /></motion.div>
                    <motion.div style={{ opacity: rightOpacity }} className="w-12 h-12 bg-white rounded-full"><img className="p-3" src={DislikeIcon} /></motion.div>
                </div>}
            <motion.div
                onTap={(e: MouseEvent) => {
                    const boundingBox = (e.target as HTMLElement).getBoundingClientRect();
                    const tapX = e.clientX - boundingBox.left;
                    const elementWidth = boundingBox.width;

                    setImageIndex((prevIndex) => {
                        if ((tapX + elementWidth / 4) < elementWidth / 2) {
                            return (prevIndex - 1 + data.images.length) % data.images.length;
                        } else if ((tapX - elementWidth / 4) > elementWidth / 2) {
                            return (prevIndex + 1) % data.images.length;
                        }
                        return prevIndex;
                    });
                }}
                className="absolute top-0 w-full h-full"
            >
                <motion.div className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden"
                    initial={{ height: '43%' }}
                    animate={{ height: expanded ? '80%' : '43%' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    onDrag={handleDrag}
                >
                    <div className="h-1 bg-muted-foreground mb-1 rounded-full mx-auto w-14"></div>
                    <h1 className="text-foreground text-lg font-medium mx-4">{data.title}</h1>
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
            </motion.div>
        </div >
    );
};
