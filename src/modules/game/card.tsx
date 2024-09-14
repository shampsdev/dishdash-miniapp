import { InfoIcon } from '@/assets/icons/info.icon';
import { ButtonIcon } from '@/components/ui/button-icon';
import { type Card as CardType } from '@/shared/types/game.type';
import SwipeTag from './card-tags';

interface Props {
  data: CardType;
}

export const CardComponent = ({ data }: Props) => {
  return (
    <div>
      <div className="h-[360px] w-full xs:h-[420px]">
        <div className="bg-slate-100 h-full w-full rounded-t-3xl overflow-hidden">
          <img
            draggable="false"
            className="h-full w-auto min-w-full object-cover"
            src={data.image}
          />
        </div>
        <div className="absolute w-[90%] top-4 left-0 right-0 mx-auto flex justify-between items-center">
          <h3 className="py-2 px-4 rounded-3xl bg-white bg-opacity-80 backdrop-blur-sm">
            {data.title.split(', ')[0]}
          </h3>
          <ButtonIcon
            variant="outline"
            className="bg-white bg-opacity-80 backdrop-blur-sm h-10 w-10"
          >
            <InfoIcon />
          </ButtonIcon>
        </div>
      </div>
      <div className="-translate-y-12 pt-4 w-full rounded-3xl bg-white shadow-md overflow-hidden">
        <div className="mx-4 flex flex-wrap gap-2">
          {data?.tags.map((el, index) => (
            <SwipeTag key={`${el}-${index}`}>{el.name}</SwipeTag>
          ))}
        </div>
        <p className="p-4">{data?.description}</p>
      </div>
    </div>
  );
};
