import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, ssoLoginUser } from "../services/authService.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "north_ridge_auth";

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true
  });

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAuthState({
          isAuthenticated: true,
          user: parsed.user,
          token: parsed.token,
          loading: false
        });
        return;
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    setAuthState((current) => ({ ...current, loading: false }));
  }, []);

  async function login({ username, password, mfaCode, selectedRole }) {
    const result = await loginUser({
      username,
      password,
      mfaCode,
      selectedRole
    });

    const nextState = {
      isAuthenticated: true,
      user: result.user,
      token: result.token,
      loading: false
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    setAuthState(nextState);
    return result.user;
  }

  async function ssoLogin({ email, requestedRole }) {
    const result = await ssoLoginUser({
      email,
      requestedRole
    });

    const nextState = {
      isAuthenticated: true,
      user: result.user,
      token: result.token,
      loading: false
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    setAuthState(nextState);
    return result.user;
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false
    });
  }

  const value = useMemo(
    () => ({
      ...authState,
      login,
      ssoLogin,
      logout
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}