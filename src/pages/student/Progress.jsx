import React, { useState } from "react";
import { useTopics } from "../../context";
export default function Progress() {
  const topics = useTopics(),
    [open, setOpen] = useState(null);
  const total = topics.reduce((s, t) => s + t.total, 0),
    done = topics.reduce((s, t) => s + t.done, 0);
  return (
    <>
      <div className="summary-grid">
        <div>
          <b>{total}</b>
          <span>Total Topics</span>
        </div>
        <div>
          <b>{done}</b>
          <span>Completed Topics</span>
        </div>
        <div>
          <b>{total - done}</b>
          <span>Pending Topics</span>
        </div>
      </div>
      <section className="progress-list">
        {topics.map((t, i) => (
          <div className="progress-topic" key={t.name}>
            <button
              className="topic-head"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="topic-check">{t.pct === 100 ? "✓" : "◷"}</span>
              <span className="topic-copy">
                <b>{t.name}</b>
                <small>
                  Topics: {t.done}/{t.total}
                </small>
              </span>
              <span className="topic-pct">{t.pct}%</span>
              <span className="chevron">{open === i ? "⌃" : "⌄"}</span>
            </button>
            {open === i && (
              <div className="topic-dropdown">
                {t.topics.map((x, j) => (
                  <div className="topic-item" key={x}>
                    <span>{x}</span>
                    <b>
                      {j < Math.round((t.pct / 100) * t.topics.length)
                        ? "COMPLETED"
                        : "PENDING"}
                    </b>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
