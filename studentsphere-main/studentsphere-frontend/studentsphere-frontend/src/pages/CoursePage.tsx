
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Bot,
  Send,
  MessageCircle,
  Users,
  FileText,
  Download,
  Upload,
  Search,
  Megaphone,
  Clock,
  User,
  Star,
  X,
  Sparkles,
  Paperclip,
  ThumbsUp,
} from "lucide-react";

type Message = {
  id: number;
  name: string;
  role: "Student" | "Mentor";
  message: string;
  time: string;
};

type Material = {
  id: number;
  name: string;
  type: string;
  uploadedBy: string;
  size: string;
};

type Doubt = {
  id: number;
  title: string;
  author: string;
  replies: number;
  likes: number;
  tag: string;
};

const courseData: Record<
  string,
  {
    name: string;
    code: string;
    department: string;
    description: string;
    students: number;
    mentor: string;
    credits: number;
    level: string;
    topics: string[];
  }
> = {
  "1": {
    name: "Data Structures",
    code: "CS301",
    department: "Computer Science & Engineering",
    description:
      "Learn fundamental data structures, algorithms, problem solving techniques and their real-world applications.",
    students: 247,
    mentor: "Dr. Arun Kumar",
    credits: 4,
    level: "Intermediate",
    topics: [
      "Arrays",
      "Linked Lists",
      "Stacks",
      "Queues",
      "Trees",
      "Graphs",
      "Sorting",
      "Searching",
    ],
  },

  "2": {
    name: "Operating Systems",
    code: "CS302",
    department: "Computer Science & Engineering",
    description:
      "Understand operating system concepts including processes, memory management, scheduling, deadlocks and file systems.",
    students: 324,
    mentor: "Prof. Priya Sharma",
    credits: 4,
    level: "Intermediate",
    topics: [
      "Processes",
      "Threads",
      "CPU Scheduling",
      "Deadlocks",
      "Memory Management",
      "File Systems",
      "Virtual Memory",
      "Security",
    ],
  },

  "3": {
    name: "Database Management Systems",
    code: "CS303",
    department: "Computer Science & Engineering",
    description:
      "Explore database architecture, SQL, normalization, transactions, indexing and modern database systems.",
    students: 286,
    mentor: "Dr. Karthik Raj",
    credits: 4,
    level: "Intermediate",
    topics: [
      "SQL",
      "ER Model",
      "Normalization",
      "Transactions",
      "Indexing",
      "Joins",
      "NoSQL",
      "Database Security",
    ],
  },

  "4": {
    name: "Computer Networks",
    code: "CS304",
    department: "Computer Science & Engineering",
    description:
      "Learn networking fundamentals, protocols, routing, TCP/IP, security and communication technologies.",
    students: 198,
    mentor: "Prof. Naveen Kumar",
    credits: 3,
    level: "Intermediate",
    topics: [
      "OSI Model",
      "TCP/IP",
      "Routing",
      "HTTP",
      "DNS",
      "TCP",
      "UDP",
      "Network Security",
    ],
  },
};

const defaultCourse = courseData["1"];

const initialMessages: Message[] = [
  {
    id: 1,
    name: "Arun",
    role: "Student",
    message:
      "Can someone explain the difference between stack and queue?",
    time: "10:42 AM",
  },
  {
    id: 2,
    name: "Rahul",
    role: "Student",
    message:
      "Stack follows LIFO while Queue follows FIFO.",
    time: "10:44 AM",
  },
  {
    id: 3,
    name: "Dr. Arun Kumar",
    role: "Mentor",
    message:
      "Exactly! Think of Stack like a pile of plates and Queue like people standing in a line.",
    time: "10:46 AM",
  },
];

