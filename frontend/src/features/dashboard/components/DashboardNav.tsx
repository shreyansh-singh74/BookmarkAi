import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/context/AuthContext";

export default function DashboardNav() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/sign-in");
  }

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      {/* attach here the name of the user */}
      <h1 className="text-xl font-semibold">Welcome {user?.name || "Guest"}</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
