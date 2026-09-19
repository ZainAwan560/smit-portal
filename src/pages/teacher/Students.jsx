import React, { useMemo, useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import Modal from "../../components/common/Modal/Modal";
import { Field } from "../../components/common/FormFields/FormFields";
import Icon from "../../components/common/Icon/Icon";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Students() {
  const { data, addStudent, updateStudent, removeStudent, notify } = useApp();
  const [q, setQ] = useState(""),
    [view, setView] = useState(null),
    [modal, setModal] = useState(null),
    [page, setPage] = useState(1);
  const rows = useMemo(
    () =>
      data.students.filter((s) =>
        `${s.name} ${s.roll} ${s.email}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [data.students, q],
  );
  const shown = rows.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(rows.length / 10));
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id,
      name: f.get("name"),
      roll: f.get("roll"),
      email: f.get("email"),
      batch: f.get("batch"),
      status: f.get("status"),
      attendance: modal?.attendance || "94%",
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
              View and manage students assigned to your course
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
        </div>
        <Table
          columns={["Name", "Roll Number", "Email", "Status", "Action"]}
          rows={shown}
          renderRow={(s) => (
            <tr key={s.id}>
              <td>
                <div className="person">
                  <span className="avatar sm">
                    {s.name.slice(0, 2).toUpperCase()}
                  </span>
                  {s.name}
                </div>
              </td>
              <td>{s.roll}</td>
              <td>{s.email}</td>
              <td>
                <Status>{s.status}</Status>
              </td>
              <td>
                <ActionMenu
                  onView={() => setView(s)}
                  onEdit={() => setModal(s)}
                  onDelete={() => {
                    if (confirm("Remove this student?")) {
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
