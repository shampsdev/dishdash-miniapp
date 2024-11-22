
import sadFace from '@/assets/icons/sad-face.png';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="flex space-y-3 h-[95vh] items-center justify-center flex-col">
            <div className="w-[30%] mx-auto pb-2">
                <img src={sadFace} />
            </div>
            <p className="text-2xl font-medium">Что-то пошло не так</p>
            <p className="w-[90%] text-center">Попробуйте перезайти или возвращайтесь позже</p>
            <MainButton onClick={() => navigate('/')} text='На Главную' />
        </div>
    )
}


