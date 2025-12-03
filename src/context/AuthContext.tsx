"use client";

import { ENV } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import {
  ResponseApi,
  ResponseAuth,
  User,
} from "@/interfaces/response.interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { toast } from "sonner";

interface AuthContextProps {
  token: string; // -> "" // "sadasdasd"
  user?: User; // -> undefined / { id: 1, name: "Juan" }
  isLoadingLogin: boolean;
  login: (userData: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const USER_STORAGE_KEY = "obstetra_user";
const TOKEN_STORAGE_KEY = "obstetra_token";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  const { mutate: login, isLoading: isLoadingLogin } = useMutation<
    ResponseApi<ResponseAuth>,
    { username: string; password: string }
  >({
    mutationFn: async (data) => {
      const res = await axios.post(`${ENV.API_URL}/users/login`, data);

      return res.data;
    },
    onSuccess({ data }) {
      setToken(data.token);
      setUser(data);

      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

      window.cookieStore.set("token", data.token);

      toast.success("Login exitoso");
      router.push("/");
    },
    onError() {
      toast.error("Error al iniciar sesion");
    },
  });

  const logout = () => {
    setToken("");
    setUser(undefined);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    window.cookieStore.delete("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoadingLogin,
        login,
        logout,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
