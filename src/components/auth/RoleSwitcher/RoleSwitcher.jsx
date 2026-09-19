import React from "react";
import RoleIcon from "../RoleIcon/RoleIcon";
import "./RoleSwitcher.css";

const labels = { student: "Student", teacher: "Teacher", admin: "Admin" };

export default function RoleSwitcher({ selectedRole, onSelect }) {
  const availableRoles = Object.keys(labels).filter(
    (role) => role !== selectedRole,
  );

  return (
    <div className="role-switcher">
      <div className="role-switcher-label">Login as</div>

      <div className={`selected-role selected-${selectedRole}`}>
        <span className="selected-role-content">
          <span className={`role-icon ${selectedRole}`}>
            <RoleIcon role={selectedRole} size={21} />
          </span>
          <strong>{labels[selectedRole]}</strong>
        </span>
      </div>

      <div className="alternate-role-wrap">
        <div className="role-divider">
          <span>Or login as</span>
        </div>
        <div className="alternate-role-list">
          {availableRoles.map((role, index) => (
            <React.Fragment key={role}>
              <button
                type="button"
                className={`alternate-role alternate-${role}`}
                onClick={() => onSelect(role)}
              >
                <span className={`role-icon ${role}`}>
                  <RoleIcon role={role} size={19} />
                </span>
                <span>{labels[role]}</span>
              </button>
              {index < availableRoles.length - 1 && (
                <span className="alternate-separator" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
