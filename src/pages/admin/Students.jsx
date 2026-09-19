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
export default function Students() {
  const {
    data,
    addStudent,
    updateStudent,
    removeStudent,
    toggleStudent,
    notify,
  } = useApp();
  const [q, setQ] = useState(""),
    [modal, setModal] = useState(null),
    [view, setView] = useState(null),
    [page, setPage] = useState(1);
  const size = 10;
  const rows = useMemo(
    () =>
      data.students.filter((s) =>
        `${s.name} ${s.roll} ${s.email} ${s.batch}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [data.students, q],
  );
  const pages = Math.max(1, Math.ceil(rows.length / size));
  const shown = rows.slice((page - 1) * size, page * size);
  const openEdit = (s) => setModal(s);
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      name: f.get("name"),
      roll: f.get("roll"),
      email: f.get("email"),
      batch: f.get("batch"),
      status: f.get("status"),
      attendance: modal?.attendance || "100%",
      id: modal?.id,
    };
    modal?.id ? updateStudent(item) : addStudent(item);
    setModal(null);
    notify(modal?.id ? "Student updated" : "Student added");
  };
  return (
    <>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Students</h2>
            <span className="muted">
              Add, edit, activate, deactivate, view and remove students
            </span>
          </div>
          <button className="primary-btn" onClick={() => setModal({})}>
            <Icon name="plus" size={16} /> Add Student
          </button>
        </div>
        <div className="table-tools">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, email or roll no..."
          />
          <select
            onChange={(e) => {
              setQ(e.target.value === "ALL" ? "" : e.target.value);
              setPage(1);
            }}
          >
            <option value="ALL">All</option>
            <option value="ENROLLED">Enrolled</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <Table
          columns={[
            "Name",
            "Roll Number",
            "Email",
            "Batch",
            "Status",
            "Action",
          ]}
          rows={shown}
          renderRow={(s) => (
            <tr key={s.id}>
              <td>
                <div className="person">
                  <div className="avatar sm">
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  {s.name}
                </div>
              </td>
              <td>{s.roll}</td>
              <td>{s.email}</td>
              <td>{s.batch}</td>
              <td>
                <Status>{s.status}</Status>
              </td>
              <td>
                <ActionMenu
                  onView={() => setView(s)}
                  onEdit={() => openEdit(s)}
                  onToggle={() => {
                    toggleStudent(s.id);
                    notify("Student status updated");
                  }}
                  onDelete={() => {
                    if (confirm("Delete this student?")) {
                      removeStudent(s.id);
                      notify("Student removed");
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
          label="students"
        />
      </section>
      {modal && (
        <Modal
          title={modal.id ? "Edit Student" : "Add Student"}
          onClose={() => setModal(null)}
        >
          <form className="form-grid" onSubmit={save}>
            <Field
              label="Full Name"
              name="name"
              defaultValue={modal.name || ""}
              required
            />
            <Field
              label="Roll Number"
              name="roll"
              defaultValue={modal.roll || ""}
              required
            />
            <Field
              label="Email"
              name="email"
              type="email"
              defaultValue={modal.email || ""}
              required
            />
            <Field
              label="Batch"
              name="batch"
              defaultValue={modal.batch || "20"}
              required
            />
            <label className="field">
              <span>Status</span>
              <select name="status" defaultValue={modal.status || "ENROLLED"}>
                <option>ENROLLED</option>
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
                {modal.id ? "Save Changes" : "Add Student"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Student Details"
          onClose={() => setView(null)}
          items={[
            ["Name", view.name],
            ["Roll Number", view.roll],
            ["Email", view.email],
            ["Batch", view.batch],
            ["Attendance", view.attendance],
            ["Status", view.status],
          ]}
        />
      )}
    </>
  );
}
