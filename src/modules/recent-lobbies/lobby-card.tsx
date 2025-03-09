import { fetchLobby } from '@/shared/api/lobby.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from '@/shared/interfaces/tag.interface';
import { Users } from '@/modules/swipes/lobby/users';
import { Lobby } from '@/modules/swipes/interfaces/lobby.interface';
import { useSettingsStore } from '@/modules/swipes/settings/settings.store';
import { fetchTags } from '@/shared/api/tags.api';

interface LobbyCardProps {
  id: string;
}

export const LobbyCard = ({ id }: LobbyCardProps) => {
  const navigate = useNavigate();

  const { tags, setTags } = useSettingsStore();

  useEffect(() => {
    fetchTags().then((tags) => {
      if (tags != undefined) setTags(tags);
    });
  }, []);

  const [lobby, setLobby] = useState<Lobby | null>(null);

  useEffect(() => {
    fetchLobby(id).then((lobby) => setLobby(lobby ?? null));
  }, []);

  const getDiff = (time: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - time.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    const pluralize = (
      value: number,
      words: [string, string, string]
    ): string => {
      if (value % 10 === 1 && value % 100 !== 11) return words[0];
      if (
        value % 10 >= 2 &&
        value % 10 <= 4 &&
        (value % 100 < 10 || value % 100 >= 20)
      )
        return words[1];
      return words[2];
    };

    if (years > 0)
      return `${years} ${pluralize(years, ['год', 'года', 'лет'])} назад`;
    if (months > 0)
      return `${months} ${pluralize(months, ['месяц', 'месяца', 'месяцев'])} назад`;
    if (weeks > 0)
      return `${weeks} ${pluralize(weeks, ['неделя', 'недели', 'недель'])} назад`;
    if (days > 0)
      return `${days} ${pluralize(days, ['день', 'дня', 'дней'])} назад`;
    if (hours > 0)
      return `${hours} ${pluralize(hours, ['час', 'часа', 'часов'])} назад`;
    if (minutes > 0)
      return `${minutes} ${pluralize(minutes, ['минута', 'минуты', 'минут'])} назад`;
    if (seconds > 0)
      return `${seconds} ${pluralize(seconds, ['секунда', 'секунды', 'секунд'])} назад`;

    return 'только что';
  };

  const getLobbyCategories = (tags: Tag[]) => {
    return tags.length > 0
      ? tags
          .flatMap((x) => x.name)
          .join(', ')
          .toLowerCase()
      : 'Без тегов';
  };

  return (
    <div
      onClick={() => {
        navigate(`/${id}/${lobby?.state === 'lobby' ? 'lobby' : 'results'}`);
      }}
      className={`${lobby ? '' : 'animate-pulse'} cursor-pointer h-[90px] mx-auto p-3 px-4 flex pointer-events-auto w-full bg-secondary rounded-xl`}
    >
      {lobby && (
        <>
          <div className="w-full space-y-2">
            <div className="line-clamp-1">
              <p className="first-letter:capitalize">
                {getLobbyCategories(tags ?? [])}
              </p>
            </div>
            <p className="text-primary w-fit px-4 font-medium py-1 bg-background rounded-xl">
              {getDiff(new Date(lobby?.createdAt ?? ''))}
            </p>
          </div>
          <div className="w-fit h-6">
            <Users users={lobby?.users ?? []} />
          </div>
        </>
      )}
    </div>
  );
};
