import { Outlet } from 'react-router-dom';

import sadFace from '@/assets/icons/sad-face.png';

export const VersionLayout = () => {
  return isVersionAtLeast('7.2') ? (
    <Outlet />
  ) : (
    <div className="flex space-y-3 h-[95vh] items-center justify-center flex-col">
      <div className="w-[30%] mx-auto pb-2">
        <img src={sadFace} />
      </div>
      <p className="text-2xl font-medium text-center">
        У вас слишком старая версия.
      </p>
      <p className="w-[90%] text-center">Попробуйте обновть телеграм</p>
    </div>
  );
};

function isVersionAtLeast(ver: string) {
  console.log(ver);
  return true;
}
