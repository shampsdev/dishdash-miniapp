import { useMatchStore } from '@/shared/stores/match.store';
import { matchEvent } from '@/shared/events/app-events/match.event';
import { CardComponent } from './card';

const MatchCard = () => {
  const { card } = useMatchStore();

  console.log(card);

  return (
    <div
      className="flex h-screen flex-col justify-center items-center overflow-hidden  ${
      isDragging"
    >
      <div className="text-3xl py-5">Это метч!</div>
      <div
        id="cardsWrapper"
        className="w-full max-w-[320px] xs:max-w-[420px] relative z-10"
      >
        {card && <CardComponent data={card} />}
      </div>
      <div className="flex flex-row gap-5 pb-10">
        <div
          onClick={() => {
            matchEvent.vote(card?.id ?? 0, 1);
          }}
          className="px-4 py-2 m-2 bg-white shadow-md rounded-full cursor-pointer"
        >
          Закончить
        </div>
        <div
          onClick={() => {
            matchEvent.vote(card?.id ?? 0, 0);
          }}
          className="px-4 py-2 m-2 bg-white shadow-md rounded-full cursor-pointer"
        >
          Продолжить
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
