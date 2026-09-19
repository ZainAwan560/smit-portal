import React from "react";
export default function FeeCard() {
  return (
    <section className="fee-section">
      <h2>Fee</h2>
      <div className="fee-card">
        <div>
          <small>Month</small>
          <b>Sep 2026</b>
        </div>
        <div>
          <small>Amount</small>
          <b>Rs: 1000 /-</b>
        </div>
        <div>
          <small>Type</small>
          <b>Monthly</b>
        </div>
        <div>
          <small>Due date</small>
          <b>08-Sep-2026</b>
        </div>
        <div>
          <small>Voucher ID</small>
          <b>202609776510</b>
        </div>
        <span className="status status-paid">PAID</span>
      </div>
    </section>
  );
}
