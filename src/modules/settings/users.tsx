import { Avatar } from '@/components/ui/avatar';
import { User } from '@/shared/interfaces/user.interface';

export const Users = ({ users }: { users: User[] }) => {
  return (
    <div className="relative h-7 w-16">
      {users.slice(0, 3).map((user, index) => {
        return (
          <Avatar
            key={user.name}
            style={{
              right: index * 18,
              top: '50%',
              translate: '0 -50%',
              position: 'absolute'
            }}
            src={user.avatar}
            fallback={'?'}
            fallbackElement={
              <span className="text-xs font-medium text-primary">
                {user?.name
                  .split(' ')
                  .slice(0, 2)
                  .map((x) => x.charAt(0))
                  .join('')
                  .toUpperCase()}
              </span>
            }
          />
        );
      })}
      {users.length > 3 && (
        <div className="text-[70%] absolute -right-2 -top-[10%] bg-primary rounded-[20px] px-[7%] pr-[10%]">
          +{users.length - 3}
        </div>
      )}
    </div>
  );
};
