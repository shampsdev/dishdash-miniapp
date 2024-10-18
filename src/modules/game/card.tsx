import { InfoIcon } from '@/assets/icons/info.icon';
import { Card } from '@/shared/types/card.interface';
import { CardTag } from '../../components/ui/card-tag';
import { useEffect, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

interface Props {
  data: Card;
}

export const CardComponent = ({ data }: Props) => {
  const [expanded, setExpanded] = useState(false);

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

  const handleDragEnd = (_: any, info: PanInfo) => {
    console.log(info.offset);
    if (info.offset.y < -20) {
      // Swipe up detected
      setExpanded(true);
    } else if (info.offset.y > 20) {
      // Swipe down detected
      setExpanded(false);
    }
  };

  return (
    <div className="relative h-full">
      <div className="h-[360px] w-full xs:h-[420px]">
        <div className="bg-slate-100 h-full w-full rounded-t-3xl overflow-hidden">
          <img
            draggable="false"
            className="h-full w-auto min-w-full object-cover"
            src={data.image}
          />
        </div>
        <div className="absolute w-[90%] top-4 left-0 right-0 mx-auto flex justify-between items-center">
          <h3 className="py-2 px-4 rounded-3xl bg-background text-primary bg-opacity-80 backdrop-blur-sm">
            {data.title.split(', ')[0]}
          </h3>
          <div
            onClick={toggleExpand}
            className="bg-background bg-opacity-80 backdrop-blur-sm h-10 w-10 rounded-full shadow-sm flex justify-center items-center text-primary"
          >
            <InfoIcon />
          </div>
        </div>
      </div>
      <div className="absolute top-0 w-full h-full">
        <motion.div
          className="absolute pt-4 bottom-0 w-full rounded-3xl bg-secondary shadow-md overflow-hidden"
          initial={{ height: '30%' }}
          animate={{ height: expanded ? '80%' : '30%' }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0}
          onDrag={() => {
            console.log('drag');
          }}
          onClick={toggleExpand}
          onDragEnd={handleDragEnd}
        >
          <div className="mx-4 flex flex-wrap gap-2">
            {data?.tags.map((el, index) => (
              <CardTag key={`${el}-${index}`}>{el.name}</CardTag>
            ))}
            <CardTag key="price">{`~ ${data.priceAvg.toString()}₽`}</CardTag>
          </div>
          <p className="p-4 overflow-hidden text-foreground after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-8 after:bg-gradient-to-b after:from-transparent after:to-secondary">
            {data?.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
