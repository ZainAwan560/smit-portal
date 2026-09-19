import React from "react";
export default function Status({ children }) {
  const key = String(children).toLowerCase().replaceAll(" ", "-");
  return <span className={`status status-${key}`}>{children}</span>;
}
