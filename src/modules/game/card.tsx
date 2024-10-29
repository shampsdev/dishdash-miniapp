import { InfoIcon } from '@/assets/icons/info.icon';
import { Card } from '@/shared/types/card.interface';
import { CardTag } from '../../components/ui/card-tag';
import { useEffect, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { getTime } from '@/shared/util/time.util';
import WalkIcon from '@/assets/icons/walk.icon';

interface Props {
    data: Card;
}

export const CardComponent = ({ data }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const { settings } = useLobbyStore();

    const { disableVerticalSwipes, enableVerticalSwipes } = useWebApp();
    useEffect(() => {
        disableVerticalSwipes();

        return () => {
            enableVerticalSwipes();
        };
    }, []);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        console.log(expanded);
    }, [expanded]);

    const handleDrag = (_: any, info: PanInfo) => {
        if (info.offset.y < -20 && !expanded) {
            setExpanded(true);
        } else if (info.offset.y > 20 && expanded) {
            setExpanded(false);
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
            <div className="absolute top-0 w-full h-full">
                <motion.div
                    className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden"
                    initial={{ height: '30%' }}
                    animate={{ height: expanded ? '80%' : '35%' }}
                    transition={{ duration: 0.4, ease: [0.25, 0.8, 0.5, 1] }}
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0}
                    onDrag={handleDrag}
                >
                    <h1 className="text-white text-lg font-medium mx-4">{data.title}</h1>
                    <p className="px-4 text-muted-foreground">{data.tags.map(el => el.name).join(", ")}</p>
                    <div className="w-full grid grid-cols-2 gap-5 px-4 pt-3">
                        <div className="bg-background font-medium text-center py-1 rounded-xl">
                            ~ {data.priceAvg} ₽
                        </div>
                        <div className="flex bg-background font-medium gap-1 justify-center items-center py-1 rounded-xl">
                            <WalkIcon className="h-[1.2rem] w-[0.9rem] text-primary" /> {getTime(settings.location, data.location)}
                        </div>
                    </div>
                    <div className="h-full">
                        <p className="p-4 overflow-hidden text-foreground after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-8 after:bg-gradient-to-b after:from-transparent after:to-secondary">
                            {data?.description}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div >
    );
};
