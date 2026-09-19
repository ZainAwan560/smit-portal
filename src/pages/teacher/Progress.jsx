import React, { useState } from "react";
import { useTopics, studentProfile } from "../../context";
export default function Progress() {
  const topics = useTopics(),
    [open, setOpen] = useState(null),
    done = topics.reduce((s, t) => s + t.done, 0),
    total = topics.reduce((s, t) => s + t.total, 0),
    overall = Math.round((done / total) * 100);
  return (
    <>
      <div className="compare-bar">
        COMPARE PROGRESS <span>Only My Progress</span>
      </div>
      <section className="panel progress-teacher">
        <h2>Course Progress Overview</h2>
        <div className="student-progress">
          <b>{studentProfile.fullName}</b>
          <small>
            Mon 01:00 PM - 03:00 PM | Wed 01:00 PM - 03:00 PM | Fri 01:00 PM -
            03:00 PM
          </small>
          <div className="overall">
            <span>Overall progress</span>
            <b>{overall}%</b>
            <i>
              <em style={{ width: `${overall}%` }} />
            </i>
          </div>
          {topics.map((t, i) => (
            <div className="teacher-topic-wrap" key={t.name}>
              <button
                className="teacher-topic"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div>
                  <b>{t.name}</b>
                  <small>
                    Topics: {t.done}/{t.total}
                  </small>
                </div>
                <strong>{t.pct}%</strong>
                <span>{open === i ? "⌃" : "⌄"}</span>
              </button>
              {open === i && (
                <div className="topic-dropdown">
                  {t.topics.map((x, j) => (
                    <div className="topic-item" key={x}>
                      <span>{x}</span>
                      <b>
                        {j < (t.done / t.total) * t.topics.length
                          ? "COMPLETED"
                          : "PENDING"}
                      </b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
