import React, { useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
import Modal from "../../components/common/Modal/Modal";
import { Field } from "../../components/common/FormFields/FormFields";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Assignments() {
  const { data, addAssignment, removeAssignment, setAssignmentStatus, notify } =
    useApp();
  const [modal, setModal] = useState(false),
    [view, setView] = useState(null),
    [page, setPage] = useState(1);
  const shown = data.assignments.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(data.assignments.length / 10));
  return (
    <>
      <div className="stats-grid three">
        <StatCard
          value={data.assignments.length}
          label="Assigned"
          icon={<Icon name="file" />}
        />
        <StatCard
          value={data.assignments.filter((a) => a.status === "APPROVED").length}
          label="Approved / Submitted"
          icon={<Icon name="check" />}
          accent="green"
        />
        <StatCard
          value={
            data.assignments.filter(
              (a) => !["APPROVED", "SUBMITTED"].includes(a.status),
            ).length
          }
          label="Pending Review"
          icon={<Icon name="clock" />}
          accent="yellow"
        />
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Assignments</h2>
            <span className="muted">
              Create, review, approve or reject student work
            </span>
          </div>
          <button className="primary-btn" onClick={() => setModal(true)}>
            <Icon name="plus" size={16} /> New Assignment
          </button>
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
                  onEdit={() => {
                    setAssignmentStatus(a.id, "APPROVED");
                    notify("Assignment approved");
                  }}
                  onToggle={() => {
                    setAssignmentStatus(a.id, "APPROVED");
                    notify("Assignment approved");
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
          total={data.assignments.length}
          shown={shown.length}
          label="assignments"
        />
      </section>
      {modal && (
        <Modal title="Create Assignment" onClose={() => setModal(false)}>
          <form
            className="form-grid"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              addAssignment({
                title: f.get("title"),
                topics: Number(f.get("topics") || 1),
                dueDate: f.get("dueDate"),
                course: "Modern Web Application Development",
              });
              setModal(false);
              notify("Assignment created");
            }}
          >
            <Field label="Title" name="title" required />
            <Field
              label="Topics"
              name="topics"
              type="number"
              defaultValue="1"
            />
            <Field label="Due Date" name="dueDate" type="date" required />
            <div className="modal-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="primary-btn">Create</button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Assignment"
          onClose={() => setView(null)}
          items={[
            ["Title", view.title],
            ["Course", view.course],
            ["Due Date", view.dueDate],
            ["Status", view.status],
          ]}
        />
      )}
    </>
  );
}
