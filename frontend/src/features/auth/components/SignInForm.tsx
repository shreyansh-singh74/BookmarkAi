import { useState } from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/v1/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error response:", errorData);
        
        // Display validation errors if they exist
        if (errorData.errors && errorData.errors.length > 0) {
          errorData.errors.forEach((err: any) => {
            toast.error(err.message || err);
          });
        } else {
          toast.error(errorData.error || "Sign in failed"); 
        }
        return;
      }

      const data = await res.json();
      console.log("Success response:", data);
      toast.success("Logged in successfully!");  

    } catch (error) {
      console.error("Fetch error:", error);
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

        <button 
          type="submit"  
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          Sign-In
        </button>
      </div>
    </form>
  );
}