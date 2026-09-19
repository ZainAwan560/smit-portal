import React from "react";
export default function ClassSchedule() {
  return (
    <aside className="schedule-card">
      <h2>▣ Class Schedule</h2>
      <div className="week">
        {[
          "Sun 13",
          "Mon 14",
          "Tue 15",
          "Wed 16",
          "Thu 17",
          "Fri 18",
          "Sat 19",
        ].map((d, i) => (
          <span
            className={i === 1 || i === 3 || i === 5 ? "selected" : ""}
            key={d}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="empty-tabs">
        <b>Assignments</b>
        <b className="selected-tab">Quizzes</b>
        <b>Events</b>
      </div>
      <div className="empty-state">No upcoming quizzes</div>
    </aside>
  );
}
