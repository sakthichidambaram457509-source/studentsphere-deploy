
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, Users, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"student" | "mentor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      let data: {
        error?: string;
        message?: string;
        userId?: string;
        name?: string;
        email?: string;
        role?: string;
        token?: string;
      } = {};

      try {
        data = await response.json();
      } catch {
        // response may not be JSON
      }

      if (!response.ok) {
        setError(data.message || data.error || `No ${role} account found with these credentials.`);
        return;
      }

      if (data.role && data.role.toLowerCase() !== role.toLowerCase()) {
        setError(`No ${role} account found with these credentials.`);
        return;
      }

      const user = {
        id: data.userId,
        name: data.name,
        email: data.email,
        role: (data.role || role).toLowerCase(),
        token: data.token,
      };

      localStorage.setItem("studentsphere_token", data.token || "");
      localStorage.setItem(
        "studentsphere_user",
        JSON.stringify(user)
      );
      localStorage.setItem(
        "studentsphere_current_user",
        JSON.stringify(user)
      );

      navigate("/dashboard");
    } catch {
      setError("Failed to connect to backend server. Make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* LOGO */}

        <div className="text-center mb-8">

          <div className="flex justify-center">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center shadow-lg">
              <GraduationCap size={32} />
            </div>

          </div>

          <h1 className="text-3xl font-bold mt-4">
            StudentSphere
          </h1>

          <p className="text-slate-500 mt-2">
            Learn • Connect • Grow
          </p>

        </div>

        {/* CARD */}

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">

          <h2 className="text-2xl font-bold">
            Welcome back 👋
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Login to continue your learning journey
          </p>

          {/* ROLE */}

          <div className="grid grid-cols-2 gap-3 mt-6">

            <button
              onClick={() => setRole("student")}
              className={`p-4 rounded-2xl border-2 transition ${
                role === "student"
                  ? "border-violet-600 bg-violet-50"
                  : "border-slate-200"
              }`}
            >

              <GraduationCap
                className={
                  role === "student"
                    ? "text-violet-600 mx-auto"
                    : "text-slate-400 mx-auto"
                }
              />

              <p className="font-bold mt-2">
                Student
              </p>

            </button>

            <button
              onClick={() => setRole("mentor")}
              className={`p-4 rounded-2xl border-2 transition ${
                role === "mentor"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200"
              }`}
            >

              <Users
                className={
                  role === "mentor"
                    ? "text-blue-600 mx-auto"
                    : "text-slate-400 mx-auto"
                }
              />

              <p className="font-bold mt-2">
                Mentor
              </p>

            </button>

          </div>

          {/* EMAIL */}

          <div className="mt-6">

            <label className="text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-violet-200"
            />

          </div>

          {/* PASSWORD */}

          <div className="mt-4">

            <label className="text-sm font-semibold">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-2 p-3 pr-12 border rounded-xl outline-none focus:ring-2 focus:ring-violet-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* LOGIN */}

          <button
            onClick={handleLogin}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold hover:opacity-90"
          >
            Login as {role === "student" ? "Student" : "Mentor"}
          </button>

          {/* REGISTER */}

          <p className="text-center text-sm text-slate-500 mt-6">

            Don't have an account?{" "}

            <button
              onClick={() => navigate("/register")}
              className="text-violet-600 font-bold"
            >
              Create Account
            </button>

          </p>

          <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Open academic community
          </div>

        </div>

      </div>

    </div>
  );
}

