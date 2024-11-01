import { ResultCard } from '@/modules/game/result.card';
import { useResultCardStore } from '@/shared/stores/result-card.store';

const ResultPage = () => {
    const { result } = useResultCardStore();

    console.log(result)

    return (
        <div
            className="min-h-screen h-full overflow-hidden p-5"
        >
            <h1 className="text-xl font-medium" >Ваши метчи</h1>
            <div className="space-y-5 h-full w-full pt-4">
                {result?.matches.map((x) => <ResultCard key={`${x.id}_${x.card.id}`} card={x.card} />)}
            </div>
        </div>
    );
};

export default ResultPage;
