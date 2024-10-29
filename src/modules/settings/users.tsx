import { Avatar } from "@/components/ui/avatar";
import { useLobbyStore } from "@/shared/stores/lobby.store";

export const Users = () => {
    const { users } = useLobbyStore()

    return (
        <div className="relative h-full w-full">
            {users.slice(0, 3).map((user, index) => {
                return (
                    <Avatar
                        key={user.name}
                        style={{
                            right: index * 18,
                            top: '50%',
                            translate: '0 -50%',
                            position: 'absolute',
                        }}
                        src={`https://t.me/i/userpic/320/${user.name}.jpg`}
                    />
                );
            })}
            { users.length > 3 && <div className="text-sm absolute -right-3 top-[14px] bg-primary rounded-[20px] px-2">+{users.length - 3}</div>}
        </div>
    )
}
