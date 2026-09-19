import React, { useMemo, useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import Icon from "../../components/common/Icon/Icon";
import Modal from "../../components/common/Modal/Modal";
import { Field } from "../../components/common/FormFields/FormFields";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Assignments() {
  const {
    data,
    addAssignment,
    updateAssignment,
    removeAssignment,
    setAssignmentStatus,
    notify,
  } = useApp();
  const [modal, setModal] = useState(null),
    [view, setView] = useState(null),
    [page, setPage] = useState(1),
    [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      data.assignments.filter((a) =>
        `${a.title} ${a.course} ${a.status}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [data.assignments, q],
  );
  const shown = rows.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(rows.length / 10));
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id,
      title: f.get("title"),
      topics: Number(f.get("topics") || 0),
      dueDate: f.get("dueDate"),
      course: f.get("course"),
      status: f.get("status"),
      createdBy: modal?.createdBy || "Current User",
    };
    modal?.id ? updateAssignment(item) : addAssignment(item);
    setModal(null);
    notify(modal?.id ? "Assignment updated" : "Assignment created");
  };
  return (
    <>
      <div className="stats-grid three">
        <div className="stat-card">
          <div>
            <div className="stat-value">{data.assignments.length}</div>
            <div className="stat-label">Assigned</div>
          </div>
          <div className="stat-icon blue">
            <Icon name="file" />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">
              {
                data.assignments.filter((a) =>
                  ["SUBMITTED", "APPROVED"].includes(a.status),
                ).length
              }
            </div>
            <div className="stat-label">Submitted / Approved</div>
          </div>
          <div className="stat-icon green">
            <Icon name="check" />
          </div>
        </div>
        <div className="stat-card">
          <div>
            <div className="stat-value">
              {
                data.assignments.filter(
                  (a) => !["SUBMITTED", "APPROVED"].includes(a.status),
                ).length
              }
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-icon yellow">
            <Icon name="clock" />
          </div>
        </div>
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Assignments</h2>
            <span className="muted">
              Create, edit, approve, reject and remove assignments
            </span>
          </div>
          <button className="primary-btn" onClick={() => setModal({})}>
            <Icon name="plus" size={16} /> New Assignment
          </button>
        </div>
        <div className="table-tools">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search assignments..."
          />
        </div>
        <Table
          columns={["Assignment", "Topics", "Due Date", "Status", "Action"]}
          rows={shown}
          renderRow={(a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.topics || "—"}</td>
              <td>{a.dueDate}</td>
              <td>
                <Status>{a.status}</Status>
              </td>
              <td>
                <ActionMenu
                  onView={() => setView(a)}
                  onEdit={() => setModal(a)}
                  onToggle={() => {
                    setAssignmentStatus(
                      a.id,
                      a.status === "APPROVED" ? "PENDING" : "APPROVED",
                    );
                    notify(
                      a.status === "APPROVED"
                        ? "Assignment moved to pending"
                        : "Assignment approved",
                    );
                  }}
                  onReject={() => {
                    setAssignmentStatus(a.id, "REJECTED");
                    notify("Assignment rejected");
                  }}
                  onDelete={() => {
                    if (confirm("Delete this assignment?")) {
                      removeAssignment(a.id);
                      notify("Assignment removed");
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
          label="assignments"
        />
      </section>
      {modal && (
        <Modal
          title={modal.id ? "Edit Assignment" : "New Assignment"}
          onClose={() => setModal(null)}
        >
          <form className="form-grid" onSubmit={save}>
            <Field
              label="Assignment Title"
              name="title"
              defaultValue={modal.title || ""}
              required
            />
            <Field
              label="Topics"
              name="topics"
              type="number"
              defaultValue={modal.topics || 1}
            />
            <Field
              label="Due Date"
              name="dueDate"
              type="date"
              defaultValue={
                modal.dueDate && /\d{4}-\d{2}-\d{2}/.test(modal.dueDate)
                  ? modal.dueDate
                  : ""
              }
              required
            />
            <Field
              label="Course"
              name="course"
              defaultValue={
                modal.course || "Modern Web Application Development"
              }
              required
            />
            <label className="field">
              <span>Status</span>
              <select name="status" defaultValue={modal.status || "PENDING"}>
                <option>PENDING</option>
                <option>SUBMITTED</option>
                <option>APPROVED</option>
                <option>REJECTED</option>
                <option>NOT SUBMITTED</option>
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
                {modal.id ? "Save Changes" : "Create Assignment"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Assignment Details"
          onClose={() => setView(null)}
          items={[
            ["Title", view.title],
            ["Topics", view.topics],
            ["Course", view.course],
            ["Due Date", view.dueDate],
            ["Status", view.status],
            ["Created By", view.createdBy],
          ]}
        />
      )}
    </>
  );
}
