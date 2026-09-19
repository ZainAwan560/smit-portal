import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import Topbar from "../components/layout/Topbar/Topbar";
const menus = {
  student: [
    ["dashboard", "Dashboard", "grid"],
    ["progress", "Progress", "book"],
    ["attendance", "Attendance", "calendar"],
    ["payment", "Payment", "card"],
    ["assignment", "Assignment", "file"],
    ["quiz", "Quiz", "quiz"],
  ],
  teacher: [
    ["dashboard", "Dashboard", "grid"],
    ["students", "Students", "users"],
    ["attendance", "Attendance", "calendar"],
    ["assignments", "Assignments", "file"],
    ["quizzes", "Quizzes", "quiz"],
    ["progress", "Course Progress", "book"],
  ],
  admin: [
    ["dashboard", "Dashboard", "grid"],
    ["students", "Students", "users"],
    ["teachers", "Teachers", "users"],
    ["courses", "Courses", "book"],
    ["attendance", "Attendance", "calendar"],
    ["assignments", "Assignments", "file"],
    ["quizzes", "Quizzes", "quiz"],
    ["progress", "Course Progress", "book"],
    ["payments", "Payments", "money"],
  ],
};
export default function PortalLayout({ role }) {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const key = loc.pathname.split("/").filter(Boolean).pop() || "dashboard";
  const titles = {
    dashboard: "Dashboard",
    progress: "Course Progress",
    attendance: "Attendance",
    payment: "Payment",
    assignment: "Assignment",
    quiz: "Quiz",
    students: "Students",
    teachers: "Teachers",
    courses: "Courses",
    assignments: "Assignments",
    quizzes: "Quizzes",
    payments: "Payments",
  };
  const items = menus[role].map(([to, label, icon]) => ({
    to: `/${role}/${to}`,
    label,
    icon,
  }));
  return (
    <div className="portal-shell">
      <Sidebar role={role} open={open} setOpen={setOpen} items={items} />
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <main className="main">
        <Topbar
          title={titles[key] || "Dashboard"}
          onMenu={() => setOpen(true)}
        />
        <div className="page">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
