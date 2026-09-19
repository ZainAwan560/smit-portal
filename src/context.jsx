import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  students as seedStudents,
  teachers as seedTeachers,
  courses as seedCourses,
  assignments as seedAssignments,
  quizzes as seedQuizzes,
  payments as seedPayments,
  attendanceDates,
} from "./data/mock";

const KEY = "smit-portal-demo-v3";
const seedTopics = [
  {
    name: "Web Designing",
    done: 20,
    total: 20,
    pct: 100,
    topics: [
      "HTML Basics",
      "CSS Fundamentals",
      "Responsive Design",
      "Figma UI",
      "Git & GitHub",
    ],
  },
  {
    name: "Front-End Development",
    done: 27,
    total: 31,
    pct: 87,
    topics: [
      "JavaScript Basics",
      "DOM Manipulation",
      "ES6",
      "Events",
      "Forms",
      "APIs",
    ],
  },
  {
    name: "Modern Front-End Development",
    done: 10,
    total: 14,
    pct: 71,
    topics: [
      "React Fundamentals",
      "Components",
      "Props",
      "State",
      "Hooks",
      "Routing",
    ],
  },
  {
    name: "Back-End Development",
    done: 0,
    total: 16,
    pct: 0,
    topics: [
      "Node.js",
      "Express",
      "REST API",
      "MongoDB",
      "Authentication",
      "Deployment",
    ],
  },
];
const initial = () => ({
  students: seedStudents.map((s, i) => ({
    ...s,
    id: `S-${s.roll}`,
    attendance: i % 5 === 0 ? "88%" : i % 3 === 0 ? "91%" : "94%",
    status: s.status || "ENROLLED",
  })),
  teachers: seedTeachers.map((t) => ({ ...t })),
  courses: seedCourses.map((c, i) => ({
    id: `C-${i + 1}`,
    name: c[0],
    batch: c[1],
    students: Number(c[2].split(" ")[0]),
    topics: Number(c[3].split(" ")[0]),
    teacher: ["Muhammad Asad", "Ahmed Raza", "Sana Khan", "Bilal Ahmed"][i % 4],
    status: "ACTIVE",
    progress: [82, 74, 61, 100][i % 4],
  })),
  assignments: seedAssignments.map((a, i) => ({
    id: `A-${i + 1}`,
    title: a[0],
    topics: a[1] === "—" ? 0 : Number(a[1]),
    dueDate: a[2],
    status: a[3],
    course: "Modern Web Application Development",
    createdBy: "SMIT Trainer",
  })),
  quizzes: seedQuizzes.map((q, i) => ({
    id: `Q-${i + 1}`,
    title: q[0],
    course: q[1],
    questions: q[2],
    attempts: q[3],
    percentage: q[4],
    result: q[5],
    status: "ACTIVE",
    date: [
      "Jun 24, 2026",
      "Jun 3, 2026",
      "May 18, 2026",
      "Apr 17, 2026",
      "Mar 27, 2026",
      "Jan 7, 2026",
    ][i],
  })),
  payments: seedPayments.map((p, i) => ({
    id: `P-${i + 1}`,
    month: p[0],
    amount: p[1],
    type: p[2],
    dueDate: p[3],
    voucher: p[4],
    status: p[5],
  })),
  topics: seedTopics,
  attendance: attendanceDates.map((date, i) => ({
    date,
    status: i === 5 ? "ABSENT" : "PRESENT",
  })),
});
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || initial();
  } catch {
    return initial();
  }
}
const id = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const Ctx = createContext(null);
export function AppProvider({ children }) {
  const [data, setData] = useState(load),
    [toast, setToast] = useState("");
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(data)), [data]);
  const notify = (message) => {
    setToast(message);
    clearTimeout(window.__smitToast);
    window.__smitToast = setTimeout(() => setToast(""), 2200);
  };
  const api = useMemo(
    () => ({
      data,
      notify,
      resetDemo: () => setData(initial()),
      addStudent: (s) =>
        setData((d) => ({
          ...d,
          students: [
            { ...s, id: id("S"), status: "ENROLLED", attendance: "100%" },
            ...d.students,
          ],
        })),
      updateStudent: (student) =>
        setData((d) => ({
          ...d,
          students: d.students.map((x) => (x.id === student.id ? student : x)),
        })),
      removeStudent: (studentId) =>
        setData((d) => ({
          ...d,
          students: d.students.filter((x) => x.id !== studentId),
        })),
      toggleStudent: (studentId) =>
        setData((d) => ({
          ...d,
          students: d.students.map((x) =>
            x.id === studentId
              ? {
                  ...x,
                  status: x.status === "ENROLLED" ? "INACTIVE" : "ENROLLED",
                }
              : x,
          ),
        })),
      addTeacher: (t) =>
        setData((d) => ({
          ...d,
          teachers: [{ ...t, id: id("T"), status: "ACTIVE" }, ...d.teachers],
        })),
      updateTeacher: (teacher) =>
        setData((d) => ({
          ...d,
          teachers: d.teachers.map((x) => (x.id === teacher.id ? teacher : x)),
        })),
      removeTeacher: (teacherId) =>
        setData((d) => ({
          ...d,
          teachers: d.teachers.filter((x) => x.id !== teacherId),
        })),
      toggleTeacher: (teacherId) =>
        setData((d) => ({
          ...d,
          teachers: d.teachers.map((x) =>
            x.id === teacherId
              ? { ...x, status: x.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
              : x,
          ),
        })),
      addCourse: (c) =>
        setData((d) => ({
          ...d,
          courses: [
            {
              ...c,
              id: id("C"),
              students: Number(c.students || 0),
              topics: Number(c.topics || 0),
              progress: Number(c.progress || 0),
              status: c.status || "ACTIVE",
            },
            ...d.courses,
          ],
        })),
      updateCourse: (course) =>
        setData((d) => ({
          ...d,
          courses: d.courses.map((x) => (x.id === course.id ? course : x)),
        })),
      removeCourse: (courseId) =>
        setData((d) => ({
          ...d,
          courses: d.courses.filter((x) => x.id !== courseId),
        })),
      toggleCourse: (courseId) =>
        setData((d) => ({
          ...d,
          courses: d.courses.map((x) =>
            x.id === courseId
              ? { ...x, status: x.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
              : x,
          ),
        })),
      addAssignment: (a) =>
        setData((d) => ({
          ...d,
          assignments: [
            {
              ...a,
              id: id("A"),
              status: a.status || "PENDING",
              createdBy: a.createdBy || "Current User",
            },
            ...d.assignments,
          ],
        })),
      updateAssignment: (a) =>
        setData((d) => ({
          ...d,
          assignments: d.assignments.map((x) => (x.id === a.id ? a : x)),
        })),
      removeAssignment: (assignmentId) =>
        setData((d) => ({
          ...d,
          assignments: d.assignments.filter((x) => x.id !== assignmentId),
        })),
      setAssignmentStatus: (assignmentId, status) =>
        setData((d) => ({
          ...d,
          assignments: d.assignments.map((x) =>
            x.id === assignmentId ? { ...x, status } : x,
          ),
        })),
      addQuiz: (q) =>
        setData((d) => ({
          ...d,
          quizzes: [
            {
              ...q,
              id: id("Q"),
              status: q.status || "ACTIVE",
              result: q.result || "—",
              attempts: q.attempts || "0 / 3",
              percentage: q.percentage || "—",
            },
            ...d.quizzes,
          ],
        })),
      updateQuiz: (q) =>
        setData((d) => ({
          ...d,
          quizzes: d.quizzes.map((x) => (x.id === q.id ? q : x)),
        })),
      removeQuiz: (quizId) =>
        setData((d) => ({
          ...d,
          quizzes: d.quizzes.filter((x) => x.id !== quizId),
        })),
      toggleQuiz: (quizId) =>
        setData((d) => ({
          ...d,
          quizzes: d.quizzes.map((x) =>
            x.id === quizId
              ? { ...x, status: x.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
              : x,
          ),
        })),
      addPayment: (p) =>
        setData((d) => ({
          ...d,
          payments: [
            { ...p, id: id("P"), status: p.status || "PENDING" },
            ...d.payments,
          ],
        })),
      updatePayment: (p) =>
        setData((d) => ({
          ...d,
          payments: d.payments.map((x) => (x.id === p.id ? p : x)),
        })),
      removePayment: (paymentId) =>
        setData((d) => ({
          ...d,
          payments: d.payments.filter((x) => x.id !== paymentId),
        })),
      markAttendance: (studentId, status, date) =>
        setData((d) => ({
          ...d,
          students: d.students.map((x) =>
            x.id === studentId
              ? { ...x, lastAttendanceDate: date, lastAttendanceStatus: status }
              : x,
          ),
          attendance: [
            ...d.attendance.filter(
              (x) => !(x.studentId === studentId && x.date === date),
            ),
            { studentId, date, status },
          ],
        })),
    }),
    [data],
  );
  return (
    <Ctx.Provider value={api}>
      {children}
      {toast && <div className="toast">{toast}</div>}
    </Ctx.Provider>
  );
}
export const useApp = () => useContext(Ctx);
export const useTopics = () => useApp().data.topics;
export const studentProfile = {
  name: "Zain Awan",
  fullName: "S Muzammil Javed - Zaitoon Ashraf IT Park",
};
