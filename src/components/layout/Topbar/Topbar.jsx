import React from "react";
import Icon from "../../common/Icon/Icon";
export default function Topbar({ title, onMenu }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onMenu}>
        <Icon name="menu" />
      </button>
      <div className="crumb">
        Home <span>›</span> {title}
      </div>
      <button className="feedback">▤ &nbsp; Feedback</button>
    </header>
  );
}
