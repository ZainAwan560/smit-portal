import React, { useMemo, useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import Modal from "../../components/common/Modal/Modal";
import { Field } from "../../components/common/FormFields/FormFields";
import Icon from "../../components/common/Icon/Icon";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Quizzes() {
  const { data, addQuiz, updateQuiz, removeQuiz, toggleQuiz, notify } =
    useApp();
  const [modal, setModal] = useState(null),
    [view, setView] = useState(null),
    [q, setQ] = useState(""),
    [page, setPage] = useState(1);
  const rows = useMemo(
    () =>
      data.quizzes.filter((x) =>
        `${x.title} ${x.course} ${x.status}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [data.quizzes, q],
  );
  const shown = rows.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(rows.length / 10));
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id,
      title: f.get("title"),
      course: f.get("course"),
      questions: Number(f.get("questions") || 40),
      date: f.get("date"),
      status: f.get("status"),
      attempts: modal?.attempts || "0 / 3",
      percentage: modal?.percentage || "—",
      result: modal?.result || "—",
    };
    modal?.id ? updateQuiz(item) : addQuiz(item);
    setModal(null);
    notify(modal?.id ? "Quiz updated" : "Quiz created");
  };
  return (
    <>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Quizzes</h2>
            <span className="muted">
              Create, edit, activate, deactivate and remove quizzes
            </span>
          </div>
          <button className="primary-btn" onClick={() => setModal({})}>
            <Icon name="plus" size={16} /> New Quiz
          </button>
        </div>
        <div className="table-tools">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search quizzes..."
          />
        </div>
        <Table
          columns={["Quiz", "Course", "Date", "Questions", "Status", "Action"]}
          rows={shown}
          renderRow={(x) => (
            <tr key={x.id}>
              <td>{x.title}</td>
              <td>{x.course}</td>
              <td>{x.date}</td>
              <td>{x.questions}</td>
              <td>
                <Status>{x.status}</Status>
              </td>
              <td>
                <ActionMenu
                  onView={() => setView(x)}
                  onEdit={() => setModal(x)}
                  onToggle={() => {
                    toggleQuiz(x.id);
                    notify("Quiz status updated");
                  }}
                  onDelete={() => {
                    if (confirm("Delete this quiz?")) {
                      removeQuiz(x.id);
                      notify("Quiz removed");
                    }
                  }}
                />
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
      {modal && (
        <Modal
          title={modal.id ? "Edit Quiz" : "New Quiz"}
          onClose={() => setModal(null)}
        >
          <form className="form-grid" onSubmit={save}>
            <Field
              label="Quiz Title"
              name="title"
              defaultValue={modal.title || ""}
              required
            />
            <Field
              label="Questions"
              name="questions"
              type="number"
              defaultValue={modal.questions || 40}
            />
            <Field
              label="Date"
              name="date"
              type="date"
              defaultValue="2026-09-20"
              required
            />
            <Field
              label="Course"
              name="course"
              defaultValue={modal.course || "Modern Front-End Development"}
              required
            />
            <label className="field">
              <span>Status</span>
              <select name="status" defaultValue={modal.status || "ACTIVE"}>
                <option>ACTIVE</option>
                <option>INACTIVE</option>
              </select>
            </label>
            <div className="modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setModal(null)}
              >
                Cancel
              </button>
              <button className="primary-btn">
                {modal.id ? "Save Changes" : "Create Quiz"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Quiz Details"
          onClose={() => setView(null)}
          items={[
            ["Quiz", view.title],
            ["Course", view.course],
            ["Questions", view.questions],
            ["Attempts", view.attempts],
            ["Percentage", view.percentage],
            ["Result", view.result],
            ["Status", view.status],
          ]}
        />
      )}
    </>
  );
}
