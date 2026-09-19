import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../common/Logo/Logo";
import Icon from "../../common/Icon/Icon";
export default function Sidebar({ role, open, setOpen, items }) {
  const nav = useNavigate();
  const names = {
    student: "Zain Awan",
    teacher: "SMIT Trainer",
    admin: "SMIT Admin",
  };
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <Logo className="small" />
          <button className="collapse-btn" onClick={() => setOpen(false)}>
            ‹
          </button>
        </div>
        <nav>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item logout" onClick={() => nav("/")}>
            <Icon name="logout" />
            <span>Logout</span>
          </button>
          <div className="profile">
            <div className="avatar">
              {role === "student" ? "ZA" : role === "teacher" ? "ST" : "SA"}
            </div>
            <div>
              <strong>{names[role]}</strong>
              <small>{role[0].toUpperCase() + role.slice(1)} Portal</small>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
