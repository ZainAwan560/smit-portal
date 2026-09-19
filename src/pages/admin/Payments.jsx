import React, { useMemo, useState } from "react";
import { useApp } from "../../context";
import Table from "../../components/common/Table/Table";
import Status from "../../components/common/Status/Status";
import Icon from "../../components/common/Icon/Icon";
import Modal from "../../components/common/Modal/Modal";
import { Field } from "../../components/common/FormFields/FormFields";
import ActionMenu from "../../components/common/ActionMenu/ActionMenu";
import DetailsModal from "../../components/common/DetailsModal/DetailsModal";
import Pagination from "../../components/common/Pagination/Pagination";
export default function Payments() {
  const { data, addPayment, updatePayment, removePayment, notify } = useApp();
  const [modal, setModal] = useState(null),
    [view, setView] = useState(null),
    [q, setQ] = useState(""),
    [page, setPage] = useState(1);
  const rows = useMemo(
    () =>
      data.payments.filter((p) =>
        `${p.month} ${p.voucher} ${p.status}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [data.payments, q],
  );
  const shown = rows.slice((page - 1) * 10, page * 10),
    pages = Math.max(1, Math.ceil(rows.length / 10));
  const save = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      id: modal?.id,
      month: f.get("month"),
      amount: f.get("amount"),
      type: f.get("type"),
      dueDate: f.get("dueDate"),
      voucher: f.get("voucher"),
      status: f.get("status"),
    };
    modal?.id ? updatePayment(item) : addPayment(item);
    setModal(null);
    notify(modal?.id ? "Payment updated" : "Payment added");
  };
  return (
    <>
      <section className="panel">
        <div className="panel-heading">
          <div>
            <h2>Payments</h2>
            <span className="muted">Manage monthly fee records</span>
          </div>
          <button className="primary-btn" onClick={() => setModal({})}>
            <Icon name="plus" size={16} /> Add Payment
          </button>
        </div>
        <div className="table-tools">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search month, voucher or status..."
          />
        </div>
        <Table
          columns={[
            "Month",
            "Amount",
            "Type",
            "Due Date",
            "Voucher ID",
            "Status",
            "Action",
          ]}
          rows={shown}
          renderRow={(p) => (
            <tr key={p.id}>
              <td>{p.month}</td>
              <td>{p.amount}</td>
              <td>{p.type}</td>
              <td>{p.dueDate}</td>
              <td>{p.voucher}</td>
              <td>
                <Status>{p.status}</Status>
              </td>
              <td>
                <ActionMenu
                  onView={() => setView(p)}
                  onEdit={() => setModal(p)}
                  onToggle={() => {
                    updatePayment({
                      ...p,
                      status: p.status === "PAID" ? "PENDING" : "PAID",
                    });
                    notify("Payment status updated");
                  }}
                  onDelete={() => {
                    if (confirm("Delete this payment?")) {
                      removePayment(p.id);
                      notify("Payment removed");
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
          label="payments"
        />
      </section>
      {modal && (
        <Modal
          title={modal.id ? "Edit Payment" : "Add Payment"}
          onClose={() => setModal(null)}
        >
          <form className="form-grid" onSubmit={save}>
            <Field
              label="Month"
              name="month"
              defaultValue={modal.month || "Oct 2026"}
              required
            />
            <Field
              label="Amount"
              name="amount"
              defaultValue={modal.amount || "Rs: 1000 /-"}
              required
            />
            <Field
              label="Type"
              name="type"
              defaultValue={modal.type || "Monthly"}
              required
            />
            <Field
              label="Due Date"
              name="dueDate"
              type="date"
              defaultValue={
                modal.dueDate && /\d{4}-\d{2}-\d{2}/.test(modal.dueDate)
                  ? modal.dueDate
                  : ""
              }
              required
            />
            <Field
              label="Voucher ID"
              name="voucher"
              defaultValue={modal.voucher || ""}
              required
            />
            <label className="field">
              <span>Status</span>
              <select name="status" defaultValue={modal.status || "PENDING"}>
                <option>PAID</option>
                <option>PENDING</option>
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
                {modal.id ? "Save Changes" : "Add Payment"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {view && (
        <DetailsModal
          title="Payment Details"
          onClose={() => setView(null)}
          items={[
            ["Month", view.month],
            ["Amount", view.amount],
            ["Type", view.type],
            ["Due Date", view.dueDate],
            ["Voucher", view.voucher],
            ["Status", view.status],
          ]}
        />
      )}
    </>
  );
}
