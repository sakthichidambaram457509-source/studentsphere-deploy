import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Search,
  Users,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const departmentData: Record<
  string,
  {
    code: string;
    name: string;
    icon: string;
    description: string;
    courses: {
      code: string;
      name: string;
      description: string;
      students: number;
      activity: number;
      icon: string;
      level: string;
    }[];
  }
> = {
  cse: {
    code: "CSE",
    name: "Computer Science & Engineering",
    icon: "💻",
    description:
      "Explore programming, software development, systems and computing communities.",
    courses: [
      {
        code: "CS301",
        name: "Data Structures",
        description:
          "Algorithms, trees, graphs, linked lists and problem solving.",
        students: 324,
        activity: 96,
        icon: "🌳",
        level: "Core",
      },
      {
        code: "CS302",
        name: "Operating Systems",
        description:
          "Processes, memory management, scheduling and file systems.",
        students: 287,
        activity: 92,
        icon: "💻",
        level: "Core",
      },
      {
        code: "CS303",
        name: "Database Management Systems",
        description:
          "SQL, relational databases, normalization and transactions.",
        students: 310,
        activity: 94,
        icon: "🗄️",
        level: "Core",
      },
      {
        code: "CS304",
        name: "Computer Networks",
        description:
          "Networking fundamentals, protocols, TCP/IP and network security.",
        students: 241,
        activity: 89,
        icon: "🌐",
        level: "Core",
      },
      {
        code: "CS305",
        name: "Object Oriented Programming",
        description:
          "Classes, objects, inheritance, polymorphism and design principles.",
        students: 298,
        activity: 91,
        icon: "🧩",
        level: "Core",
      },
      {
        code: "CS306",
        name: "Artificial Intelligence",
        description:
          "AI fundamentals, intelligent agents and problem solving.",
        students: 265,
        activity: 87,
        icon: "🤖",
        level: "Elective",
      },
      {
        code: "CS307",
        name: "Web Development",
        description:
          "Modern frontend, backend, APIs and full-stack development.",
        students: 352,
        activity: 97,
        icon: "🌍",
        level: "Elective",
      },
      {
        code: "CS308",
        name: "Theory of Computation",
        description:
          "Automata, formal languages, grammars and computability.",
        students: 188,
        activity: 81,
        icon: "🧠",
        level: "Core",
      },
    ],
  },

  aids: {
    code: "AIDS",
    name: "Artificial Intelligence & Data Science",
    icon: "🤖",
    description:
      "Learn AI, machine learning, data analytics and intelligent computing.",
    courses: [
      {
        code: "AD301",
        name: "Machine Learning",
        description:
          "Supervised learning, unsupervised learning and model evaluation.",
        students: 289,
        activity: 95,
        icon: "🧠",
        level: "Core",
      },
      {
        code: "AD302",
        name: "Deep Learning",
        description:
          "Neural networks, CNNs, RNNs and modern deep learning.",
        students: 245,
        activity: 91,
        icon: "🤖",
        level: "Core",
      },
      {
        code: "AD303",
        name: "Data Analytics",
        description:
          "Data processing, visualization and analytical techniques.",
        students: 301,
        activity: 93,
        icon: "📊",
        level: "Core",
      },
      {
        code: "AD304",
        name: "Statistics",
        description:
          "Probability, distributions, hypothesis testing and inference.",
        students: 224,
        activity: 84,
        icon: "📈",
        level: "Core",
      },
      {
        code: "AD305",
        name: "Natural Language Processing",
        description:
          "Text processing, language models and NLP applications.",
        students: 198,
        activity: 88,
        icon: "💬",
        level: "Elective",
      },
      {
        code: "AD306",
        name: "Computer Vision",
        description:
          "Image processing, object detection and visual recognition.",
        students: 213,
        activity: 90,
        icon: "👁️",
        level: "Elective",
      },
      {
        code: "AD307",
        name: "Big Data",
        description:
          "Distributed systems, data pipelines and large-scale processing.",
        students: 176,
        activity: 79,
        icon: "🗃️",
        level: "Elective",
      },
    ],
  },

  ece: {
    code: "ECE",
    name: "Electronics & Communication Engineering",
    icon: "📡",
    description:
      "Explore electronics, communication, embedded systems and signal processing.",
    courses: [
      {
        code: "EC301",
        name: "Digital Electronics",
        description:
          "Logic gates, combinational circuits and sequential systems.",
        students: 278,
        activity: 93,
        icon: "🔌",
        level: "Core",
      },
      {
        code: "EC302",
        name: "Signals & Systems",
        description:
          "Continuous and discrete signals, systems and transformations.",
        students: 235,
        activity: 86,
        icon: "〰️",
        level: "Core",
      },
      {
        code: "EC303",
        name: "Microprocessors",
        description:
          "Processor architecture, assembly language and interfacing.",
        students: 214,
        activity: 84,
        icon: "🖥️",
        level: "Core",
      },
      {
        code: "EC304",
        name: "Communication Systems",
        description:
          "Analog, digital communication and wireless technologies.",
        students: 198,
        activity: 88,
        icon: "📡",
        level: "Core",
      },
      {
        code: "EC305",
        name: "Embedded Systems",
        description:
          "Microcontrollers, sensors and embedded applications.",
        students: 242,
        activity: 92,
        icon: "⚙️",
        level: "Elective",
      },
      {
        code: "EC306",
        name: "VLSI Design",
        description:
          "Digital IC design, CMOS and semiconductor technologies.",
        students: 167,
        activity: 77,
        icon: "🔲",
        level: "Elective",
      },
      {
        code: "EC307",
        name: "IoT",
        description:
          "Connected devices, sensors, communication and IoT platforms.",
        students: 256,
        activity: 94,
        icon: "📶",
        level: "Elective",
      },
    ],
  },

  eee: {
    code: "EEE",
    name: "Electrical & Electronics Engineering",
    icon: "⚡",
    description:
      "Explore power systems, electrical machines, control and electronics.",
    courses: [
      {
        code: "EE301",
        name: "Power Systems",
        description:
          "Generation, transmission and distribution of electrical power.",
        students: 232,
        activity: 87,
        icon: "⚡",
        level: "Core",
      },
      {
        code: "EE302",
        name: "Electrical Machines",
        description:
          "Transformers, motors, generators and electrical machines.",
        students: 214,
        activity: 85,
        icon: "🔧",
        level: "Core",
      },
      {
        code: "EE303",
        name: "Control Systems",
        description:
          "Feedback systems, stability and controller design.",
        students: 245,
        activity: 89,
        icon: "🎛️",
        level: "Core",
      },
      {
        code: "EE304",
        name: "Power Electronics",
        description:
          "Power semiconductor devices and converter circuits.",
        students: 187,
        activity: 82,
        icon: "🔋",
        level: "Core",
      },
      {
        code: "EE305",
        name: "Renewable Energy",
        description:
          "Solar, wind and other sustainable energy technologies.",
        students: 203,
        activity: 90,
        icon: "☀️",
        level: "Elective",
      },
      {
        code: "EE306",
        name: "Smart Grid",
        description:
          "Modern electrical grids, automation and intelligent energy.",
        students: 156,
        activity: 76,
        icon: "🏙️",
        level: "Elective",
      },
    ],
  },

  mech: {
    code: "MECH",
    name: "Mechanical Engineering",
    icon: "⚙️",
    description:
      "Design, manufacturing, thermal engineering and mechanical systems.",
    courses: [
      {
        code: "ME301",
        name: "Engineering Mechanics",
        description:
          "Forces, motion, equilibrium and mechanical systems.",
        students: 267,
        activity: 90,
        icon: "⚙️",
        level: "Core",
      },
      {
        code: "ME302",
        name: "Thermodynamics",
        description:
          "Energy, heat transfer and thermodynamic processes.",
        students: 281,
        activity: 94,
        icon: "🔥",
        level: "Core",
      },
      {
        code: "ME303",
        name: "Fluid Mechanics",
        description:
          "Fluid properties, flow and fluid machinery.",
        students: 224,
        activity: 85,
        icon: "💧",
        level: "Core",
      },
      {
        code: "ME304",
        name: "Manufacturing Technology",
        description:
          "Manufacturing processes, machining and production systems.",
        students: 213,
        activity: 83,
        icon: "🏭",
        level: "Core",
      },
      {
        code: "ME305",
        name: "CAD & CAM",
        description:
          "Computer-aided design and manufacturing technologies.",
        students: 198,
        activity: 89,
        icon: "📐",
        level: "Elective",
      },
      {
        code: "ME306",
        name: "Robotics",
        description:
          "Robot mechanics, control and industrial automation.",
        students: 187,
        activity: 92,
        icon: "🤖",
        level: "Elective",
      },
      {
        code: "ME307",
        name: "Automobile Engineering",
        description:
          "Vehicle systems, engines and automotive technologies.",
        students: 175,
        activity: 80,
        icon: "🚗",
        level: "Elective",
      },
    ],
  },

  civil: {
    code: "CIVIL",
    name: "Civil Engineering",
    icon: "🏗️",
    description:
      "Explore structures, construction, transportation and infrastructure.",
    courses: [
      {
        code: "CE301",
        name: "Structural Engineering",
        description:
          "Analysis and design of civil structures.",
        students: 214,
        activity: 88,
        icon: "🏢",
        level: "Core",
      },
      {
        code: "CE302",
        name: "Construction Technology",
        description:
          "Construction methods, materials and project management.",
        students: 198,
        activity: 86,
        icon: "🏗️",
        level: "Core",
      },
      {
        code: "CE303",
        name: "Geotechnical Engineering",
        description:
          "Soil properties, foundations and earth structures.",
        students: 176,
        activity: 81,
        icon: "🌍",
        level: "Core",
      },
      {
        code: "CE304",
        name: "Transportation Engineering",
        description:
          "Highways, traffic engineering and transportation systems.",
        students: 189,
        activity: 84,
        icon: "🛣️",
        level: "Core",
      },
      {
        code: "CE305",
        name: "Environmental Engineering",
        description:
          "Water treatment, waste management and environmental systems.",
        students: 202,
        activity: 90,
        icon: "🌱",
        level: "Elective",
      },
      {
        code: "CE306",
        name: "Surveying",
        description:
          "Land surveying, measurements and mapping techniques.",
        students: 165,
        activity: 79,
        icon: "📍",
        level: "Core",
      },
    ],
  },
};

