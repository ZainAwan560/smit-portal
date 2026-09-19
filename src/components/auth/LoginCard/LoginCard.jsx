import React from "react";
import LoginField from "../LoginField/LoginField";
import PasswordField from "../PasswordField/PasswordField";
import RoleSwitcher from "../RoleSwitcher/RoleSwitcher";
import "./LoginCard.css";

export default function LoginCard({
  selectedRole,
  onSelectRole,
  identity,
  password,
  showPassword,
  setIdentity,
  setPassword,
  setShowPassword,
  onSubmit,
}) {
  const isStudent = selectedRole === "student";
  return (
    <section className="login-card-component">
      <h2>Login</h2>
      <p className="login-help-text">
        Enter your {isStudent ? "CNIC and password" : "email and password"},
        then choose the portal you want to open.
      </p>

      <form onSubmit={onSubmit}>
        <LoginField
          label={isStudent ? "CNIC / Email" : "Email"}
          value={identity}
          onChange={(event) => setIdentity(event.target.value)}
          placeholder={
            isStudent ? "CNIC number or email" : "Enter email address"
          }
          autoComplete="username"
        />
        <PasswordField
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          show={showPassword}
          onToggle={() => setShowPassword((value) => !value)}
        />
        <RoleSwitcher selectedRole={selectedRole} onSelect={onSelectRole} />
        <button className="login-submit" type="submit">
          LOGIN
        </button>
      </form>
    </section>
  );
}