const initialMaterials: Material[] = [
  {
    id: 1,
    name: "Unit 1 - Introduction.pdf",
    type: "PDF",
    uploadedBy: "Dr. Arun Kumar",
    size: "2.4 MB",
  },
  {
    id: 2,
    name: "Linked List Notes.pdf",
    type: "PDF",
    uploadedBy: "Rahul",
    size: "1.8 MB",
  },
  {
    id: 3,
    name: "Previous Year Questions.pdf",
    type: "PDF",
    uploadedBy: "Priya",
    size: "3.2 MB",
  },
  {
    id: 4,
    name: "DSA Cheat Sheet.pdf",
    type: "PDF",
    uploadedBy: "Arun",
    size: "980 KB",
  },
];

const initialDoubts: Doubt[] = [
  {
    id: 1,
    title: "What is the difference between BFS and DFS?",
    author: "Arun",
    replies: 8,
    likes: 24,
    tag: "Graphs",
  },
  {
    id: 2,
    title: "Why is binary search O(log n)?",
    author: "Priya",
    replies: 5,
    likes: 17,
    tag: "Searching",
  },
  {
    id: 3,
    title: "When should we use a linked list instead of an array?",
    author: "Rahul",
    replies: 11,
    likes: 31,
    tag: "Linked List",
  },
];

let nextId = Date.now();
const generateId = () => ++nextId;

