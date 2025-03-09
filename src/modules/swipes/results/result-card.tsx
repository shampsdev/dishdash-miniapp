import { Icons } from '@/assets/icons/icons';
import { ClassicPlacesSettings } from '@/modules/swipes/interfaces/settings/settings.interface';
import { getTime } from '@/shared/util/time.util';
import { useShowPopup, useWebApp } from '@vkruglikov/react-telegram-web-app';
import { useSettingsStore } from '../settings/settings.store';
import { ResultItem } from '@/modules/swipes/interfaces/results.interface';
import { Avatar } from '@/components/ui/avatar';

export const ResultCard = ({ card, likes }: ResultItem) => {
  const { openLink } = useWebApp();
  const showPopup = useShowPopup();

  const onPartnerClick = () => {
    showPopup({
      title: `${card.title} — заведение парнтер.`,
      message: 'DishDash партнерствует с кем попало))',
      buttons: [{
        text: 'Понятно!'
      }]
    })
  }

  const { settings: rawSettings } = useSettingsStore();
  const settings = rawSettings as ClassicPlacesSettings;

  return (
    <div className="flex flex-col bg-secondary rounded-xl overflow-hidden">
      <div className="flex justify-between gap-5 h-36 p-4 w-full">
        <div className="flex w-full flex-col justify-between">
          <div>
            <p className="text-foreground-muted line-clamp-1">
              {card.tags.map((el) => el.name).join(', ')}
            </p>
            <p className="font-medium line-clamp-1">{card.title}</p>
            <div
              onClick={() => {
                const url =
                  card.url !== null && card.url !== ''
                    ? card.url
                    : `https://yandex.ru/maps/?rtext=${card.location.lat}%2C${card.location.lon}`;
                openLink(url);
              }}
              className="underline cursor-pointer line-clamp-1"
            >
              {card.address}
            </div>
          </div>
          <div className="w-full text-primary grid grid-cols-2 gap-4 pt-3">
            <div className="bg-background font-medium text-center py-1 rounded-xl">
              ~ {card.priceAvg} ₽
            </div>
            <div className="flex bg-background font-medium gap-1 justify-center items-center py-1 rounded-xl">
              <Icons.walk className="h-[1.2rem] w-[.9rem] text-primary" />
              <p className="line-clamp-1">
                {getTime(settings.classicPlaces.location, card.location)}
              </p>
            </div>
          </div>
        </div>
        <img
          className="h-full aspect-square rounded-lg object-cover"
          src={card.images[0]}
        />
      </div>
      <div className="h-12 flex justify-between items-center bg-secondary-foreground p-4 gap-2">
        <div className="flex gap-2">
          {likes.flatMap((like) => (
            <Avatar
              key={`avatar_${like.telegram}`}
              style={{ border: 0, height: '30px', width: '30px' }}
              src={like.avatar}
            />
          ))}
        </div>
        {card.boost !== null && (
          <div onClick={onPartnerClick}>
            <Icons.award />
          </div>
        )}
      </div>
    </div>
  );
};
