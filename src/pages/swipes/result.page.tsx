import { ResultCard } from '@/modules/swipes/result.card';
import { useLobbyStore } from '@/modules/swipes/stores/lobby.store';
import { useResultStore } from '@/shared/stores/result.store';
import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultPage = () => {
  const { result } = useResultStore();
  const webApp = useWebApp();
  const navigate = useNavigate();
  const { setState } = useLobbyStore();

  const setMainScreen = () => {
    navigate('/');
  };

  const setSwipes = () => {
    setState('swiping');
  };

  useEffect(() => {
    webApp.BackButton.show();
    webApp.BackButton.onClick(setSwipes);

    return () => {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setSwipes);
    };
  }, []);

  return (
    <div className="min-h-screen h-full p-5">
      <h1 className="text-xl font-medium pb-2">Ваши мэтчи</h1>
      <div className="space-y-5 h-screen overflow-scroll w-full pt-4 pb-20">
        {result?.top.map((x) => (
          <ResultCard key={`result_card_${x.card.id}`} card={x.card} />
        ))}
      </div>
      <MainButton onClick={setMainScreen} text={'На Главную'} />
    </div>
  );
};
