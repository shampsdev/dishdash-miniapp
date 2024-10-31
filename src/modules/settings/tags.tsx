import { settingsUpdateEvent } from "@/shared/events/app-events/settings.event";
import { useLobbyStore } from "@/shared/stores/lobby.store";
import { useEffect } from "react";
import { fetchTags } from "@/shared/api/tags.api"
import { Toggle } from "@/components/ui/toggle";

export const Tags = () => {
    const { settings, tags, setTags } = useLobbyStore();

    const toggleCategoryType = (tagId: number) => {
        const found = settings.tags.find((x) => x == tagId);
        let updatedTags: number[] = [];

        if (found != undefined) {
            updatedTags = settings.tags.filter((x) => x != found);
        } else {
            updatedTags = [...settings.tags, tagId];
        }

        settingsUpdateEvent.update({
            priceMin: settings.priceMin,
            priceMax: settings.priceMax,
            maxDistance: settings.maxDistance,
            tags: updatedTags,
            location: settings.location,
        });
    };

    useEffect(() => {
        fetchTags().then((tags) => {
            console.log(tags);
            if (tags != undefined) setTags(tags);
        });
    }, []);

    return (
        <>
            {tags
                .sort((a, b) => a.id - b.id)
                .map((tag) => (
                    <Toggle
                        key={tag.id}
                        pressed={settings.tags.some((x) => x === tag.id)}
                        className={
                            'flex gap-5 items-center justify-start py-8 px-3 rounded-xl transition-colors bg-secondary border-none duration-150 w-full'
                        }
                        onClick={() => toggleCategoryType(tag.id)}
                    >
                        <div className="h-[40px] aspect-square bg-background rounded-lg">
                            <img className="h-[40px] pt-1 aspect-square" src={tag.icon} />
                        </div>
                        <div className="flex items-center">
                            <span className="text-lg font-normal">{tag.name}</span>
                        </div>
                    </Toggle>
                ))}
        </>
    )
}
