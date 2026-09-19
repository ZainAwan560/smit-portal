import React, { useState } from "react";
import { useApp } from "../../context";
import Icon from "../../components/common/Icon/Icon";
import Status from "../../components/common/Status/Status";
import Modal from "../../components/common/Modal/Modal";
import { Field } from "../../components/common/FormFields/FormFields";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
export default function Courses() {
  const { data, addCourse, updateCourse, removeCourse, toggleCourse, notify } =
    useApp();
  const [modal, setModal] = useState(null),
    [view, setView] = useState(null);
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id,
      name: f.get("name"),
      batch: f.get("batch"),
      students: f.get("students"),
      topics: f.get("topics"),
      teacher: f.get("teacher"),
      progress: f.get("progress"),
      status: f.get("status"),
    };
    modal?.id ? updateCourse(item) : addCourse(item);
    setModal(null);
    notify(modal?.id ? "Course updated" : "Course added");
  };
  return (
    <>
      <div className="panel-heading page-heading">
        <div>
          <h2>Courses</h2>
          <span className="muted">
            Manage courses, batches, teachers, topics and progress
          </span>
        </div>
        <button className="primary-btn" onClick={() => setModal({})}>
          <Icon name="plus" size={16} /> Add Course
        </button>
      </div>
      <div className="course-admin-grid">
        {data.courses.map((c) => (
          <section className="course-admin-card" key={c.id}>
            <div className="course-admin-top">
              <div className="course-admin-icon">
                <Icon name="book" />
              </div>
              <Status>{c.status}</Status>
            </div>
            <h2>{c.name}</h2>
            <p>{c.batch}</p>
            <div className="course-admin-meta">
              <span>
                <b>{c.students}</b>
                <small>Students</small>
              </span>
              <span>
                <b>{c.topics}</b>
                <small>Topics</small>
              </span>
            </div>
            <div className="mini-progress">
              <span style={{ width: `${c.progress}%` }} />
            </div>
            <div className="course-admin-footer">
              <span>{c.teacher}</span>
              <b>{c.progress}% complete</b>
            </div>
            <div className="course-actions">
              <ActionMenu
                onView={() => setView(c)}
                onEdit={() => setModal(c)}
                onToggle={() => {
                  toggleCourse(c.id);
                  notify("Course status updated");
                }}
                onDelete={() => {
                  if (confirm("Delete this course?")) {
                    removeCourse(c.id);
                    notify("Course removed");
                  }
                }}
              />
            </div>
          </section>
        ))}
      </div>
      {modal && (
        <Modal
          title={modal.id ? "Edit Course" : "Add Course"}
          onClose={() => setModal(null)}
        >
          <form className="form-grid" onSubmit={save}>
            <Field
              label="Course Name"
              name="name"
              defaultValue={modal.name || ""}
              required
            />
            <Field
              label="Batch"
              name="batch"
              defaultValue={modal.batch || "Batch 20"}
              required
            />
            <Field
              label="Students"
              name="students"
              type="number"
              defaultValue={modal.students || 0}
            />
            <Field
              label="Topics"
              name="topics"
              type="number"
              defaultValue={modal.topics || 0}
            />
            <Field
              label="Teacher"
              name="teacher"
              defaultValue={modal.teacher || "SMIT Trainer"}
              required
            />
            <Field
              label="Progress %"
              name="progress"
              type="number"
              min="0"
              max="100"
              defaultValue={modal.progress || 0}
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
                {modal.id ? "Save Changes" : "Add Course"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Course Details"
          onClose={() => setView(null)}
          items={[
            ["Course", view.name],
            ["Batch", view.batch],
            ["Students", view.students],
            ["Topics", view.topics],
            ["Teacher", view.teacher],
            ["Progress", `${view.progress}%`],
            ["Status", view.status],
          ]}
        />
      )}
    </>
  );
}
