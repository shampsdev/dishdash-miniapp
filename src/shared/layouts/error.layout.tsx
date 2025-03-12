import sadFace from '@/assets/icons/sad-face.png';
import { useErrorStore } from '@/shared/stores/error.store';
import { mainButton } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const ErrorLayout = () => {
  const navigate = useNavigate();
  const { setError, error } = useErrorStore();

  const onMainButtonClick = () => {
    setError(null);
    navigate('/');
  };

  useEffect(() => {
    if (error !== null) {
      mainButton.setParams({
        text: 'На Главную',
        isVisible: true
      });
      mainButton.onClick(onMainButtonClick);
    }

    return () => {
      if (error !== null) {
        mainButton.setParams({
          isVisible: false
        });
        mainButton.offClick(onMainButtonClick);
      }
    };
  }, [error]);

  return error !== null ? (
    <div className="flex space-y-3 h-[95vh] items-center justify-center flex-col">
      <div className="w-[30%] mx-auto pb-2">
        <img src={sadFace} />
      </div>
      <p className="text-2xl font-medium">Что-то пошло не так</p>
      <p className="w-[90%] text-center">
        Попробуйте перезайти или возвращайтесь позже
      </p>
    </div>
  ) : (
    <Outlet />
  );
};
