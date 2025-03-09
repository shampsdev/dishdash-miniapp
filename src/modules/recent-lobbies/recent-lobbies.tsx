import { LobbyCard } from '@/modules/recent-lobbies/lobby-card';
import { useAuth } from '@/shared/hooks/useAuth';
import { motion } from 'framer-motion';

export const RecentLobbies = () => {
  const { recentLobbies } = useAuth();

  return (
    <div className="h-full flex pt-5 flex-col justify-end w-[90%] mx-auto mb-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: [0.25, 0.8, 0.5, 1] }}
        className="w-full gap-y-5 flex flex-col justify-end mb-auto"
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
    </div>
  );
};
