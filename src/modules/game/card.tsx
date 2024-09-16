import { InfoIcon } from '@/assets/icons/info.icon';
import { Card } from '@/shared/types/card.interface';
import { CardTag } from './card-tags';

interface Props {
  data: Card;
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
          <h3 className="py-2 px-4 rounded-3xl bg-background text-primary bg-opacity-80 backdrop-blur-sm">
            {data.title.split(', ')[0]}
          </h3>
          <div className="bg-background bg-opacity-80 backdrop-blur-sm h-10 w-10 rounded-full shadow-sm flex justify-center items-center text-primary">
            <InfoIcon />
          </div>
        </div>
      </div>
      <div className="-translate-y-12 pt-4 w-full rounded-3xl bg-secondary shadow-md overflow-hidden">
        <div className="mx-4 flex flex-wrap gap-2">
          {data?.tags.map((el, index) => (
            <CardTag key={`${el}-${index}`}>{el.name}</CardTag>
          ))}
        </div>
        <p className="p-4 text-foreground max-h-32">{data?.description}</p>
      </div>
    </div>
  );
};
