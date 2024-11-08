import { useEffect } from 'react';
import { useLobbyStore } from '@/shared/stores/lobby.store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const useRoutes = () => {
    const { state } = useLobbyStore();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Это работает толко если URL страницы совпадает со стейтом)
        if (id != '') {
            console.log(id, state, location);
            navigate(`/${id}/${state}`);
        }
    }, [state]);
};
