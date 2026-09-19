import React from "react";
import "./LoginField.css";

export default function LoginField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}) {
  return (
    <label className="login-field">
      <span>{label} *</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
      />
    </label>
  );
}
