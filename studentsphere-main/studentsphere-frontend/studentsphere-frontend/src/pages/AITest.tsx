
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "Which data structure follows the LIFO principle?",
    options: [
      "Queue",
      "Stack",
      "Linked List",
      "Binary Tree",
    ],
    answer: 1,
  },
  {
    question: "What is the time complexity of binary search?",
    options: [
      "O(n)",
      "O(n²)",
      "O(log n)",
      "O(1)",
    ],
    answer: 2,
  },
  {
    question: "Which of the following is a linear data structure?",
    options: [
      "Tree",
      "Graph",
      "Array",
      "Heap",
    ],
    answer: 2,
  },
  {
    question: "Which traversal of a Binary Search Tree gives sorted order?",
    options: [
      "Preorder",
      "Postorder",
      "Level Order",
      "Inorder",
    ],
    answer: 3,
  },
  {
    question: "Which algorithm is commonly used to find the shortest path?",
    options: [
      "Dijkstra's Algorithm",
      "Bubble Sort",
      "Binary Search",
      "DFS only",
    ],
    answer: 0,
  },
  {
    question: "Which data structure is generally used in BFS?",
    options: [
      "Stack",
      "Queue",
      "Heap",
      "Array only",
    ],
    answer: 1,
  },
  {
    question: "Which sorting algorithm has average O(n log n) complexity?",
    options: [
      "Bubble Sort",
      "Selection Sort",
      "Merge Sort",
      "Linear Search",
    ],
    answer: 2,
  },
  {
    question: "A node in a linked list contains data and what?",
    options: [
      "Only another value",
      "Pointer/reference",
      "SQL query",
      "Class only",
    ],
    answer: 1,
  },
  {
    question: "Which structure is used for implementing recursion?",
    options: [
      "Queue",
      "Stack",
      "Graph",
      "Hash Table",
    ],
    answer: 1,
  },
  {
    question: "What does FIFO stand for?",
    options: [
      "First In First Out",
      "Fast In Fast Out",
      "First Input Final Output",
      "File In File Out",
    ],
    answer: 0,
  },
];

