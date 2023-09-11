import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";
import toast from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";

import { PageLoader } from "../../view/Components/PageLoader";
import { localStorageKeys } from "../config/localStorageKeys";
import { usersService } from "../services/usersService";

interface AuthContextValue {
  signedIn: boolean;
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

  const { isFetching, isError, isSuccess, remove } = useQuery({
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

    remove();

    setSignedIn(false);
  }, [remove]);

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");

      signOut();
    }
  }, [isError, signOut]);

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
