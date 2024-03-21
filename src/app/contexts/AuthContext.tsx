import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";

import { LaunchScreen } from "@components/LaunchScreen";
import { localStorageKeys } from "@config/localStorageKeys";
import type { User } from "@entities/User";
import { usersService } from "@services/usersService";

interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signIn(accessToken: string): void;
  signOut(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const queryClient = useQueryClient();

  const { isFetching, isError, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    queryClient.removeQueries({
      queryKey: ["users", "me"],
      exact: true
    });

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");

      signOut();
    }
  }, [isError, signOut]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data?.user,
        signIn,
        signOut
      }}
    >
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
