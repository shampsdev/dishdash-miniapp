import { Avatar } from '@/components/ui/avatar';
import { useAuth } from '@/shared/hooks/useAuth';
import { StyledMap, StyledMapProps } from './styled-map';

export const SelectPointMap = (props: StyledMapProps) => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-svh z-[50] relative">
      <StyledMap {...props} />
      <div className="z-[1000] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute pointer-events-none">
        {user && (
          <Avatar
            src={user.avatar}
            style={{
              borderColor: 'var(--primary)',
              maxWidth: '40px',
              maxHeight: '40px',
              borderWidth: '3px'
            }}
          />
        )}
      </div>
    </div>
  );
};
