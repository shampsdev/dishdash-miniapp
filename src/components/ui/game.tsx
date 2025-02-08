import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const GameComponent = () => {
  return (
    <main className="h-screen mx-auto bg-background">
      <Toaster
        toastOptions={{
          className: '!bg-secondary !text-foreground !rounded-xl !w-full'
        }}
      />
      <Outlet />
    </main>
  );
};
