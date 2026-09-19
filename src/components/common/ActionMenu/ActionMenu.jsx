import React from "react";
import Icon from "../Icon/Icon";
export default function ActionMenu({
  onView,
  onEdit,
  onToggle,
  onReject,
  onDelete,
  label = "Action",
}) {
  return (
    <div className="action-row">
      {onView && (
        <button className="icon-btn" title="View" onClick={onView}>
          <Icon name="eye" size={16} />
        </button>
      )}
      {onEdit && (
        <button className="icon-btn" title="Edit" onClick={onEdit}>
          ✎
        </button>
      )}
      {onToggle && (
        <button
          className="icon-btn"
          title={label || "Approve / Toggle"}
          onClick={onToggle}
        >
          ↔
        </button>
      )}
      {onReject && (
        <button
          className="icon-btn reject-btn"
          title="Reject"
          onClick={onReject}
        >
          ×
        </button>
      )}
      {onDelete && (
        <button
          className="icon-btn danger-btn"
          title="Delete"
          onClick={onDelete}
        >
          ⌫
        </button>
      )}
    </div>
  );
}
