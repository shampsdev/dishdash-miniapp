import { MainButton, useWebApp } from '@vkruglikov/react-telegram-web-app';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RecentLobbies } from '@/modules/home/recent-lobbies.module';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselCard } from '@/components/carouselCard';
import { BOT_USERNAME } from '@/shared/constants';

const responsive = {
  mobile: {
    breakpoint: { max: 5000, min: 0 },
    items: 1
  }
};

export const HomePage = () => {
  const navigate = useNavigate();

  const webApp = useWebApp();
  const { disableVerticalSwipes, enableVerticalSwipes, openTelegramLink } =
    webApp;

  useEffect(() => {
    disableVerticalSwipes();
    return () => {
      enableVerticalSwipes();
    };
  }, []);

  const onButtonClick = () => {
    navigate('/map');
  };

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
            primaryText="Новогоднее ОБНОВЛЕНИЕ"
            secondaryText="Смотрите лучшие праздничные места в новой подборке!"
            onClick={onButtonClick}
            src={
              'https://storage.yandexcloud.net/dishash-s3/assets/banners/feliz-navidad.png'
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
              webApp.sendData('feedback');

              webApp.close();

              window.location.href = `https://t.me/${BOT_USERNAME}?start=feedback`;
            }}
            src={
              'https://storage.yandexcloud.net/dishash-s3/assets/banners/feedback.png'
            }
          />
        </Carousel>
      </div>
      <RecentLobbies />
      <MainButton text="Новое Лобби" onClick={onButtonClick}></MainButton>
    </div>
  );
};
