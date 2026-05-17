import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RequirementsPage from "./pages/RequirementsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/requirements"
        element={
          <ProtectedRoute>
            <RequirementsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;