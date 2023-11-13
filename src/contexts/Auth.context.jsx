import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api";

const JWT_TOKEN_KEY = "jwtToken";
const MEDEWERKER_ID_KEY = "medewerkerId";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
  const [medewerker, setMedewerker] = useState(null);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const {
    isMutating: loading,
    error,
    trigger: doLogin,
  } = useSWRMutation("medewerkers/login", api.post);

  const login = useCallback(
    async (email, wachtwoord) => {
      try {
        const { token, medewerker } = await doLogin({
          email,
          wachtwoord,
        });

        setToken(token);
        await setMedewerker(medewerker);

        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(MEDEWERKER_ID_KEY, medewerker.id);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin]
  );

  const logout = useCallback(() => {
    setToken(null);
    setMedewerker(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(MEDEWERKER_ID_KEY);
  }, []);

  const value = useMemo(
    () => ({
      token,
      medewerker,
      error,
      ready,
      loading,
      isAuthed,
      login,
      logout,
    }),
    [token, medewerker, error, ready, loading, isAuthed, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
