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
export default function Teachers() {
  const {
    data,
    addTeacher,
    updateTeacher,
    removeTeacher,
    toggleTeacher,
    notify,
  } = useApp();
  const [q, setQ] = useState(""),
    [modal, setModal] = useState(null),
    [view, setView] = useState(null),
    [page, setPage] = useState(1);
  const size = 10;
  const rows = useMemo(
    () =>
      data.teachers.filter((t) =>
        `${t.name} ${t.email} ${t.course} ${t.status}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [data.teachers, q],
  );
  const pages = Math.max(1, Math.ceil(rows.length / size));
  const shown = rows.slice((page - 1) * size, page * size);
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id,
      name: f.get("name"),
      email: f.get("email"),
      course: f.get("course"),
      status: f.get("status"),
    };
    modal?.id ? updateTeacher(item) : addTeacher(item);
    setModal(null);
    notify(modal?.id ? "Teacher updated" : "Teacher added");
  };
  return (
    <>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Teachers</h2>
            <span className="muted">
              Create, edit, activate, deactivate, view and remove trainer
              accounts
            </span>
          </div>
          <button className="primary-btn" onClick={() => setModal({})}>
            <Icon name="plus" size={16} /> Add Teacher
          </button>
        </div>
        <div className="table-tools">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search teachers..."
          />
          <select
            onChange={(e) => {
              setQ(e.target.value === "ALL" ? "" : e.target.value);
              setPage(1);
            }}
          >
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <Table
          columns={["Teacher", "Email", "Assigned Course", "Status", "Action"]}
          rows={shown}
          renderRow={(t) => (
            <tr key={t.id}>
              <td>
                <div className="person">
                  <div className="avatar sm">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  {t.name}
                </div>
              </td>
              <td>{t.email}</td>
              <td>{t.course}</td>
              <td>
                <Status>{t.status}</Status>
              </td>
              <td>
                <ActionMenu
                  onView={() => setView(t)}
                  onEdit={() => setModal(t)}
                  onToggle={() => {
                    toggleTeacher(t.id);
                    notify("Teacher status updated");
                  }}
                  onDelete={() => {
                    if (confirm("Delete this teacher?")) {
                      removeTeacher(t.id);
                      notify("Teacher removed");
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
          label="teachers"
        />
      </section>
      {modal && (
        <Modal
          title={modal.id ? "Edit Teacher" : "Add Teacher"}
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
              label="Email"
              name="email"
              type="email"
              defaultValue={modal.email || ""}
              required
            />
            <Field
              label="Assigned Course"
              name="course"
              defaultValue={
                modal.course || "Modern Web Application Development"
              }
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
                {modal.id ? "Save Changes" : "Add Teacher"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Teacher Details"
          onClose={() => setView(null)}
          items={[
            ["Name", view.name],
            ["Email", view.email],
            ["Course", view.course],
            ["Status", view.status],
          ]}
        />
      )}
    </>
  );
}
