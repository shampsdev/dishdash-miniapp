import { useMatchStore } from '@/shared/stores/match.store';
import { matchEvent } from '@/shared/events/app-events/match.event';
import { CardComponent } from './card';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';

const MatchCard = () => {
  const { card } = useMatchStore();

  const webApp = useWebApp();

  const voteFinish = () => {
    matchEvent.vote(card?.id ?? 0, 1);
  };

  const voteContinue = () => {
    matchEvent.vote(card?.id ?? 0, 0);
  };

  // SecondaryButton слишком новая фича, либа ещё не имплементировала, надо будет сделать)
  useEffect(() => {
    webApp.MainButton.setText('Продолжить');
    webApp.MainButton.show();
    webApp.MainButton.enable();
    webApp.MainButton.onClick(voteContinue);

    webApp.SecondaryButton.setText('Закончить');
    webApp.SecondaryButton.show();
    webApp.SecondaryButton.enable();
    webApp.SecondaryButton.onClick(voteFinish);

    return () => {
      webApp.MainButton.hide();
      webApp.MainButton.offClick(voteContinue);

      webApp.SecondaryButton.hide();
      webApp.SecondaryButton.offClick(voteFinish);
    };
  }, [webApp]);

  return (
    <div
      className="flex h-screen flex-col justify-center items-center overflow-hidden  ${
      isDragging"
    >
      <div className="text-3xl py-5">Это метч!</div>
      <div
        id="cardsWrapper"
        className="aspect-[100/150] w-full max-w-[320px] xs:max-w-[420px] relative z-10"
      >
        {card && <CardComponent data={card} />}
      </div>
    </div>
  );
};

export default MatchCard;
