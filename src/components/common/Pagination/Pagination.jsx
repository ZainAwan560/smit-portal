import React from "react";
export default function Pagination({
  page,
  pages,
  onChange,
  total,
  shown,
  label = "records",
}) {
  if (!pages) return null;
  const nums = [];
  for (let i = 1; i <= pages; i++)
    if (i === 1 || i === pages || Math.abs(i - page) <= 1) nums.push(i);
  const compact = [];
  nums.forEach((n) => {
    const last = compact[compact.length - 1];
    if (last && n - last > 1) compact.push("…");
    compact.push(n);
  });
  return (
    <div className="pagination">
      <span>
        Showing {shown ? (page - 1) * 10 + 1 : 0}–{Math.min(page * 10, total)}{" "}
        of {total} {label}
      </span>
      <span className="pagination-actions">
        <button disabled={page === 1} onClick={() => onChange(page - 1)}>
          ‹ Previous
        </button>
        {compact.map((n, i) =>
          n === "…" ? (
            <i key={`gap-${i}`}>…</i>
          ) : (
            <button
              key={n}
              className={page === n ? "page-active" : ""}
              onClick={() => onChange(n)}
            >
              {n}
            </button>
          ),
        )}
        <button disabled={page === pages} onClick={() => onChange(page + 1)}>
          Next ›
        </button>
      </span>
    </div>
  );
}
