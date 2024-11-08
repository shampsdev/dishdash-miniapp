import { ResultCard } from '@/modules/game/result.card';
import { useResultCardStore } from '@/shared/stores/result-card.store';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

export const ResultPage = () => {
    const { result } = useResultCardStore();
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen h-full p-5"
        >
            <h1 className="text-xl font-medium" >Ваши метчи</h1>
            <div className="space-y-5 h-full overflow-scroll w-full pt-4">
                {result?.matches.map((x) => <ResultCard key={`${x.id}_${x.card.id}`} card={x.card} />)}
            </div>
            <MainButton onClick={() => {
                navigate('/');
            }} text={'На Главную'} />
        </div>
    );
};

