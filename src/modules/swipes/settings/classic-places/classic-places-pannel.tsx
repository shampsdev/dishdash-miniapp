import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { Slider } from '@/components/ui/slider';
import { useCallback } from 'react';
import { settingsUpdateEvent } from '../../events/app-events/settings.event';
import { Tags } from '../tags';

interface SettingsProps {
  settings: ClassicPlacesSettings;
}

export const ClassicPlacesSettingsPanel = ({ settings }: SettingsProps) => {
  const handleSettingsChange = useCallback(
    (newSettings: ClassicPlacesSettings) => {
      settingsUpdateEvent.update(newSettings);
    },
    []
  );

  const onPriceChange = (value: number[]) => {
    handleSettingsChange({
      type: 'classicPlaces',
      classicPlaces: {
        location: settings.classicPlaces.location,
        priceAvg: value[0],
        tags: settings.classicPlaces.tags,
        recommendation: settings.classicPlaces.recommendation
      }
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[90%] max-w-lg">
        <div className="grid grid-cols-2 gap-2 w-full max-h-[70vh] overflow-y-auto no-scrollbar">
          <Tags />
        </div>
      </div>
      <div className="mb-5 w-[90%] max-w-lg z-50">
        <div className="flex justify-between items-center mb-2">
          <p className="text-md font-medium">Средняя цена</p>
          <p className="text-md font-medium">
            {settings.classicPlaces.priceAvg}
          </p>{' '}
        </div>
        <Slider
          className="mt-1 mb-1 pt-2 pb-3 z-50"
          value={[settings.classicPlaces.priceAvg || 0]}
          onValueChange={onPriceChange}
          max={3000}
          min={0}
          step={100}
          id="price"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1 mb-2">
          <p>0 ₽</p>
          <p>3 000 ₽</p>
        </div>
      </div>
    </>
  );
};
