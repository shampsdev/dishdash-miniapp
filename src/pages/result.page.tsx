import { ResultCard } from '@/modules/game/result.card';
import { useResultCardStore } from '@/shared/stores/result-card.store';
import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultPage = () => {
  const { result } = useResultCardStore();
  const webApp = useWebApp();
  const navigate = useNavigate();

  const setMainScreen = () => {
    navigate('/');
  };

  useEffect(() => {
    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    return () => {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);
    };
  }, []);

  return (
    <div className="min-h-screen h-full p-5">
      <h1 className="text-xl font-medium pb-2">Ваши мэчи</h1>
      <div className="space-y-5 h-screen overflow-scroll w-full pt-4 pb-20">
        {result?.matches.map((x) => (
          <ResultCard key={`${x.id}_${x.card.id}`} card={x.card} />
        ))}
      </div>
      <MainButton onClick={setMainScreen} text={'На Главную'} />
    </div>
  );
};