export default function DepartmentCourses() {
  const navigate = useNavigate();
  const { department } = useParams();

  const [search, setSearch] = useState("");

  const data = departmentData[department || "cse"] || departmentData.cse;

  const filteredCourses = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return data.courses;

    return data.courses.filter(
      (course) =>
        course.name.toLowerCase().includes(value) ||
        course.code.toLowerCase().includes(value) ||
        course.description.toLowerCase().includes(value)
    );
  }, [search, data]);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-4">

          <button
            onClick={() => navigate("/departments")}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100"
          >
            <ArrowLeft size={19} />
          </button>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center">
              <GraduationCap size={21} />
            </div>

            <div>
              <h1 className="font-bold">
                StudentSphere
              </h1>

              <p className="text-xs text-slate-400">
                Academic Communities
              </p>
            </div>

          </div>

          <div className="flex-1" />

          <button
            onClick={() => navigate("/dashboard")}
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600"
          >
            Dashboard
            <ChevronRight size={16} />
          </button>

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold">
            AS
          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-5">

          <button
            onClick={() => navigate("/departments")}
            className="hover:text-violet-600"
          >
            Departments
          </button>

          <ChevronRight size={15} />

          <span className="text-slate-700 font-medium">
            {data.code}
          </span>

        </div>

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-7 sm:p-10 mb-8">

          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">

            <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-4xl shrink-0">
              {data.icon}
            </div>

            <div className="flex-1">

              <div className="flex items-center gap-3 mb-2">

                <span className="text-violet-400 font-bold">
                  {data.code}
                </span>

                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  OPEN ACCESS
                </span>

              </div>

              <h2 className="text-3xl sm:text-4xl font-bold">
                {data.name}
              </h2>

              <p className="text-slate-400 mt-3 max-w-2xl leading-relaxed">
                {data.description}
              </p>

            </div>

            <div className="hidden lg:block text-center">

              <div className="text-3xl font-bold">
                {data.courses.length}
              </div>

              <div className="text-xs text-slate-500">
                Courses
              </div>

            </div>

          </div>

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />

        </section>

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row gap-4 mb-7">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${data.code} courses...`}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-5 outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 text-sm"
            />

          </div>

          <button className="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-semibold flex items-center justify-center gap-2">
            <Sparkles size={17} className="text-violet-500" />
            AI Recommendations
          </button>

        </div>

        {/* COURSE HEADER */}
        <div className="flex items-end justify-between mb-5">

          <div>

            <h3 className="text-xl font-bold">
              Courses & Communities
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Join discussions, share materials and ask doubts.
            </p>

          </div>

          <span className="text-sm text-slate-400">
            {filteredCourses.length} courses
          </span>

        </div>

        {/* COURSES */}
        <div className="grid md:grid-cols-2 gap-5">

          {filteredCourses.map((course) => (

            <button
              key={course.code}
              onClick={() =>
                navigate(
                  `/course/${course.code.toLowerCase()}`
                )
              }
              className="group text-left bg-white border border-slate-200 rounded-3xl p-6 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300"
            >

              <div className="flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition">
                  {course.icon}
                </div>

                <div className="flex-1 min-w-0">

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <p className="text-xs text-violet-600 font-bold">
                        {course.code}
                      </p>

                      <h4 className="text-lg font-bold mt-1">
                        {course.name}
                      </h4>

                    </div>

                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition shrink-0">
                      <ArrowRight size={17} />
                    </div>

                  </div>

                  <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                    {course.description}
                  </p>

                </div>

              </div>

              {/* STATS */}
              <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Users size={15} />
                  {course.students} students
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <BookOpen size={15} />
                  {course.level}
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  {course.activity}% active
                </div>

              </div>

            </button>

          ))}

        </div>

        {/* EMPTY */}
        {filteredCourses.length === 0 && (

          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">

            <div className="text-4xl mb-4">
              🔍
            </div>

            <h3 className="font-bold text-lg">
              No courses found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Try searching with another course name or code.
            </p>

          </div>

        )}

        {/* OPEN ACCESS */}
        <div className="mt-8 p-6 rounded-3xl bg-violet-50 border border-violet-100">

          <div className="flex gap-4">

            <div className="w-11 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
              <Users size={19} />
            </div>

            <div>

              <h3 className="font-bold text-violet-950">
                Open academic community
              </h3>

              <p className="text-sm text-violet-700/70 mt-1 leading-relaxed">
                Students from any department can access this course,
                ask questions, join discussions and share learning
                materials. No join code required.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}