import React from "react";
export default function ProgressTopic({ name, done, total, pct }) {
  return (
    <div className="progress-row">
      <div className="topic-icon">{pct === 100 ? "✓" : "◷"}</div>
      <div className="topic-copy">
        <h3>{name}</h3>
        <p>
          Topics: {done}/{total}
        </p>
      </div>
      <div className="ring" style={{ "--pct": `${pct * 3.6}deg` }}>
        {pct}%
      </div>
      <span>⌄</span>
    </div>
  );
}
