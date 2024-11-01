import { Card } from "@/shared/types/card.interface";

export const ResultCard = (data: { card: Card }) => {
    return (
        <div className="bg-secondary flex justify-between rounded-xl h-36 p-4 w-full">
            <div className="flex flex-col">
                <div>
                    <p className="text-muted">
                        {data.card.tags.map(el => el.name).join(", ")}
                    </p>
                    <p className="font-medium">{data.card.title}</p>
                </div>
            </div>
            <img className="h-full aspect-square rounded-lg" src={data.card.image} />
        </div>
    )
}
