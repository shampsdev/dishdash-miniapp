import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import Loader from '@/components/ui/loader';
import { useLoadingStore } from '@/shared/stores/loading.store';
import { Outlet } from 'react-router-dom';
import { useWebApp } from '@vkruglikov/react-telegram-web-app';

import sadFace from '@/assets/icons/sad-face.png';
import { Toaster } from 'react-hot-toast';


const gameScreenVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: { duration: 2, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
    },
};

const loaderVariants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: { duration: 0.5, ease: cubicBezier(0.16, 1, 0.3, 1) },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: cubicBezier(0.7, 0, 0.84, 0) },
    },
};

export const GameComponent = () => {
    const { isLoading } = useLoadingStore();
    const { isVersionAtLeast } = useWebApp();

    return (
        <main className="h-screen mx-auto bg-background">
            <Toaster
                toastOptions={{
                    className: '!bg-secondary !text-foreground !rounded-xl !w-full',
                }}
            />
            {!isVersionAtLeast("7.2") ?
                <div className="flex space-y-3 h-[95vh] items-center justify-center flex-col">
                    <div className="w-[30%] mx-auto pb-2">
                        <img src={sadFace} />
                    </div>
                    <p className="text-2xl font-medium text-center">У вас слишком старая версия.</p>
                    <p className="w-[90%] text-center">Попробуйте обновть телеграм</p>
                </div>
                :
                <AnimatePresence>
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            variants={loaderVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Loader />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="gameScreen"
                            id="gameScreen"
                            variants={gameScreenVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Outlet />
                        </motion.div>
                    )}
                </AnimatePresence>
            }
        </main>
    );
};
