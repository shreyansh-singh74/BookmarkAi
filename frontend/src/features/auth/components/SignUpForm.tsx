import { useState } from "react";
import { toast } from "sonner";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {register,isLoading} = useRegister();
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password != confirmPassword) {
      toast("Password doesn't Match");
      return;
    }

    try {
      await register({name,email,password});
      
      // for clearing the form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // redirect
      navigate("/dashboard")


    }catch(error){

    }
  }

  return (
    <div className="h-screen flex items-center justify-center from-slate-50 to-slate-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
            <Input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
              className="w-full"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">Already have an account?</p>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate('/sign-in')}
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
