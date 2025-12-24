import { useState } from "react";
import { toast } from "sonner";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

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

    try {how 
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
            type="text" 
            placeholder="Name"
            className="border rounded p-2"
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded p-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isLoading}
          required
        />

        <button 
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          disabled={isLoading}
        >
          Sign-Up
        </button>
      </div>
    </form>
  );
}
