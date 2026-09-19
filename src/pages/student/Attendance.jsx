import React from "react";
import { student, attendanceDates } from "../../data/mock";
import StatCard from "../../components/common/StatCard/StatCard";
import Icon from "../../components/common/Icon/Icon";
import { Table } from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
export default function Attendance() {
  return (
    <>
      <div className="stats-grid four">
        <StatCard
          value={student.attendance.total}
          label="Total Classes"
          icon={<Icon name="calendar" />}
        />
        <StatCard
          value={student.attendance.present}
          label="Present"
          icon={<Icon name="check" />}
          accent="green"
        />
        <StatCard
          value={student.attendance.leave}
          label="Leave"
          icon={<Icon name="clock" />}
          accent="yellow"
        />
        <StatCard
          value={student.attendance.absent}
          label="Absent"
          icon={<Icon name="x" />}
          accent="red"
        />
      </div>
      <section className="panel attendance-panel">
        <div className="panel-title">
          <h2>Attendance Overview</h2>
          <b>94%</b>
        </div>
        <p>Your attendance is good. Keep it up!</p>
        <div className="big-progress">
          <i style={{ width: "94%" }} />
        </div>
        <div className="select">Sep 2026⌄</div>
        <Table headers={["Class", "Date", "Status"]}>
          {attendanceDates.map((d, i) => (
            <tr key={d}>
              <td>{i + 1}</td>
              <td>{d}</td>
              <td>
                <Status>PRESENT</Status>
              </td>
            </tr>
          ))}
        </Table>
      </section>
    </>
  );
}
