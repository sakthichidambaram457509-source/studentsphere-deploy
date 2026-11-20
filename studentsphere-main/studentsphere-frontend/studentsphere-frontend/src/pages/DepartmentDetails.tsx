import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Users,
} from "lucide-react";

const departments: Record<
  string,
  {
    name: string;
    short: string;
    icon: string;
    students: number;
    courses: string[];
  }
> = {
  cse: {
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

  aids: {
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

  ece: {
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

  eee: {
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

  mech: {
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

  civil: {
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

  it: {
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
};

export default function DepartmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const department = id ? departments[id] : undefined;

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Department Not Found
          </h1>

          <button
            onClick={() => navigate("/departments")}
            className="mt-5 px-5 py-3 rounded-xl bg-violet-600 text-white"
          >
            Back to Departments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">

          <button
            onClick={() => navigate("/departments")}
            className="flex items-center gap-2 text-slate-500 hover:text-violet-600"
          >
            <ArrowLeft size={18} />
            Back to Departments
          </button>

        </div>
      </header>

      {/* DEPARTMENT HERO */}

      <section className="bg-gradient-to-r from-violet-700 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center text-5xl">
              {department.icon}
            </div>

            <div>

              <p className="text-white/60 font-medium">
                {department.short}
              </p>

              <h1 className="text-4xl font-bold">
                {department.name}
              </h1>

              <div className="flex items-center gap-5 mt-3 text-white/70 text-sm">

                <span className="flex items-center gap-2">
                  <BookOpen size={16} />
                  {department.courses.length} Courses
                </span>

                <span className="flex items-center gap-2">
                  <Users size={16} />
                  {department.students} Students
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* COURSES */}

      <main className="max-w-7xl mx-auto px-6 py-10">

        <h2 className="text-2xl font-bold text-slate-800">
          Courses
        </h2>

        <p className="text-slate-400 mt-1">
          Choose a course to enter the open study community.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">

          {department.courses.map((course, index) => (

            <button
              key={course}
              onClick={() =>
                navigate(
                  `/course/${id}/${index + 1}`
                )
              }
              className="group bg-white border border-slate-200 rounded-2xl p-5 text-left hover:shadow-xl hover:-translate-y-1 transition-all"
            >

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <BookOpen size={22} />
                </div>

                <ChevronRight
                  size={20}
                  className="text-slate-300 group-hover:text-violet-600"
                />

              </div>

              <h3 className="text-lg font-bold text-slate-800 mt-5">
                {course}
              </h3>

              <p className="text-sm text-slate-400 mt-2">
                {department.short} • Open Community
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-5">
                <Users size={14} />
                Students + Mentors
              </div>

            </button>

          ))}

        </div>

      </main>

    </div>
  );
}