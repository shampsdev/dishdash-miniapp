import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { useSettingsStore } from '../settings.store';
import { useEffect } from 'react';
import { swipesEvent } from '../../events/app-events/swipes.event';
import { useNavigate } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useServerRouteStore } from '@/shared/stores/server-route.store';

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
  const webApp = useWebApp();

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
    webApp.BackButton.show();
    webApp.BackButton.onClick(setMainScreen);

    if (!ready) {
      webApp.MainButton.setText('Настроить');
      webApp.MainButton.show();
      webApp.MainButton.enable();
      webApp.MainButton.onClick(setSettings);
    } else {
      webApp.MainButton.setText('Начать');
      webApp.MainButton.show();
      webApp.MainButton.enable();
      webApp.MainButton.onClick(setStart);

      webApp.SecondaryButton.setText('Настроить');
      webApp.SecondaryButton.show();
      webApp.SecondaryButton.enable();
      webApp.SecondaryButton.onClick(setSettings);
    }

    return () => {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(setMainScreen);

      if (!ready) {
        webApp.MainButton.hide();
        webApp.MainButton.offClick(setSettings);
      } else {
        webApp.MainButton.hide();
        webApp.MainButton.offClick(setStart);

        webApp.SecondaryButton.hide();
        webApp.SecondaryButton.offClick(setSettings);
      }
    };
  }, [webApp, ready]);

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
