
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Search,
  Users,
} from "lucide-react";

const departments = [
  {
    id: "cse",
    name: "Computer Science",
    short: "CSE",
    icon: "💻",
    students: 1240,
    courses: [
      "Data Structures",
      "Operating Systems",
      "Database Management Systems",
      "Computer Networks",
      "Object Oriented Programming",
      "Theory of Computation",
      "Web Development",
      "Artificial Intelligence",
    ],
  },

  {
    id: "aids",
    name: "Artificial Intelligence & Data Science",
    short: "AI & DS",
    icon: "🤖",
    students: 860,
    courses: [
      "Machine Learning",
      "Artificial Intelligence",
      "Data Science",
      "Deep Learning",
      "Natural Language Processing",
      "Data Visualization",
      "Statistics",
    ],
  },

  {
    id: "ece",
    name: "Electronics & Communication",
    short: "ECE",
    icon: "📡",
    students: 980,
    courses: [
      "Digital Electronics",
      "Analog Electronics",
      "Signals & Systems",
      "Communication Systems",
      "Microprocessors",
      "VLSI Design",
      "Embedded Systems",
    ],
  },

  {
    id: "eee",
    name: "Electrical & Electronics",
    short: "EEE",
    icon: "⚡",
    students: 720,
    courses: [
      "Circuit Theory",
      "Electrical Machines",
      "Power Systems",
      "Control Systems",
      "Power Electronics",
      "Electrical Measurements",
    ],
  },

  {
    id: "mech",
    name: "Mechanical Engineering",
    short: "MECH",
    icon: "⚙️",
    students: 690,
    courses: [
      "Engineering Mechanics",
      "Thermodynamics",
      "Fluid Mechanics",
      "Manufacturing Technology",
      "Machine Design",
      "Heat Transfer",
      "CAD / CAM",
    ],
  },

  {
    id: "civil",
    name: "Civil Engineering",
    short: "CIVIL",
    icon: "🏗️",
    students: 610,
    courses: [
      "Structural Analysis",
      "Engineering Geology",
      "Concrete Technology",
      "Fluid Mechanics",
      "Surveying",
      "Transportation Engineering",
      "Environmental Engineering",
    ],
  },

  {
    id: "it",
    name: "Information Technology",
    short: "IT",
    icon: "🌐",
    students: 780,
    courses: [
      "Web Technology",
      "Cloud Computing",
      "Cyber Security",
      "Software Engineering",
      "Mobile Application Development",
      "Computer Networks",
      "Data Analytics",
    ],
  },
];

export default function Departments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredDepartments = departments.filter((department) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) {
      return true;
    }

    const departmentMatch =
      department.name.toLowerCase().includes(searchText) ||
      department.short.toLowerCase().includes(searchText);

    const courseMatch = department.courses.some((course) =>
      course.toLowerCase().includes(searchText)
    );

    return departmentMatch || courseMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* BACK BUTTON */}

            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
              title="Back to Dashboard"
            >
              <ArrowLeft size={18} />
            </button>

            {/* LOGO */}

            <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center">
              <GraduationCap size={22} />
            </div>

            {/* BRAND */}

            <div>
              <h1 className="font-bold text-slate-800">
                StudentSphere
              </h1>

              <p className="text-xs text-slate-400">
                Academic Communities
              </p>
            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">

            <Users size={17} />

            <span>
              Open Academic Network
            </span>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          {/* SMALL TITLE */}

          <div className="flex items-center gap-2 text-sm text-white/70">
            <GraduationCap size={17} />

            <span>
              StudentSphere • Discover
            </span>
          </div>

          {/* MAIN TITLE */}

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Explore Departments
          </h1>

          {/* DESCRIPTION */}

          <p className="max-w-2xl mt-4 text-white/70 text-base md:text-lg">
            Discover courses, study groups, mentors and learning
            communities across every department.
          </p>

          {/* SEARCH */}

          <div className="max-w-2xl mt-8">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search department or course..."
                className="w-full bg-white text-slate-800 placeholder:text-slate-400 rounded-2xl py-4 pl-12 pr-5 outline-none shadow-xl focus:ring-4 focus:ring-white/20"
              />

            </div>

          </div>

        </div>

      </section>

      {/* ================= MAIN CONTENT ================= */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* TITLE ROW */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              All Departments
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Explore any department and join its open course
              communities.
            </p>

          </div>

          {/* OPEN COMMUNITY BADGE */}

          <div className="w-fit flex items-center gap-2 text-sm text-violet-600 bg-violet-50 px-4 py-2 rounded-full">

            <Users size={16} />

            <span>
              No Join Code Required
            </span>

          </div>

        </div>

        {/* ================= DEPARTMENT GRID ================= */}

        {filteredDepartments.length > 0 ? (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredDepartments.map((department) => (

              <button
                key={department.id}
                type="button"

                /*
                  IMPORTANT:
                  We are NOT passing department through state.

                  Direct URL:
                  /departments/cse
                  /departments/ece
                  /departments/mech
                  etc.
                */

                onClick={() =>
                  navigate(`/departments/${department.id}`)
                }

                className="group text-left bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
              >

                {/* TOP */}

                <div className="flex items-start justify-between">

                  {/* ICON */}

                  <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl group-hover:scale-105 transition">
                    {department.icon}
                  </div>

                  {/* ARROW */}

                  <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-violet-50 transition">

                    <ChevronRight
                      size={19}
                      className="text-slate-300 group-hover:text-violet-600 transition"
                    />

                  </div>

                </div>

                {/* DEPARTMENT CODE */}

                <p className="text-xs font-bold text-violet-600 mt-6 uppercase tracking-wider">
                  {department.short}
                </p>

                {/* DEPARTMENT NAME */}

                <h3 className="text-xl font-bold text-slate-800 mt-1 leading-tight">
                  {department.name}
                </h3>

                {/* STATS */}

                <div className="flex items-center gap-5 mt-5 text-sm text-slate-400">

                  <span className="flex items-center gap-1.5">
                    <BookOpen size={15} />
                    {department.courses.length} Courses
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users size={15} />
                    {department.students.toLocaleString()} Students
                  </span>

                </div>

                {/* COURSE TAGS */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {department.courses
                    .slice(0, 3)
                    .map((course) => (

                      <span
                        key={course}
                        className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full"
                      >
                        {course}
                      </span>

                    ))}

                  {/* MORE */}

                  {department.courses.length > 3 && (

                    <span className="text-xs bg-violet-50 text-violet-600 px-3 py-1.5 rounded-full">

                      +{department.courses.length - 3} more

                    </span>

                  )}

                </div>

                {/* BOTTOM */}

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">

                  <span className="text-xs text-slate-400">
                    Students + Mentors
                  </span>

                  <span className="text-xs font-semibold text-violet-600 group-hover:underline">
                    Explore →
                  </span>

                </div>

              </button>

            ))}

          </div>

        ) : (

          /* ================= NO RESULT ================= */

          <div className="bg-white border border-slate-200 rounded-3xl py-20 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h3 className="font-bold text-xl text-slate-800 mt-5">
              No departments found
            </h3>

            <p className="text-slate-400 mt-2">
              Try searching for CSE, ECE, AI & DS, Mechanical,
              Civil or a course name.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-6 px-5 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition"
            >
              Clear Search
            </button>

          </div>

        )}

      </main>

      {/* ================= AI FLOATING BUTTON ================= */}

      <button
        type="button"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-violet-600 text-white shadow-xl flex items-center justify-center hover:scale-105 transition"
        title="AI Assistant"
      >
        <span className="text-2xl">
          ✨
        </span>
      </button>

    </div>
  );
}
