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
export const MEDEWERKER_ID_KEY = "medewerkerId";
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
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation("medewerkers/login", api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation("medewerkers/register", api.post);

  const setSession = useCallback((token, medewerker) => {
    setToken(token);
    setMedewerker(medewerker);

    localStorage.setItem(JWT_TOKEN_KEY, token);
    localStorage.setItem(MEDEWERKER_ID_KEY, medewerker.id);
  }, []);
  const login = useCallback(
    async (email, wachtwoord) => {
      try {
        const { token, medewerker } = await doLogin({
          email,
          wachtwoord,
        });

        setSession(token, medewerker);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin]
  );

  const register = useCallback(
    async (
      voornaam,
      naam,
      email,
      dienst,
      wachtwoord,
      bevestigingWachtwoord
    ) => {
      try {
        const { token, medewerker } = await doRegister({
          voornaam,
          naam,
          email,
          dienst,
          wachtwoord,
          bevestigingWachtwoord,
        });
        setSession(token, medewerker);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister, setSession]
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
      error: loginError || registerError,
      ready,
      loading: loginLoading || registerLoading,
      isAuthed,
      login,
      register,
      logout,
    }),
    [
      token,
      medewerker,
      loginError,
      registerError,
      ready,
      loginLoading,
      isAuthed,
      login,
      register,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
