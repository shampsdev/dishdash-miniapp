import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useSettingsStore } from './settings.store';

interface PreviewSettingsProps {
  settings: ClassicPlacesSettings;
}

export const ClassicPlacesPreviewSettings = ({
  settings
}: PreviewSettingsProps) => {
  const { tags } = useSettingsStore();

  return settings.classicPlaces && settings.classicPlaces.tags.length > 0 ? (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center flex-wrap px-16 gap-2">
        {tags
          .filter((x) => settings.classicPlaces.tags.includes(x.id))
          .map((x, index) => (
            <div
              key={`${x.id}_${index}`}
              className="h-20 w-20 flex items-center bg-secondary rounded-xl"
            >
              <img className="p-1" src={x.icon} />
            </div>
          ))}
      </div>
      <div className="text-primary font-medium py-2 px-3 bg-secondary rounded-xl w-fit text-center">
        ~ {settings.classicPlaces.priceAvg} ₽
      </div>
    </div>
  ) : (
    <p>
      Пока что вы ничего не выбрали :( <br />
      Перейдите в настройки
    </p>
  );
};
