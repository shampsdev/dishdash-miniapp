import { getLobbyStoreMethods } from '@/shared/stores/lobby.store';
import { Event } from '../event';
import { getLoadingStoreMethods } from '@/shared/stores/loading.store';

class ErrorEvent extends Event {
    handle() {
        const { setState } = getLobbyStoreMethods();
        const { setIsLoading } = getLoadingStoreMethods();
        setIsLoading(false);
        setState('error');
    }
}

export const errorEvent = new ErrorEvent();
