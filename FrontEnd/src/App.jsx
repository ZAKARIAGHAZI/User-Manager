import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import SignUp from "./components/signUp/SignUp";
import AdminDashboard from "./Pages/AdminPage";
import UserDashboard from "./Pages/UserPage";
import AdminRoute from "./Routes/AdminRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/dashboard/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
}

export default App