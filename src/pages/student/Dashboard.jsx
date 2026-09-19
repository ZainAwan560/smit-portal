import React from "react";
import { course, student } from "../../data/mock";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
import CourseOverview from "../../components/student/CourseOverview/CourseOverview";
import ClassSchedule from "../../components/student/ClassSchedule/ClassSchedule";
import FeeCard from "../../components/student/FeeCard/FeeCard";
export default function Dashboard() {
  return (
    <>
      <div className="stats-grid">
        <StatCard
          value={`${student.attendance.present}/${student.attendance.total}`}
          label="Attendance"
          icon={<Icon name="clock" />}
          accent="green"
        />
        <StatCard
          value="8/13"
          label="Assignment"
          icon={<Icon name="quiz" />}
          accent="purple"
        />
      </div>
      <div className="dashboard-grid">
        <CourseOverview course={course} />
        <ClassSchedule />
      </div>
      <FeeCard />
    </>
  );
}
