import { AuthProvider } from "../features/auth/context/AuthContext";
import AppRouter from "./router";

import { Toaster } from "sonner";
function App() {
  return (
    <>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
