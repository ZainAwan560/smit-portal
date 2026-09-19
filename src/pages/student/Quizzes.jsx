import React, { useMemo, useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import Modal from "../../components/common/Modal/Modal";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Quizzes() {
  const { data, notify } = useApp();
  const [view, setView] = useState(null),
    [quiz, setQuiz] = useState(null),
    [q, setQ] = useState(0),
    [page, setPage] = useState(1);
  const rows = useMemo(() => data.quizzes, [data.quizzes]);
  const shown = rows.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(rows.length / 10));
  return (
    <>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Quiz</h2>
            <span className="muted">Your quizzes and attempts</span>
          </div>
        </div>
        <Table
          columns={[
            "Title",
            "Module",
            "Questions",
            "Attempts",
            "Percentage",
            "Status",
            "Action",
          ]}
          rows={shown}
          renderRow={(x) => (
            <tr key={x.id}>
              <td>{x.title}</td>
              <td>{x.course}</td>
              <td>{x.questions}</td>
              <td>{x.attempts || "0 / 3"}</td>
              <td>{x.percentage}</td>
              <td>
                <Status>{x.result}</Status>
              </td>
              <td>
                <button
                  className="small-action present"
                  onClick={() => {
                    setQuiz(x);
                    setQ(0);
                  }}
                >
                  Start / Next
                </button>
                <button className="icon-btn" onClick={() => setView(x)}>
                  View
                </button>
              </td>
            </tr>
          )}
        />
        <Pagination
          page={page}
          pages={pages}
          onChange={setPage}
          total={rows.length}
          shown={shown.length}
          label="quizzes"
        />
      </section>
      {view && (
        <DetailsModal
          title="Quiz Details"
          onClose={() => setView(null)}
          items={[
            ["Title", view.title],
            ["Module", view.course],
            ["Questions", view.questions],
            ["Attempts", view.attempts],
            ["Percentage", view.percentage],
            ["Result", view.result],
          ]}
        />
      )}{" "}
      {quiz && (
        <Modal
          title={`${quiz.title} — Question ${q + 1}`}
          onClose={() => setQuiz(null)}
        >
          <div className="quiz-question">
            <h3>Sample frontend question</h3>
            <p>Which option best describes a reusable React component?</p>
            {[
              "A function that returns UI",
              "A database table",
              "A CSS file only",
              "A browser extension",
            ].map((x) => (
              <button
                key={x}
                className="quiz-option"
                onClick={() => {
                  if (q < 4) {
                    setQ(q + 1);
                    notify(`Answer saved. Moving to question ${q + 2}`);
                  } else {
                    notify("Quiz completed");
                    setQuiz(null);
                  }
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
}
