import sadFace from '@/assets/icons/sad-face.png';
import { cn } from '@/lib/utils';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
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
      <MainButton onClick={() => navigate('/')} text="На Главную" />
    </div>
  );
};