export default function AITest() {
  const navigate = useNavigate();
  const { id, courseId } = useParams();

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const courseName =
    courseId === "1"
      ? "Data Structures"
      : courseId === "2"
      ? "Operating Systems"
      : courseId === "3"
      ? "Database Management Systems"
      : courseId === "4"
      ? "Computer Networks"
      : "Data Structures";

  /* ================= TIMER ================= */

  useEffect(() => {
    if (!started || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, finished]);

  /* ================= FORMAT TIME ================= */

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  /* ================= SELECT ANSWER ================= */

  const selectAnswer = (index: number) => {
    setSelected(index);

    const updated = [...answers];
    updated[current] = index;

    setAnswers(updated);
  };

  /* ================= NEXT ================= */

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] ?? null);
    } else {
      setFinished(true);
    }
  };

  /* ================= PREVIOUS ================= */

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1] ?? null);
    }
  };

  /* ================= SCORE ================= */

  const calculateScore = () => {
    let score = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        score++;
      }
    });

    return score;
  };

  /* ================= SAVE POINTS ================= */

  const savePoints = (score: number) => {
    const points = score * 10;

    const oldPoints = Number(
      localStorage.getItem("studentsphere_points") || "0"
    );

    localStorage.setItem(
      "studentsphere_points",
      String(oldPoints + points)
    );

    localStorage.setItem(
      "studentsphere_last_score",
      String(score)
    );
  };

  /* ================= RESULT ================= */

  if (finished) {
    const score = calculateScore();
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    savePoints(score);

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

        <div className="w-full max-w-2xl">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

            {/* TOP */}

            <div className="bg-gradient-to-r from-violet-700 to-blue-700 text-white text-center px-6 py-10">

              <div className="w-20 h-20 mx-auto bg-white/15 rounded-full flex items-center justify-center">
                <Trophy size={38} />
              </div>

              <h1 className="text-3xl font-bold mt-5">
                Test Completed! 🎉
              </h1>

              <p className="text-white/70 mt-2">
                {courseName}
              </p>

            </div>

            {/* SCORE */}

            <div className="p-8">

              <div className="text-center">

                <p className="text-sm text-slate-400">
                  Your Score
                </p>

                <div className="text-6xl font-black text-violet-600 mt-2">
                  {score}/{questions.length}
                </div>

                <p className="text-lg font-semibold mt-2">
                  {percentage}%
                </p>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="bg-green-50 rounded-2xl p-5 text-center">
                  <CheckCircle2
                    className="mx-auto text-green-600"
                    size={25}
                  />

                  <p className="text-2xl font-bold mt-2">
                    {score}
                  </p>

                  <p className="text-xs text-slate-500">
                    Correct
                  </p>
                </div>

                <div className="bg-red-50 rounded-2xl p-5 text-center">
                  <XCircle
                    className="mx-auto text-red-500"
                    size={25}
                  />

                  <p className="text-2xl font-bold mt-2">
                    {questions.length - score}
                  </p>

                  <p className="text-xs text-slate-500">
                    Wrong
                  </p>
                </div>

                <div className="bg-violet-50 rounded-2xl p-5 text-center">
                  <Sparkles
                    className="mx-auto text-violet-600"
                    size={25}
                  />

                  <p className="text-2xl font-bold mt-2">
                    +{score * 10}
                  </p>

                  <p className="text-xs text-slate-500">
                    Points
                  </p>
                </div>

              </div>

              {/* MESSAGE */}

              <div className="mt-7 bg-slate-50 rounded-2xl p-5 text-center">

                {percentage >= 80 ? (
                  <>
                    <p className="font-bold text-green-600">
                      Excellent Performance! 🔥
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      You're doing great. Keep learning!
                    </p>
                  </>
                ) : percentage >= 50 ? (
                  <>
                    <p className="font-bold text-yellow-600">
                      Good Attempt! 👍
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Review your mistakes and try again.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-red-500">
                      Keep Practicing 💪
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Don't worry. Practice makes progress!
                    </p>
                  </>
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 mt-7">

                <button
                  onClick={() =>
                    navigate(
                      `/course/${id}/${courseId}`
                    )
                  }
                  className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold hover:bg-slate-50"
                >
                  Back to Course
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={17} />
                  Try Again
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  /* ================= START SCREEN ================= */

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

        <div className="w-full max-w-2xl">

          <button
            onClick={() =>
              navigate(`/course/${id}/${courseId}`)
            }
            className="flex items-center gap-2 text-slate-500 mb-5 hover:text-violet-600"
          >
            <ArrowLeft size={18} />
            Back to Course
          </button>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 text-white p-10 text-center">

              <div className="w-20 h-20 mx-auto rounded-3xl bg-white/15 flex items-center justify-center">
                <Sparkles size={38} />
              </div>

              <p className="text-white/60 text-sm mt-5">
                AI POWERED ASSESSMENT
              </p>

              <h1 className="text-3xl font-bold mt-2">
                {courseName}
              </h1>

              <p className="text-white/70 mt-3">
                Test your knowledge with AI-generated MCQs.
              </p>

            </div>

            <div className="p-8">

              <div className="grid grid-cols-3 gap-4">

                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <p className="text-2xl font-bold">
                    10
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Questions
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <Clock
                    size={22}
                    className="mx-auto"
                  />
                  <p className="text-xs text-slate-400 mt-2">
                    10 Minutes
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 text-center">
                  <p className="text-2xl font-bold">
                    100
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Max Points
                  </p>
                </div>

              </div>

              <div className="mt-7">

                <h3 className="font-bold">
                  Test Rules
                </h3>

                <ul className="mt-3 space-y-2 text-sm text-slate-500">

                  <li>✓ Each question carries 10 points.</li>

                  <li>✓ You have 10 minutes to complete the test.</li>

                  <li>✓ You can move between questions.</li>

                  <li>✓ Points will be added to your dashboard.</li>

                  <li>✓ You can retake the test anytime.</li>

                </ul>

              </div>

              <button
                onClick={() => setStarted(true)}
                className="w-full mt-8 py-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700 flex items-center justify-center gap-2"
              >
                <Sparkles size={18} />
                Start AI Test
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  /* ================= TEST SCREEN ================= */

  const question = questions[current];

  const progress =
    ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">

        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>

            <p className="text-xs text-slate-400">
              AI ASSESSMENT
            </p>

            <h1 className="font-bold text-slate-800">
              {courseName}
            </h1>

          </div>

          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold">

            <Clock size={17} />

            {formatTime(timeLeft)}

          </div>

        </div>

      </header>

      {/* PROGRESS */}

      <div className="h-1 bg-slate-200">

        <div
          className="h-full bg-violet-600 transition-all"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      {/* CONTENT */}

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-6">

          <span className="text-sm font-semibold text-violet-600">
            Question {current + 1} of {questions.length}
          </span>

          <span className="text-sm text-slate-400">
            {answers.filter(
              (answer) => answer !== undefined
            ).length}{" "}
            answered
          </span>

        </div>

        {/* QUESTION CARD */}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 md:p-10">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 font-bold flex items-center justify-center shrink-0">
              {current + 1}
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
              {question.question}
            </h2>

          </div>

          {/* OPTIONS */}

          <div className="mt-8 space-y-3">

            {question.options.map(
              (option, index) => {

                const isSelected =
                  selected === index;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      selectAnswer(index)
                    }
                    className={`w-full text-left p-5 rounded-2xl border-2 transition flex items-center gap-4 ${
                      isSelected
                        ? "border-violet-600 bg-violet-50"
                        : "border-slate-200 hover:border-violet-300 hover:bg-slate-50"
                    }`}
                  >

                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                        isSelected
                          ? "bg-violet-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {String.fromCharCode(
                        65 + index
                      )}
                    </div>

                    <span
                      className={`font-medium ${
                        isSelected
                          ? "text-violet-700"
                          : "text-slate-700"
                      }`}
                    >
                      {option}
                    </span>

                  </button>
                );
              }
            )}

          </div>

          {/* NAVIGATION */}

          <div className="flex justify-between mt-10">

            <button
              onClick={previousQuestion}
              disabled={current === 0}
              className="px-5 py-3 rounded-xl border border-slate-200 flex items-center gap-2 font-semibold disabled:opacity-30"
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            <button
              onClick={nextQuestion}
              className="px-6 py-3 rounded-xl bg-violet-600 text-white flex items-center gap-2 font-semibold hover:bg-violet-700"
            >
              {current === questions.length - 1
                ? "Finish Test"
                : "Next"}

              <ChevronRight size={18} />

            </button>

          </div>

        </div>

        {/* QUESTION NAVIGATOR */}

        <div className="bg-white border rounded-3xl p-6 mt-6">

          <p className="text-sm font-bold text-slate-700">
            Questions
          </p>

          <div className="flex flex-wrap gap-2 mt-4">

            {questions.map((_, index) => (

              <button
                key={index}
                onClick={() => {
                  setCurrent(index);
                  setSelected(
                    answers[index] ?? null
                  );
                }}
                className={`w-10 h-10 rounded-xl text-sm font-bold ${
                  index === current
                    ? "bg-violet-600 text-white"
                    : answers[index] !== undefined
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {index + 1}
              </button>

            ))}

          </div>

        </div>

      </main>

    </div>
  );
}
