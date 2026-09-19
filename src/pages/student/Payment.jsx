import React from "react";
import { payments } from "../../data/mock";
import { Table } from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
export default function Payment() {
  return (
    <section className="panel">
      <Table
        headers={[
          "Month",
          "Amount",
          "Type",
          "Due date",
          "Voucher ID",
          "Status",
        ]}
      >
        {payments.map((p) => (
          <tr key={p[0]}>
            {p.slice(0, 5).map((x, i) => (
              <td key={i}>{x}</td>
            ))}
            <td>
              <Status>{p[5]}</Status>
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}
