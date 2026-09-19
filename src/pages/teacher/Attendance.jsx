import React, { useState } from "react";
import { useApp } from "../../context";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
export default function Attendance() {
  const { data, markAttendance, notify } = useApp();
  const [date, setDate] = useState("2026-09-15"),
    [view, setView] = useState(null);
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
          value={
            data.students.filter((s) => s.lastAttendanceStatus === "PRESENT")
              .length || data.students.length - 7
          }
          label="Present"
          icon={<Icon name="check" />}
          accent="green"
        />
        <StatCard
          value={
            data.students.filter((s) => s.lastAttendanceStatus === "ABSENT")
              .length || 7
          }
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
            <h2>Attendance</h2>
            <span className="muted">
              Mark present or absent; every action updates the frontend state.
            </span>
          </div>
        </div>
        <Table
          columns={["Roll #", "Full Name", "Status", "Action"]}
          rows={data.students.slice(0, 30)}
          renderRow={(s, i) => {
            const status =
              s.lastAttendanceDate === date
                ? s.lastAttendanceStatus
                : i % 8 === 0
                  ? "ABSENT"
                  : "NOT MARKED";
            return (
              <tr key={s.id}>
                <td>{s.roll}</td>
                <td>{s.name}</td>
                <td>
                  <Status>{status}</Status>
                </td>
                <td>
                  <div className="action-row">
                    <button
                      className="small-action present"
                      onClick={() => {
                        markAttendance(s.id, "PRESENT", date);
                        notify(`${s.name}: present`);
                      }}
                    >
                      Present
                    </button>
                    <button
                      className="small-action absent"
                      onClick={() => {
                        markAttendance(s.id, "ABSENT", date);
                        notify(`${s.name}: absent`);
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
            ["Status", view.lastAttendanceStatus || "NOT MARKED"],
          ]}
        />
      )}
    </>
  );
}
