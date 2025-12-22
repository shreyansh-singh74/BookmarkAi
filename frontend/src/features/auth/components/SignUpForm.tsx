import { useState } from "react";
import { toast } from "sonner";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password != confirmPassword) {
      toast("Password doesn't Match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        toast.error(errorData.message || "Signup failed");
        return;
      }

      const data= await res.json();

      console.log("Success response: ",data);
      toast.success("Account created successfully");

    } catch(error) {
      console.error("Fetch error: ",error);
      toast.error("Something went wrong");
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
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded p-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          Sign-Up
        </button>
      </div>
    </form>
  );
}
