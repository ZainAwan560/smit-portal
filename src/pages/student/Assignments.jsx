import React, { useMemo, useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Assignments() {
  const { data, notify } = useApp();
  const [view, setView] = useState(null),
    [page, setPage] = useState(1);
  const rows = useMemo(() => data.assignments, [data.assignments]);
  const shown = rows.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(rows.length / 10));
  return (
    <section className="panel">
      <div className="panel-heading">
        <div>
          <h2>Assignment</h2>
          <span className="muted">Your course assignments</span>
        </div>
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
                onEdit={() => notify(`${a.title}: submission opened`)}
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
          ]}
        />
      )}
    </section>
  );
}