export default function CoursePage() {
  const navigate = useNavigate();

  const { id, courseId } = useParams();

  const course =
    courseData[courseId || "1"] || defaultCourse;

  const [activeTab, setActiveTab] =
    useState<"chat" | "materials" | "doubts" | "announcements">(
      "chat"
    );

  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const [message, setMessage] = useState("");

  const [materials, setMaterials] =
    useState<Material[]>(initialMaterials);

  const [doubts, setDoubts] =
    useState<Doubt[]>(initialDoubts);

  const [search, setSearch] = useState("");

  const [showAI, setShowAI] = useState(false);

  const [aiMessage, setAiMessage] = useState("");

  const [aiMessages, setAiMessages] = useState<
    {
      id: number;
      sender: "user" | "ai";
      message: string;
    }[]
  >([
    {
      id: 1,
      sender: "ai",
      message: `Hi! 👋 I'm StudySphere AI. Ask me anything about ${course.name}.`,
    },
  ]);

  const [showUpload, setShowUpload] =
    useState(false);

  const [newDoubt, setNewDoubt] = useState("");

  /* ================= USER ================= */

  const storedUser = localStorage.getItem(
    "studentsphere_user"
  );

  let currentUser = "Student";

  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);

      currentUser =
        parsed.name ||
        parsed.fullName ||
        "Student";
    } catch {
      currentUser = "Student";
    }
  }

  /* ================= SEND MESSAGE ================= */

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    const newMessage: Message = {
      id: generateId(),
      name: currentUser,
      role: "Student",
      message: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setMessage("");
  };

  /* ================= AI CHAT ================= */

  const sendAIMessage = () => {
    const trimmed = aiMessage.trim();

    if (!trimmed) return;

    const userMessage = {
      id: generateId(),
      sender: "user" as const,
      message: trimmed,
    };

    setAiMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setAiMessage("");

    setTimeout(() => {
      const answer = getAIAnswer(trimmed);

      setAiMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          sender: "ai",
          message: answer,
        },
      ]);
    }, 700);
  };

  /* ================= SIMPLE AI DEMO ================= */

  const getAIAnswer = (question: string) => {
    const q = question.toLowerCase();

    if (q.includes("stack")) {
      return "A Stack follows the LIFO principle — Last In, First Out. Common operations are push, pop and peek. A real-world example is a stack of plates.";
    }

    if (q.includes("queue")) {
      return "A Queue follows FIFO — First In, First Out. Elements are inserted from the rear and removed from the front.";
    }

    if (
      q.includes("binary search") ||
      q.includes("log n")
    ) {
      return "Binary Search repeatedly divides the sorted search space into two halves. Therefore its time complexity is O(log n).";
    }

    if (
      q.includes("tree") ||
      q.includes("binary tree")
    ) {
      return "A tree is a hierarchical data structure consisting of nodes connected by edges. A Binary Tree allows each node to have at most two children.";
    }

    if (
      q.includes("linked list")
    ) {
      return "A linked list stores elements in nodes where each node contains data and a reference to another node. It allows efficient insertion and deletion when the position is known.";
    }

    return `Great question! 🤖 For ${course.name}, I recommend breaking the concept into smaller parts, reviewing the course materials and discussing it with your mentor.`;
  };

  /* ================= ADD DOUBT ================= */

  const addDoubt = () => {
    if (!newDoubt.trim()) return;

    const doubt: Doubt = {
      id: generateId(),
      title: newDoubt,
      author: currentUser,
      replies: 0,
      likes: 0,
      tag: "New",
    };

    setDoubts((prev) => [
      doubt,
      ...prev,
    ]);

    setNewDoubt("");
  };

  /* ================= UPLOAD MATERIAL ================= */

  const addDemoMaterial = () => {
    const material: Material = {
      id: generateId(),
      name: "My Study Notes.pdf",
      type: "PDF",
      uploadedBy: currentUser,
      size: "1.2 MB",
    };

    setMaterials((prev) => [
      material,
      ...prev,
    ]);

    setShowUpload(false);
  };

  /* ================= FILTER ================= */

  const filteredMaterials =
    materials.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const filteredDoubts =
    doubts.filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                navigate("/departments")
              }
              className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>

              <div>

                <h1 className="font-bold text-slate-900">
                  {course.name}
                </h1>

                <p className="text-xs text-slate-400">
                  {course.code} • {course.department}
                </p>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setShowAI(true)
              }
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-violet-200 hover:scale-[1.02] transition"
            >
              <Bot size={17} />
              Ask AI
            </button>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold"
            >
              {currentUser.charAt(0).toUpperCase()}
            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          COURSE HERO
      ====================================================== */}

      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10">

          <div className="grid lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">

              <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                <span>
                  {course.department}
                </span>

                <span>•</span>

                <span>
                  {course.code}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                {course.name}
              </h2>

              <p className="text-white/75 max-w-2xl mt-4 leading-relaxed">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm">
                  {course.level}
                </span>

                <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm">
                  {course.credits} Credits
                </span>

                <span className="px-3 py-1.5 rounded-full bg-white/10 text-sm flex items-center gap-1">
                  <Users size={15} />
                  {course.students} Students
                </span>

              </div>

            </div>

            {/* AI TEST */}

            <div className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl p-6">

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
                  <Sparkles size={23} />
                </div>

                <div>

                  <p className="font-bold">
                    AI Knowledge Test
                  </p>

                  <p className="text-xs text-white/60">
                    Test your {course.name} skills
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 mt-5 text-sm text-white/70">

                <span className="flex items-center gap-1">
                  <FileText size={15} />
                  10 MCQs
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={15} />
                  10 min
                </span>

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/course/${id || "1"}/${
                      courseId || "1"
                    }/test`
                  )
                }
                className="w-full mt-5 py-3.5 rounded-xl bg-white text-violet-700 font-bold hover:bg-slate-100 transition flex items-center justify-center gap-2"
              >
                <Brain size={18} />
                Start AI Test
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          COURSE STATS
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-5 lg:px-8 -mt-5 relative z-10">

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 grid grid-cols-2 md:grid-cols-4">

          <div className="p-5 border-r border-slate-100">
            <p className="text-xs text-slate-400">
              STUDENTS
            </p>

            <p className="text-2xl font-bold mt-1">
              {course.students}
            </p>
          </div>

          <div className="p-5 md:border-r border-slate-100">
            <p className="text-xs text-slate-400">
              MENTOR
            </p>

            <p className="font-bold mt-1 truncate">
              {course.mentor}
            </p>
          </div>

          <div className="p-5 border-r border-slate-100">
            <p className="text-xs text-slate-400">
              CREDITS
            </p>

            <p className="text-2xl font-bold mt-1">
              {course.credits}
            </p>
          </div>

          <div className="p-5">
            <p className="text-xs text-slate-400">
              LEVEL
            </p>

            <p className="font-bold mt-1">
              {course.level}
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-5 lg:px-8 py-8">

        <div className="grid lg:grid-cols-4 gap-6">

          {/* =================================================
              LEFT SIDEBAR
          ================================================== */}

          <aside className="lg:col-span-1 space-y-5">

            {/* COURSE TOPICS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <div className="flex items-center gap-2">

                <BookOpen
                  size={18}
                  className="text-violet-600"
                />

                <h3 className="font-bold">
                  Course Topics
                </h3>

              </div>

              <div className="mt-4 space-y-2">

                {course.topics.map(
                  (topic, index) => (

                    <div
                      key={topic}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-violet-50 cursor-pointer"
                    >

                      <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>

                      <span className="text-sm text-slate-600">
                        {topic}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* MENTOR */}

            <div className="bg-white border border-slate-200 rounded-2xl p-5">

              <p className="text-xs text-slate-400 font-semibold">
                COURSE MENTOR
              </p>

              <div className="flex items-center gap-3 mt-4">

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white flex items-center justify-center font-bold">
                  {course.mentor.charAt(0)}
                </div>

                <div>

                  <p className="font-bold text-sm">
                    {course.mentor}
                  </p>

                  <p className="text-xs text-slate-400">
                    Course Mentor
                  </p>

                  <div className="flex items-center gap-1 mt-1 text-yellow-500 text-xs">
                    <Star size={12} fill="currentColor" />
                    4.9 Mentor Rating
                  </div>

                </div>

              </div>

              <button
                onClick={() =>
                  setActiveTab("chat")
                }
                className="w-full mt-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50"
              >
                <MessageCircle
                  size={15}
                  className="inline mr-2"
                />
                Ask Mentor
              </button>

            </div>

          </aside>

          {/* =================================================
              RIGHT CONTENT
          ================================================== */}

          <section className="lg:col-span-3">

            {/* TABS */}

            <div className="bg-white border border-slate-200 rounded-2xl p-2 flex flex-wrap gap-1">

              <button
                onClick={() =>
                  setActiveTab("chat")
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  activeTab === "chat"
                    ? "bg-violet-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <MessageCircle size={16} />
                Discussion
              </button>

              <button
                onClick={() =>
                  setActiveTab("materials")
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  activeTab === "materials"
                    ? "bg-violet-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <FileText size={16} />
                Materials
              </button>

              <button
                onClick={() =>
                  setActiveTab("doubts")
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  activeTab === "doubts"
                    ? "bg-violet-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Brain size={16} />
                Doubts
              </button>

              <button
                onClick={() =>
                  setActiveTab("announcements")
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  activeTab === "announcements"
                    ? "bg-violet-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                <Megaphone size={16} />
                Announcements
              </button>

            </div>

            {/* SEARCH */}

            {(activeTab === "materials" ||
              activeTab === "doubts") && (
              <div className="relative mt-5">

                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder={
                    activeTab === "materials"
                      ? "Search materials..."
                      : "Search doubts..."
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-violet-500"
                />

              </div>
            )}

            {/* =================================================
                CHAT
            ================================================== */}

            {activeTab === "chat" && (

              <div className="bg-white border border-slate-200 rounded-2xl mt-5 overflow-hidden">

                <div className="p-5 border-b border-slate-100 flex items-center justify-between">

                  <div>

                    <h3 className="font-bold">
                      Course Discussion
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Students and mentors can participate
                    </p>

                  </div>

                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {course.students} members
                  </div>

                </div>

                <div className="h-[430px] overflow-y-auto p-5 space-y-5">

                  {messages.map((item) => (

                    <div
                      key={item.id}
                      className="flex gap-3"
                    >

                      <div
                        className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                          item.role === "Mentor"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-violet-100 text-violet-700"
                        }`}
                      >
                        {item.name.charAt(0)}
                      </div>

                      <div className="flex-1">

                        <div className="flex items-center gap-2">

                          <span className="font-bold text-sm">
                            {item.name}
                          </span>

                          {item.role ===
                            "Mentor" && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                              MENTOR
                            </span>
                          )}

                          <span className="text-[10px] text-slate-400">
                            {item.time}
                          </span>

                        </div>

                        <div className="mt-1 bg-slate-50 rounded-2xl rounded-tl-sm p-3 text-sm text-slate-600 inline-block max-w-[90%]">
                          {item.message}
                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="p-4 border-t border-slate-100">

                  <div className="flex items-center gap-2">

                    <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400">
                      <Paperclip size={18} />
                    </button>

                    <input
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          sendMessage();
                        }
                      }}
                      placeholder="Ask a question or start a discussion..."
                      className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-200"
                    />

                    <button
                      onClick={sendMessage}
                      className="w-11 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700"
                    >
                      <Send size={17} />
                    </button>

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                MATERIALS
            ================================================== */}

            {activeTab === "materials" && (

              <div className="bg-white border border-slate-200 rounded-2xl mt-5 overflow-hidden">

                <div className="p-5 border-b border-slate-100 flex items-center justify-between">

                  <div>

                    <h3 className="font-bold">
                      Study Materials
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      Notes, PDFs, question papers and resources
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      setShowUpload(true)
                    }
                    className="px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold flex items-center gap-2"
                  >
                    <Upload size={16} />
                    Upload
                  </button>

                </div>

                <div className="p-5 space-y-3">

                  {filteredMaterials.map(
                    (material) => (

                      <div
                        key={material.id}
                        className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-violet-200 hover:bg-violet-50/30 transition"
                      >

                        <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                          <FileText size={21} />
                        </div>

                        <div className="flex-1 min-w-0">

                          <p className="font-semibold text-sm truncate">
                            {material.name}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            Uploaded by{" "}
                            {material.uploadedBy} •{" "}
                            {material.size}
                          </p>

                        </div>

                        <span className="hidden sm:block text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-500">
                          {material.type}
                        </span>

                        <button
                          onClick={() =>
                            alert(
                              `Opening ${material.name}`
                            )
                          }
                          className="w-10 h-10 rounded-xl hover:bg-white flex items-center justify-center text-violet-600"
                        >
                          <Download size={18} />
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}

            {/* =================================================
                DOUBTS
            ================================================== */}

            {activeTab === "doubts" && (

              <div className="space-y-5 mt-5">

                <div className="bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl p-5 text-white">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center">
                      <Brain size={22} />
                    </div>

                    <div>

                      <h3 className="font-bold">
                        Have a doubt?
                      </h3>

                      <p className="text-xs text-white/70">
                        Ask students, mentors or StudySphere AI.
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 flex gap-2">

                    <input
                      value={newDoubt}
                      onChange={(e) =>
                        setNewDoubt(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addDoubt();
                        }
                      }}
                      placeholder="Type your question..."
                      className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm outline-none placeholder:text-white/50"
                    />

                    <button
                      onClick={addDoubt}
                      className="px-5 rounded-xl bg-white text-violet-700 font-bold text-sm"
                    >
                      Ask
                    </button>

                  </div>

                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

                  <div className="p-5 border-b border-slate-100">

                    <h3 className="font-bold">
                      Community Doubts
                    </h3>

                  </div>

                  <div className="divide-y divide-slate-100">

                    {filteredDoubts.map(
                      (doubt) => (

                        <div
                          key={doubt.id}
                          className="p-5 hover:bg-slate-50 cursor-pointer"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-violet-100 text-violet-700">
                                {doubt.tag}
                              </span>

                              <h4 className="font-bold mt-3 text-slate-800">
                                {doubt.title}
                              </h4>

                              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                <User size={12} />
                                Asked by{" "}
                                {doubt.author}
                              </p>

                            </div>

                            <button
                              onClick={() =>
                                setShowAI(true)
                              }
                              className="shrink-0 w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center"
                              title="Ask AI"
                            >
                              <Bot size={18} />
                            </button>

                          </div>

                          <div className="flex items-center gap-5 mt-4 text-xs text-slate-400">

                            <span className="flex items-center gap-1">
                              <MessageCircle size={14} />
                              {doubt.replies} replies
                            </span>

                            <span className="flex items-center gap-1">
                              <ThumbsUp size={14} />
                              {doubt.likes} helpful
                            </span>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                ANNOUNCEMENTS
            ================================================== */}

            {activeTab ===
              "announcements" && (

              <div className="space-y-4 mt-5">

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                  <div className="flex items-start gap-4">

                    <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Megaphone size={20} />
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="font-bold">
                          Mid-Semester Test
                        </h3>

                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-lg font-bold">
                          IMPORTANT
                        </span>

                      </div>

                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        Mid-semester examination will cover
                        the first four units of the course.
                      </p>

                      <p className="text-xs text-slate-400 mt-3">
                        Posted by {course.mentor} •
                        Today
                      </p>

                    </div>

                  </div>

                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                  <div className="flex items-start gap-4">

                    <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <BookOpen size={20} />
                    </div>

                    <div>

                      <h3 className="font-bold">
                        New Study Materials Added
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        New notes and previous year question
                        papers are now available in Materials.
                      </p>

                      <p className="text-xs text-slate-400 mt-3">
                        Posted by {course.mentor} •
                        Yesterday
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </section>

        </div>

      </main>

      {/* =====================================================
          FLOATING AI BUTTON
      ====================================================== */}

      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-xl shadow-violet-300 flex items-center justify-center hover:scale-105 transition z-40"
          title="Ask StudySphere AI"
        >
          <Bot size={25} />
        </button>
      )}

      {/* =====================================================
          AI CHAT MODAL
      ====================================================== */}

      {showAI && (

        <div className="fixed inset-0 z-50 pointer-events-none">

          <div className="absolute right-5 bottom-5 w-[calc(100%-40px)] sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden pointer-events-auto">

            {/* AI HEADER */}

            <div className="bg-gradient-to-r from-violet-600 to-blue-600 text-white p-4 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Bot size={21} />
                </div>

                <div>

                  <p className="font-bold">
                    StudySphere AI
                  </p>

                  <p className="text-[11px] text-white/60">
                    {course.name} Assistant
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setShowAI(false)
                }
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            {/* MESSAGES */}

            <div className="h-[360px] overflow-y-auto p-4 space-y-4">

              {aiMessages.map((item) => (

                <div
                  key={item.id}
                  className={`flex ${
                    item.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                      item.sender === "user"
                        ? "bg-violet-600 text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-700 rounded-bl-sm"
                    }`}
                  >
                    {item.message}
                  </div>

                </div>

              ))}

            </div>

            {/* AI INPUT */}

            <div className="p-3 border-t border-slate-100">

              <div className="flex items-center gap-2">

                <input
                  value={aiMessage}
                  onChange={(e) =>
                    setAiMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendAIMessage();
                    }
                  }}
                  placeholder="Ask AI anything..."
                  className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm outline-none"
                />

                <button
                  onClick={sendAIMessage}
                  className="w-11 h-11 rounded-xl bg-violet-600 text-white flex items-center justify-center"
                >
                  <Send size={17} />
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          UPLOAD MODAL
      ====================================================== */}

      {showUpload && (

        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">

          <div className="bg-white rounded-3xl w-full max-w-md p-7">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-xl font-bold">
                  Upload Material
                </h3>

                <p className="text-sm text-slate-400 mt-1">
                  Share useful resources with everyone
                </p>

              </div>

              <button
                onClick={() =>
                  setShowUpload(false)
                }
                className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                <Upload size={24} />
              </div>

              <p className="font-semibold mt-4">
                Drop your file here
              </p>

              <p className="text-xs text-slate-400 mt-1">
                PDF, PPT, DOCX or image
              </p>

              <button
                onClick={addDemoMaterial}
                className="mt-5 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold"
              >
                Choose File
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
