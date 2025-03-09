import { Icons } from '@/assets/icons/icons';
import { ResultCard } from '@/modules/swipes/results/result-card';
import { useResultStore } from '@/modules/swipes/results/result.store';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ResultPage = () => {
  const { result } = useResultStore();
  const webApp = useWebApp();
  const navigate = useNavigate();

  const { setRoute } = useServerRouteStore();

  const setMainScreen = () => {
    navigate('/');
  };

  const setSwipes = () => {
    setRoute('swiping');
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
      <div className="flex pb-2 justify-between">
        <div
          onClick={setSwipes}
          className="cursor-pointer h-fit active:scale-95 transition-transform flex bg-secondary-foreground text-primary font-medium gap-2 justify-center items-center py-1 px-3 rounded-xl"
        >
          <Icons.arrowLeft className="text-primary" />
          Свайпы
        </div>
        <h1 className="text-xl font-medium pb-2">Ваши мэтчи</h1>
        <div></div>
      </div>
      <div className="space-y-5 h-screen overflow-scroll w-full pt-4 pb-20">
        {result?.top.map((x) => (
          <ResultCard
            key={`result_card_${x.card.id}`}
            card={x.card}
            likes={x.likes}
          />
        ))}
      </div>
      <MainButton onClick={setMainScreen} text={'На Главную'} />
    </div>
  );
};
