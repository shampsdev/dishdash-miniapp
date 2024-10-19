import { CardComponent } from '@/modules/game/card';
import { useResultCardStore } from '@/shared/stores/result-card.store';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

const ResultPage = () => {
  const { card } = useResultCardStore();
  const { close } = useWebApp();

  close();

  return (
    <div
      className="flex min-h-screen h-full flex-col justify-center items-center overflow-hidden  ${
      isDragging"
    >
      <div
        id="cardsWrapper"
        className="w-full aspect-[100/170] max-w-[320px] xs:max-w-[420px] relative z-10"
      >
        {card && <CardComponent data={card} />}
      </div>
    </div>
  );
};

export default ResultPage;
