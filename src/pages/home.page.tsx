import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RecentLobbies } from '@/modules/recent-lobbies/recent-lobbies';

import { closeMiniApp, mainButton, openTelegramLink, sendData } from '@telegram-apps/sdk-react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselCard } from '@/modules/carousel/carousel-card';
import { BOT_USERNAME } from '@/shared/constants';

const responsive = {
  mobile: {
    breakpoint: { max: 5000, min: 0 },
    items: 1
  }
};

export const HomePage = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/map');
  };

  useEffect(() => {
    mainButton.setParams({
      hasShineEffect: true,
      text: 'Новое лобби',
      isVisible: true,
      isEnabled: true
    });

    mainButton.onClick(onButtonClick);
    // swipeBehavior.disableVertical();
    return () => {
      mainButton.setParams({
        hasShineEffect: false,
        isVisible: false
      });

      mainButton.offClick(onButtonClick);
      // swipeBehavior.enableVertical();
    };
  }, []);

  return (
    <div className="flex flex-col overflow-y-hidden h-svh mt-5">
      <div>
        <Carousel
          className="h-full"
          infinite
          arrows={false}
          responsive={responsive}
          autoPlay
        >
          <CarouselCard
            primaryText="Давай отдохнем в СПБ!"
            secondaryText="Подборка интересных мест от tg-канала нашей подруги Даши"
            onClick={() => openTelegramLink('https://t.me/+0UcR4sv0oYQzMTk6')}
            src={
              'https://s3.ru1.storage.beget.cloud/f5732312921d-dishdash/banners/davai_otdohnem.png'
            }
          />
          <CarouselCard
            primaryText="Telegram-канал команды разработчиков"
            secondaryText="Все о нас и наших проектах"
            onClick={() => openTelegramLink('https://t.me/shampsdev')}
            src={
              'https://storage.yandexcloud.net/dishash-s3/assets/banners/shamps.png'
            }
          />
          <CarouselCard
            primaryText="Ваше мнение о DishDash?"
            secondaryText="Всего пара минут вашего времени помогут нам стать лучше :3"
            onClick={() => {
              sendData('feedback');
              closeMiniApp();

              window.location.href = `https://t.me/${BOT_USERNAME}?start=feedback`;
            }}
            src={
              'https://storage.yandexcloud.net/dishash-s3/assets/banners/feedback.png'
            }
          />
        </Carousel>
      </div>
      <RecentLobbies />
    </div>
  );
};
