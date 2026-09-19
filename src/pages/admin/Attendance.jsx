import React, { useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
export default function Attendance() {
  const { data, markAttendance, notify } = useApp();
  const [date, setDate] = useState("2026-09-15"),
    [view, setView] = useState(null);
  const present =
    data.students.filter((s) => s.lastAttendanceStatus === "PRESENT").length ||
    Math.round(data.students.length * 0.94);
  const absent = Math.max(0, data.students.length - present);
  return (
    <>
      <div className="date-select">
        Select a Date{" "}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="stats-grid four">
        <StatCard
          value={data.students.length}
          label="Total Students"
          icon={<Icon name="users" />}
        />
        <StatCard
          value={present}
          label="Present"
          icon={<Icon name="check" />}
          accent="green"
        />
        <StatCard
          value={absent}
          label="Absent"
          icon={<Icon name="x" />}
          accent="red"
        />
        <StatCard
          value="0"
          label="Leave"
          icon={<Icon name="clock" />}
          accent="yellow"
        />
      </div>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Attendance Overview</h2>
            <span className="muted">
              Mark attendance for the selected date. Changes are stored in the
              browser.
            </span>
          </div>
        </div>
        <Table
          columns={[
            "Roll #",
            "Full Name",
            "Course",
            "Attendance",
            "Status",
            "Action",
          ]}
          rows={data.students.slice(0, 30)}
          renderRow={(s, i) => {
            const status =
              s.lastAttendanceDate === date
                ? s.lastAttendanceStatus
                : i % 17 === 0
                  ? "ABSENT"
                  : "NOT MARKED";
            return (
              <tr key={s.id}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>{s.course || "Modern Web Application Development"}</td>
                <td>
                  <div className="table-progress">
                    <i style={{ width: s.attendance }} />
                  </div>
                  {s.attendance}
                </td>
                <td>
                  <Status>{status}</Status>
                </td>
                <td>
                  <div className="action-row">
                    <button
                      className="small-action present"
                      onClick={() => {
                        markAttendance(s.id, "PRESENT", date);
                        notify(`${s.name} marked present`);
                      }}
                    >
                      Present
                    </button>
                    <button
                      className="small-action absent"
                      onClick={() => {
                        markAttendance(s.id, "ABSENT", date);
                        notify(`${s.name} marked absent`);
                      }}
                    >
                      Absent
                    </button>
                    <button className="icon-btn" onClick={() => setView(s)}>
                      View
                    </button>
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </section>
      {view && (
        <DetailsModal
          title="Attendance Details"
          onClose={() => setView(null)}
          items={[
            ["Student", view.name],
            ["Roll", view.roll],
            ["Date", date],
            ["Attendance", view.attendance],
            ["Last Status", view.lastAttendanceStatus || "NOT MARKED"],
          ]}
        />
      )}
    </>
  );
}
