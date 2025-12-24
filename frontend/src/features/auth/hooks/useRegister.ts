import { useState } from "react";
import { type signUpData,authApi } from "../services/auth.api";
import { toast } from "sonner";

export const useRegister = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (data:signUpData)=>{
        setIsLoading(true);
        setError(null);
        try{
            const res = await authApi.signUp(data);
            toast.success("Account Created successfully!");
            return res;
        }catch(err){
            const errorMessage = err instanceof Error ? err.message : "Registration failed";
            setError(errorMessage)
            toast.error(errorMessage)
            throw err;
        }finally{
            setIsLoading(false);
        }
    }
    return {register,isLoading,error};
}