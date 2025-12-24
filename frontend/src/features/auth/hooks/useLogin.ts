import { useState } from "react";
import { authApi, type signInData } from "../services/auth.api";
import { toast } from "sonner";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = async (data: signInData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authApi.SignIn(data);
      toast.success("Account logged in successfully!");
      return res;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login Failed!";
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, login };
};
