import Loader from '@/components/ui/loader';
import { useLoadingStore } from '@/shared/stores/loading.store';
import { Outlet } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

import sadFace from '@/assets/icons/sad-face.png';
import { Toaster } from 'react-hot-toast';


export const GameComponent = () => {
  const { isLoading } = useLoadingStore();
  const { isVersionAtLeast } = useWebApp();

  return (
    <main className="h-screen mx-auto bg-background">
      <Toaster
        toastOptions={{
          className: '!bg-secondary !text-foreground !rounded-xl !w-full'
        }}
      />
      {!isVersionAtLeast('7.2') ? (
        <div className="flex space-y-3 h-[95vh] items-center justify-center flex-col">
          <div className="w-[30%] mx-auto pb-2">
            <img src={sadFace} />
          </div>
          <p className="text-2xl font-medium text-center">
            У вас слишком старая версия.
          </p>
          <p className="w-[90%] text-center">Попробуйте обновть телеграм</p>
        </div>
      ) : isLoading ? (
        <Loader />
      ) : (
        <Outlet />
      )}
    </main>
  );
};
