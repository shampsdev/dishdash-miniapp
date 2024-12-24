import { useEffect } from 'react';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useNavigate, useParams } from 'react-router-dom';

export const useRoutes = () => {
  const { state } = useLobbyStore();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Это работает толко если URL страницы совпадает со стейтом)
    if (id != '') {
      navigate(`/${id}/${state}`);
    }
  }, [state]);
};
