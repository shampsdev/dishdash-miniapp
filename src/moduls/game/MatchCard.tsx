import { InfoIcon } from '@/assets/icons/info.icon';

import { type Card } from '@/types/game.type';
import { ButtonIcon } from '@/components/ui/button-icon';
import SwipeTag from './swipes-tags';
import { useMatchStore } from '@/store/match.store';

const categories = ['Кофе', 'Развлечения', 'Чай', 'Новые ощущения'];

type Props = {
  id?: number;
  data: Card;
};

const GameCard = ({ data }: Props) => {
  const { setMatchCard, setMatchId, setMatchStatus } = useMatchStore();

  return (
    <div
      className="flex mx-1 min-h-screen h-full flex-col justify-center items-center overflow-hidden  ${
      isDragging"
    >
      <div className="text-3xl pb-10">Это метч!</div>
      <div
        id="cardsWrapper"
        className="w-full aspect-[100/170] max-w-[320px] xs:max-w-[420px] relative z-10"
      >
        <div className="h-[360px] w-full xs:h-[420px] relative">
          <img className="rounded-3xl" src={data.Image} />
          <div className="absolute w-[90%] top-4 left-0 right-0 mx-auto flex justify-between items-center">
            <h3 className="py-2 px-4 rounded-3xl bg-white bg-opacity-80 backdrop-blur-sm">
              {data.Title}
            </h3>
            <ButtonIcon
              variant="outline"
              className="bg-white bg-opacity-80 backdrop-blur-sm h-10 w-10"
            >
              <InfoIcon />
            </ButtonIcon>
          </div>
        </div>
        <div className="-translate-y-12 pt-4 h-52 w-full rounded-3xl bg-white shadow-md overflow-hidden">
          <div className="mx-4 flex flex-wrap gap-2">
            {categories.map((el, index) => (
              <SwipeTag key={index}>{el}</SwipeTag>
            ))}
          </div>
          <p className="p-4">{data.Description}</p>
        </div>
      </div>
      <div
        onClick={() => {
          setMatchCard(null);
          setMatchId(null);
          setMatchStatus('swiping');
        }}
        className="px-4 py-2 m-2 bg-white shadow-md rounded-full cursor-pointer"
      >
        Продолжить
      </div>
    </div>
  );
};

export default GameCard;
