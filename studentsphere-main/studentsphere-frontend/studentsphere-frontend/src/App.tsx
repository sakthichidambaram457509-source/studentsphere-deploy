
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import DepartmentDetails from "./pages/DepartmentDetails";
import CoursePage from "./pages/CoursePage";
import AITest from "./pages/AITest";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* ================= REGISTER ================= */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ================= DEPARTMENTS ================= */}

        <Route
          path="/departments"
          element={<Departments />}
        />

        {/* ================= DEPARTMENT DETAILS ================= */}

        <Route
          path="/departments/:id"
          element={<DepartmentDetails />}
        />

        {/* ================= COURSE PAGE ================= */}

        <Route
          path="/course/:id/:courseId"
          element={<CoursePage />}
        />

        {/* ================= AI TEST ================= */}

        <Route
          path="/course/:id/:courseId/test"
          element={<AITest />}
        />

        {/* ================= UNKNOWN URL ================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
