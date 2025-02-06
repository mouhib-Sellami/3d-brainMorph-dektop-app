import React, { useCallback, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { login } from '@/redux/slices/authSlice';
import { RootState, dispatch, useSelector } from '@/redux/store';
import { UserAuth } from '@/types/Auth';
import { User } from '@/types/User';


type SessionContextProps = {
    signIn: (data: UserAuth) => Promise<any>;
    signOut: () => Promise<void>;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null,
}
const SessionContext = React.createContext<Partial<SessionContextProps>>({});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(SessionContext);
    if (process.env.NODE_ENV === 'development') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }
    return value;
}

function SessionProvider(props: React.PropsWithChildren) {
    const { isLoading, user, isAuthenticated } = useAuth();
    const { isAlive } = useSelector(
        (state: RootState) => state.session
    )


    useEffect(() => {
        if (!isAlive) {
            signOut().then().catch()
        }
    }, [isAlive])

    const signIn = useCallback(async (data: UserAuth) => {
        const res = await dispatch(login(data))
        return res
    }, [])

    const signOut = useCallback(async () => {
    }, [])


    return (
        <SessionContext.Provider
            value={{
                isLoading,
                user,
                isAuthenticated,
                signOut,
                signIn,
            }}>
            {props.children}
        </SessionContext.Provider>
    );
}

export { SessionProvider, SessionContext };