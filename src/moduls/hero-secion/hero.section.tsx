import { Button } from '@/components/ui/button';
import bigCircle from '@/assets/icons/big-circle.svg';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="mx-auto h-screen grid place-items-center">
      <div className="flex flex-col items-center">
        <div className="max-w-[500px] w-full mx-auto">
          <img className="w-full" src={bigCircle} />
        </div>
        <div className="text-center mt-10">
          <h5>Куда пойти сегодня</h5>
          <h3 className="mt-3 text-xl">
            Открывайте новые места
            <br />
            для прогулок
          </h3>
          <div className="mt-6 flex justify-center gap-x-6">
            <Link to="/lobby">
              <Button
                className="w-40 h-10 text-md rounded-3xl"
                variant="secondary"
              >
                Одному
              </Button>
            </Link>
            <Link to="/lobby">
              <Button className="w-40 h-10 text-md rounded-3xl">
                С компанией
              </Button>
            </Link>
            <Link to="/settings">
              <Button className="w-40 h-10 text-md rounded-3xl">
                Настройки
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
