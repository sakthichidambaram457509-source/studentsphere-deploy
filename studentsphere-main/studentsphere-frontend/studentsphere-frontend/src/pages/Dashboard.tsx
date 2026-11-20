import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const savedUser = localStorage.getItem("studentsphere_user");
  const savedPoints = localStorage.getItem("studentsphere_points") || "1280";

  let user = {
    name: "Student",
    role: "student",
    department: "CSE",
    course: "Computer Science",
  };

  if (savedUser) {
    try {
      user = JSON.parse(savedUser);
    } catch {
      // fallback to default
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl p-8 shadow">

          <h1 className="text-4xl font-bold text-violet-700">
            StudentSphere
          </h1>

          <h2 className="text-3xl font-bold mt-8">
            Hello, {user.name} 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Welcome to your dashboard.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="p-6 rounded-2xl bg-violet-50">
              <p className="text-sm text-slate-500">
                Department
              </p>

              <h3 className="text-xl font-bold mt-2">
                {user.department || "CSE"}
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50">
              <p className="text-sm text-slate-500">
                Course
              </p>

              <h3 className="text-xl font-bold mt-2">
                {user.course || "Computer Science"}
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-yellow-50">
              <p className="text-sm text-slate-500">
                Points
              </p>

              <h3 className="text-xl font-bold mt-2">
                {savedPoints}
              </h3>
            </div>

          </div>

          <div className="flex flex-wrap gap-4 mt-8">

            <button
              onClick={() => navigate("/departments")}
              className="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition"
            >
              Find Study Groups
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("studentsphere_user");
                localStorage.removeItem("studentsphere_current_user");
                localStorage.removeItem("studentsphere_token");
                navigate("/");
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

