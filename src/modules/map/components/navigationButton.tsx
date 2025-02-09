import { Navigation } from 'lucide-react';

interface NavigationButtonProps {
  onClick?: () => void;
  active?: boolean;
}

export const NavigationButton = ({
  active,
  onClick
}: NavigationButtonProps) => (
  <div
    className="absolute active:opacity-75 right-3 bottom-3 z-[1000] flex justify-center cursor-pointer rounded-full items-center h-12 w-12 bg-background p-[5px]"
    onClick={onClick}
  >
    <Navigation
      fill={active ? 'var(--primary)' : 'var(--muted-foreground)'}
      stroke={active ? 'var(--primary)' : 'var(--muted-foreground)'}
      color="var(--primary)"
      strokeWidth={3}
      className="-translate-x-[8%] translate-y-[8%]"
    />
  </div>
);
