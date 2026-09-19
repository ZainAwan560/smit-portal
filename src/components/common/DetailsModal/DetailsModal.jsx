import React from "react";
import Modal from "../Modal/Modal";
export default function DetailsModal({ title, items, onClose }) {
  return (
    <Modal title={title} onClose={onClose}>
      <div className="detail-grid">
        {items.map(([k, v]) => (
          <div key={k}>
            <small>{k}</small>
            <b>{v}</b>
          </div>
        ))}
      </div>
      <div className="modal-actions">
        <button className="secondary-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
