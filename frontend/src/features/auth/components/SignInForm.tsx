import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isLoading,login} = useLogin();
  const navigate = useNavigate();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login({email,password}); 
      // making elements 
      setEmail("");
      setPassword("");

      // redirect
      navigate("/dashboard")

    } catch (error) {

    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2"
          value={password}  
          onChange={(e) => setPassword(e.target.value)}  
          disabled={isLoading}
          required
        />

        <button 
          type="submit"  
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign-In"}
        </button>
      </div>
    </form>
  );
}