import React from "react";
import { course } from "../../data/mock";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
export default function Dashboard() {
  return (
    <>
      <div className="stats-grid">
        <StatCard
          value="57"
          label="Students"
          icon={<Icon name="users" />}
          accent="green"
        />
        <StatCard
          value="13"
          label="Assignments"
          icon={<Icon name="file" />}
          accent="purple"
        />
        <StatCard
          value="7"
          label="Quizzes"
          icon={<Icon name="quiz" />}
          accent="yellow"
        />
      </div>
      <section className="teacher-course">
        <div className="teacher-course-head">
          <div>
            <h1>{course.title}</h1>
            <div className="schedule">
              {course.schedule.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
          <span className="enrolled">ACTIVE</span>
        </div>
        <div className="progress-line">
          <span>Course Progress</span>
          <b>69% Completed</b>
          <div>
            <i style={{ width: "69%" }} />
          </div>
        </div>
        <div className="course-meta">
          <span>
            ⌗ <b>Batch:</b> {course.batch}
          </span>
          <span>
            ⌖ <b>Campus:</b> {course.campus}
          </span>
          <span>
            ⌖ <b>City:</b> {course.city}
          </span>
        </div>
      </section>
      <div className="tab-strip">
        <a href="/teacher/students">Students</a>
        <a href="/teacher/attendance">Attendance</a>
        <a href="/teacher/assignments">Assignments</a>
        <a href="/teacher/quizzes">Quizzes</a>
        <a href="/teacher/progress">Course Progress</a>
      </div>
    </>
  );
}
