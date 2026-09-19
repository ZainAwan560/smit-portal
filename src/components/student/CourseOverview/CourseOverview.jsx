import React from "react";
export default function CourseOverview({ course }) {
  return (
    <section className="course-card">
      <div className="course-head">
        <div>
          <h1>{course.title}</h1>
          <div className="schedule">
            {course.schedule.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
        </div>
        <span className="enrolled">ENROLLED</span>
      </div>
      <div className="progress-line">
        <span>Progress</span>
        <b>74% Completed</b>
        <div>
          <i style={{ width: "74%" }} />
        </div>
      </div>
      <div className="course-meta">
        <span>
          ⌗ <b>Batch:</b> {course.batch}
        </span>
        <span>
          ♙ <b>Roll:</b> {course.roll}
        </span>
        <span>
          ⌖ <b>Campus:</b> {course.campus}
        </span>
        <span>
          ⌖ <b>City:</b> {course.city}
        </span>
      </div>
    </section>
  );
}
