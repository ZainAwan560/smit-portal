import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context";
import RoleLogin from "./pages/auth/RoleLogin";
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import AdminLayout from "./layouts/AdminLayout";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProgress from "./pages/student/Progress";
import StudentAttendance from "./pages/student/Attendance";
import StudentPayment from "./pages/student/Payment";
import StudentAssignments from "./pages/student/Assignments";
import StudentQuizzes from "./pages/student/Quizzes";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherStudents from "./pages/teacher/Students";
import TeacherAttendance from "./pages/teacher/Attendance";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherQuizzes from "./pages/teacher/Quizzes";
import TeacherProgress from "./pages/teacher/Progress";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminStudents from "./pages/admin/Students";
import AdminTeachers from "./pages/admin/Teachers";
import AdminCourses from "./pages/admin/Courses";
import AdminAttendance from "./pages/admin/Attendance";
import AdminAssignments from "./pages/admin/Assignments";
import AdminPayments from "./pages/admin/Payments";
import AdminQuizzes from "./pages/admin/Quizzes";
import AdminProgress from "./pages/admin/Progress";
function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<RoleLogin />} />
      <Route path="/login/:role" element={<Navigate to="/" replace />} />
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="payment" element={<StudentPayment />} />
        <Route path="assignment" element={<StudentAssignments />} />
        <Route path="quiz" element={<StudentQuizzes />} />
      </Route>
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="attendance" element={<TeacherAttendance />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="quizzes" element={<TeacherQuizzes />} />
        <Route path="progress" element={<TeacherProgress />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="assignments" element={<AdminAssignments />} />
        <Route path="quizzes" element={<AdminQuizzes />} />
        <Route path="progress" element={<AdminProgress />} />
        <Route path="payments" element={<AdminPayments />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default function App() {
  return (
    <AppProvider>
      <RoutesApp />
    </AppProvider>
  );
}
