import React from "react";

export default function RoleIcon({ role, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (role === "teacher") {
    return (
      <svg {...common}>
        <path d="M4 7.5 12 4l8 3.5-8 3.5-8-3.5Z" />
        <path d="M7 9.2V14c2.8 2.2 7.2 2.2 10 0V9.2" />
        <path d="M20 8v5" />
        <circle cx="20" cy="15.5" r="1" />
      </svg>
    );
  }

  if (role === "admin") {
    return (
      <svg {...common}>
        <path d="M12 3 19 6v5c0 4.7-2.9 8.2-7 10-4.1-1.8-7-5.3-7-10V6l7-3Z" />
        <path d="m9.2 12 1.8 1.8 3.8-4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M3.5 8.5 12 4l8.5 4.5L12 13 3.5 8.5Z" />
      <path d="M6.5 10.2V15c2.8 2.2 8.2 2.2 11 0v-4.8" />
      <path d="M20.5 9v6" />
    </svg>
  );
}
