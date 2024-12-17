import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { AnimatePresence, motion } from 'framer-motion';

import { useAuth } from '@/shared/hooks/useAuth';
import { LobbyCard } from '@/modules/home/lobby.card';
import { Avatar } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { user, recentLobbies, logoutUser } = useAuth();
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/map');
  };

  return (
    <div className="flex flex-col overflow-y-hidden h-svh mt-5">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: '0px' }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: '0px' }}
          className="pb-auto space-y-5"
          onClick={() => {
            logoutUser();
          }}
        >
          {user && (
            <Avatar
              src={user.avatar}
              fallback="?"
              style={{
                maxHeight: '100px',
                maxWidth: '100px',
                borderWidth: '5px',
                margin: 'auto'
              }}
              fallbackElement={
                <span className="text-[50px] font-medium text-primary">
                  {user?.name
                    .split(' ')
                    .slice(0, 2)
                    .map((x) => x.charAt(0))
                    .join('')
                    .toUpperCase()}
                </span>
              }
            />
          )}
          <h1 className="text-2xl font-medium text-center">
            Привет, <br /> {user?.name}!{' '}
          </h1>
        </motion.div>
      </AnimatePresence>
      <div className="h-full flex flex-col justify-end w-[90%] mx-auto mb-5">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, ease: [0.25, 0.8, 0.5, 1] }}
          className="w-full gap-y-5 flex flex-col justify-end mt-auto mb-auto"
        >
          <h1 className="text-center font-medium text-2xl">Последние лобби</h1>
          {recentLobbies.length > 0 ? (
            recentLobbies
              .slice(0, 2)
              .map((id, index) => <LobbyCard id={id} key={`${id}_${index}`} />)
          ) : (
            <p className="text-center">
              Здесь будет храниться история ваших последних лобби
            </p>
          )}
        </motion.div>
        <MainButton text="Новое Лобби" onClick={onButtonClick}></MainButton>
      </div>
    </div>
  );
};
