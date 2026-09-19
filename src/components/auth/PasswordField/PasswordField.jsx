import React from "react";
import "./PasswordField.css";

export default function PasswordField({ value, onChange, show, onToggle }) {
  return (
    <label className="password-field">
      <span>Password *</span>
      <span className="password-control">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          onClick={onToggle}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </span>
    </label>
  );
}
