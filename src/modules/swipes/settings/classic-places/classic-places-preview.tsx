import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useSettingsStore } from '../settings.store';
import { useEffect } from 'react';
import { swipesEvent } from '../../events/app-events/swipes.event';
import { useNavigate } from 'react-router-dom';
import { useServerRouteStore } from '@/shared/stores/server-route.store';
import {
  backButton,
  mainButton,
  secondaryButton
} from '@telegram-apps/sdk-react';

interface PreviewSettingsProps {
  settings: ClassicPlacesSettings;
  ready: boolean;
}

export const ClassicPlacesSettingsPreview = ({
  settings,
  ready
}: PreviewSettingsProps) => {
  const { tags } = useSettingsStore();
  const { setRoute } = useServerRouteStore();

  const navigate = useNavigate();

  const setSettings = () => {
    setRoute('settings');
  };

  const setMainScreen = () => {
    navigate('/');
  };

  const setStart = () => {
    swipesEvent.start();
  };

  useEffect(() => {
    backButton.show();
    backButton.onClick(setMainScreen);

    if (!ready) {
      mainButton.setParams({
        text: 'Настроить',
        isVisible: true,
        isEnabled: true
      });
      mainButton.onClick(setSettings);
    } else {
      mainButton.setParams({
        text: 'Начать',
        isVisible: true,
        isEnabled: true
      });
      mainButton.onClick(setStart);

      secondaryButton.setParams({
        text: 'Настроить',
        isVisible: true,
        isEnabled: true
      });
      secondaryButton.onClick(setSettings);
    }

    return () => {
      backButton.hide();
      backButton.offClick(setMainScreen);

      if (!ready) {
        mainButton.setParams({
          isVisible: false
        });
        mainButton.offClick(setSettings);
      } else {
        mainButton.setParams({
          isVisible: false
        });
        mainButton.offClick(setStart);

        secondaryButton.setParams({
          isVisible: false
        });
        secondaryButton.offClick(setSettings);
      }
    };
  }, [ready]);

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
