import { CollectionPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useEffect, useState } from 'react';
import { Collection } from '@/shared/interfaces/collection.interface';
import { fetchCollection } from '@/shared/api/collections.api';
import { swipesEvent } from '../../events/app-events/swipes.event';
import { mainButton } from '@telegram-apps/sdk-react';

interface PreviewSettingsProps {
  settings: CollectionPlacesSettings;
  ready: boolean;
}

export const CollectionPlacesSettingsPreview = ({
  settings
}: PreviewSettingsProps) => {
  const [collection, setCollection] = useState<Collection | undefined>();

  useEffect(() => {
    fetchCollection(settings.collectionPlaces.collectionId).then((result) => {
      setCollection(result);
    });
  }, []);

  const setStart = () => {
    swipesEvent.start();
  };

  useEffect(() => {
    mainButton.setParams({
      text: 'Начать',
      isVisible: true,
      isEnabled: true
    });
    mainButton.onClick(setStart);

    return () => {
      mainButton.setParams({
        isVisible: false
      });
      mainButton.offClick(setStart);
    };
  }, []);

  return (
    collection != undefined && (
      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-center flex-wrap px-16 gap-2">
          <div className="h-20 w-20 flex items-center bg-secondary rounded-xl">
            <img className="p-1" src={collection.avatar} />
          </div>
        </div>
        <div className="text-primary font-medium py-2 px-3 bg-secondary rounded-xl w-fit text-center">
          {collection.name}
        </div>
      </div>
    )
  );
};
