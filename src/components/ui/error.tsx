import sadFace from '@/assets/icons/sad-face.png';
import { cn } from '@/lib/utils';
import { mainButton } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultErrorMessage = {
  error: 'Что-то пошло не так',
  message: 'Попробуйте перезайти или возвращайтесь позже'
};

interface ErrorProps {
  error?: string;
  message?: string;
  className?: string;
}

export const Error = ({
  error = defaultErrorMessage.error,
  message = defaultErrorMessage.message,
  className
}: ErrorProps) => {
  const navigate = useNavigate();

  const onMainButtonClick = () => {
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

  return (
    <div
      className={cn(
        className,
        'flex space-y-3 h-[95vh] items-center justify-center flex-col'
      )}
    >
      <div className="w-[30%] mx-auto pb-2">
        <img src={sadFace} />
      </div>
      <p className="text-2xl font-medium">{error}</p>
      <p className="w-[90%] text-center">{message}</p>
    </div>
  );
};
