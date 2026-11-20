
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Users,
  ArrowLeft,
  UserPlus,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState<"student" | "mentor">("student");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    department: "",
    course: "",
    year: "",
    skills: "",
    bio: "",
    expertise: "",
  });

  const [error, setError] = useState("");

  const updateField = (
    field: string,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required.");
      return;
    }

    if (role === "student") {
      if (!form.department || !form.course) {
        setError("Please select department and course.");
        return;
      }
    }

    if (role === "mentor") {
      if (!form.expertise) {
        setError("Please enter your expertise.");
        return;
      }
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          role: role.toUpperCase(),
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
        setError(data.message || data.error || "Account creation failed.");
        return;
      }

      const newUser = {
        id: data.userId,
        name: data.name,
        email: data.email,
        role: (data.role || role).toLowerCase(),
        phone: form.phone,
        department: role === "student" ? form.department : "Mentor",
        course: role === "student" ? form.course : "",
        year: role === "student" ? form.year : "",
        skills: role === "student" ? form.skills : form.expertise,
        bio: form.bio,
        token: data.token,
      };

      localStorage.setItem("studentsphere_token", data.token || "");
      localStorage.setItem(
        "studentsphere_user",
        JSON.stringify(newUser)
      );
      localStorage.setItem(
        "studentsphere_current_user",
        JSON.stringify(newUser)
      );

      navigate("/dashboard");
    } catch {
      setError("Failed to connect to backend server. Make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">

      <div className="max-w-3xl mx-auto">

        {/* BACK */}

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-violet-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="flex justify-center">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-white flex items-center justify-center">
              <UserPlus size={28} />
            </div>

          </div>

          <h1 className="text-3xl font-bold mt-4">
            Create your StudentSphere account
          </h1>

          <p className="text-slate-500 mt-2">
            Join the open academic community
          </p>

        </div>

        {/* ROLE */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <button
            onClick={() => setRole("student")}
            className={`p-5 rounded-2xl border-2 bg-white ${
              role === "student"
                ? "border-violet-600"
                : "border-slate-200"
            }`}
          >

            <GraduationCap
              className="mx-auto text-violet-600"
            />

            <p className="font-bold mt-2">
              Student
            </p>

          </button>

          <button
            onClick={() => setRole("mentor")}
            className={`p-5 rounded-2xl border-2 bg-white ${
              role === "mentor"
                ? "border-blue-600"
                : "border-slate-200"
            }`}
          >

            <Users
              className="mx-auto text-blue-600"
            />

            <p className="font-bold mt-2">
              Mentor
            </p>

          </button>

        </div>

        {/* FORM */}

        <div className="bg-white rounded-3xl shadow-lg border p-8">

          <h2 className="text-xl font-bold mb-6">
            {role === "student"
              ? "Student Details"
              : "Mentor Details"}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* NAME */}

            <Field
              label="Full Name *"
              placeholder="Enter your name"
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
            />

            {/* EMAIL */}

            <Field
              label="Email *"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={(value) =>
                updateField("email", value)
              }
            />

            {/* PASSWORD */}

            <Field
              label="Password *"
              placeholder="Create password"
              type="password"
              value={form.password}
              onChange={(value) =>
                updateField("password", value)
              }
            />

            {/* PHONE */}

            <Field
              label="Contact Number"
              placeholder="+91 XXXXX XXXXX"
              value={form.phone}
              onChange={(value) =>
                updateField("phone", value)
              }
            />

            {role === "student" ? (
              <>
                {/* DEPARTMENT */}

                <div>

                  <label className="text-sm font-semibold">
                    Department *
                  </label>

                  <select
                    value={form.department}
                    onChange={(e) =>
                      updateField(
                        "department",
                        e.target.value
                      )
                    }
                    className="w-full mt-2 p-3 border rounded-xl"
                  >

                    <option value="">
                      Select Department
                    </option>

                    <option>CSE</option>
                    <option>AI & DS</option>
                    <option>ECE</option>
                    <option>EEE</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>IT</option>

                  </select>

                </div>

                {/* COURSE */}

                <Field
                  label="Course / Program *"
                  placeholder="B.E Computer Science"
                  value={form.course}
                  onChange={(value) =>
                    updateField("course", value)
                  }
                />

                {/* YEAR */}

                <div>

                  <label className="text-sm font-semibold">
                    Year
                  </label>

                  <select
                    value={form.year}
                    onChange={(e) =>
                      updateField(
                        "year",
                        e.target.value
                      )
                    }
                    className="w-full mt-2 p-3 border rounded-xl"
                  >

                    <option value="">
                      Select Year
                    </option>

                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>

                  </select>

                </div>

                {/* SKILLS */}

                <Field
                  label="Skills / Interests"
                  placeholder="Python, Java, AI..."
                  value={form.skills}
                  onChange={(value) =>
                    updateField("skills", value)
                  }
                />

              </>
            ) : (
              <>
                {/* EXPERTISE */}

                <Field
                  label="Expertise *"
                  placeholder="Java, AI, DBMS..."
                  value={form.expertise}
                  onChange={(value) =>
                    updateField("expertise", value)
                  }
                />

                {/* BIO */}

                <div className="md:col-span-2">

                  <label className="text-sm font-semibold">
                    Professional Bio
                  </label>

                  <textarea
                    value={form.bio}
                    onChange={(e) =>
                      updateField(
                        "bio",
                        e.target.value
                      )
                    }
                    placeholder="Tell students about your experience..."
                    className="w-full mt-2 p-3 border rounded-xl min-h-28"
                  />

                </div>

              </>
            )}

            {/* BIO */}

            {role === "student" && (
              <div className="md:col-span-2">

                <label className="text-sm font-semibold">
                  About You
                </label>

                <textarea
                  value={form.bio}
                  onChange={(e) =>
                    updateField(
                      "bio",
                      e.target.value
                    )
                  }
                  placeholder="Tell us about your learning goals..."
                  className="w-full mt-2 p-3 border rounded-xl min-h-28"
                />

              </div>
            )}

          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* CREATE */}

          <button
            onClick={handleRegister}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-bold"
          >
            Create {role === "student" ? "Student" : "Mentor"} Account
          </button>

        </div>

      </div>

    </div>
  );
}


/* FIELD COMPONENT */

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-violet-200"
      />

    </div>
  );
}
