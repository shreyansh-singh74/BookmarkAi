import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../features/auth/page/Signin";
import SignUp from "../features/auth/page/Signup";
import DashboardPage from "../features/dashboard/page/page";
import CollectionPage from "../features/collections/page/page";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collections"
          element={
            <ProtectedRoute>
              <CollectionPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
