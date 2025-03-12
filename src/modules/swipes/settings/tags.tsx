import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/shared/hooks/useTheme';
import Snow from '@/components/newYear/snow';
import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useSettingsStore } from './settings.store';
import { settingsUpdateEvent } from '../events/app-events/settings.event';
import { mainButton } from '@telegram-apps/sdk-react';

export const Tags = () => {
  const { settings: rawSettings, tags } = useSettingsStore();
  const settings = rawSettings as ClassicPlacesSettings;

  const theme = useTheme();

  const toggleCategoryType = (tagId: number) => {
    const found = settings.classicPlaces.tags.find((x) => x == tagId);
    let updatedTags: number[] = [];

    if (found != undefined) {
      updatedTags = settings.classicPlaces.tags.filter((x) => x != found);
    } else {
      updatedTags = [...settings.classicPlaces.tags, tagId];
    }
    if (updatedTags.length !== 0) {
      mainButton.setParams({
        isEnabled: true,
        backgroundColor: theme.buttonColor,
        textColor: theme.textColor
      });
    } else {
      mainButton.setParams({
        isEnabled: false,
        // @ts-expect-error I don't know how to make these types
        backgroundColor: theme.secondary,
        textColor: '#6F7072'
      });
    }

    const newSettings: ClassicPlacesSettings = {
      type: 'classicPlaces',
      classicPlaces: {
        location: settings.classicPlaces.location,
        priceAvg: settings.classicPlaces.priceAvg,
        tags: updatedTags,
        recommendation: settings.classicPlaces.recommendation
      }
    };

    settingsUpdateEvent.update(newSettings);
  };

  return (
    <>
      {tags
        .sort((a, b) => a.order - b.order)
        .map(
          (tag) =>
            tag.visible && (
              <Toggle
                key={tag.id}
                pressed={settings.classicPlaces.tags.some((x) => x === tag.id)}
                className="relative flex flex-col items-center rounded-xl transition-colors bg-secondary border-none duration-150 w-full h-fit"
                onClick={() => toggleCategoryType(tag.id)}
              >
                {tag.id === 6 && (
                  <div className="absolute inset-0 pointer-events-none z-0">
                    <Snow />
                  </div>
                )}

                <div className="relative z-10 h-[70%] w-[60%] aspect-square rounded-lg flex justify-center items-center">
                  <img className="w-full h-full aspect-square" src={tag.icon} />
                </div>

                <div className="mb-4 relative z-10">
                  <span className="text-lg relative z-10">{tag.name}</span>
                </div>
              </Toggle>
            )
        )}
    </>
  );
};
