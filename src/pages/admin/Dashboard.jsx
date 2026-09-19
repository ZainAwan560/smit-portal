import React from "react";
import { useApp } from "../../context";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
import Status from "../../components/common/Status/Status";
export default function Dashboard() {
  const { data } = useApp();
  const submitted = data.assignments.filter((a) =>
    ["SUBMITTED", "APPROVED"].includes(a.status),
  ).length;
  const activeTeachers = data.teachers.filter(
    (t) => t.status === "ACTIVE",
  ).length;
  const activeCourses = data.courses.filter(
    (c) => c.status === "ACTIVE",
  ).length;
  return (
    <>
      <div className="stats-grid four">
        <StatCard
          value={data.students.length}
          label="Total Students"
          icon={<Icon name="users" />}
          accent="green"
        />
        <StatCard
          value={activeTeachers}
          label="Total Teachers"
          icon={<Icon name="users" />}
          accent="purple"
        />
        <StatCard
          value={activeCourses}
          label="Total Courses"
          icon={<Icon name="book" />}
          accent="blue"
        />
        <StatCard
          value={data.courses.length}
          label="Active Batches"
          icon={<Icon name="calendar" />}
          accent="yellow"
        />
      </div>
      <div className="admin-dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Course Overview</h2>
              <span className="muted">Live data from course management</span>
            </div>
          </div>
          <div className="admin-course-list">
            {data.courses.map((c) => (
              <div className="admin-course" key={c.id}>
                <div>
                  <b>{c.name}</b>
                  <small>
                    {c.batch} · {c.students} students · {c.teacher}
                  </small>
                </div>
                <div className="mini-progress">
                  <span style={{ width: `${c.progress}%` }} />
                </div>
                <strong>{c.progress}%</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>System Summary</h2>
              <span className="muted">Current portal activity</span>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity">
              <div className="activity-dot" />
              <div>
                <b>Attendance</b>
                <p>Overall student attendance</p>
                <small>94%</small>
              </div>
            </div>
            <div className="activity">
              <div className="activity-dot" />
              <div>
                <b>Assignments</b>
                <p>{submitted} submitted / approved</p>
                <small>{data.assignments.length} total</small>
              </div>
            </div>
            <div className="activity">
              <div className="activity-dot" />
              <div>
                <b>Quizzes</b>
                <p>{data.quizzes.length} quizzes available</p>
                <small>
                  {data.quizzes.filter((q) => q.status === "ACTIVE").length}{" "}
                  active
                </small>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="stats-grid three admin-bottom">
        <StatCard
          value="94%"
          label="Overall Attendance"
          icon={<Icon name="check" />}
          accent="green"
        />
        <StatCard
          value={data.assignments.length}
          label="Assigned Work"
          icon={<Icon name="file" />}
          accent="purple"
        />
        <StatCard
          value={`${submitted}/${data.assignments.length}`}
          label="Assignments Submitted"
          icon={<Icon name="check" />}
          accent="blue"
        />
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Quick Actions</h2>
            <span className="muted">
              Use the sidebar to add, edit, approve, reject or remove records.
            </span>
          </div>
          <Status>ADMIN ACTIVE</Status>
        </div>
      </section>
    </>
  );
}
