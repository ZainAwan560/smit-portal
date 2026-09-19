import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/common/Logo/Logo";
import LoginCard from "../../components/auth/LoginCard/LoginCard";
import "./RoleLogin.css";

export default function RoleLogin() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/${selectedRole}/dashboard`);
  };

  return (
    <main className="auth-page login-auth-page">
      <div className="auth-wrap main-login">
        <Logo className="auth-logo" />
        <p className="auth-subtitle">Saylani Mass IT Training</p>
        <LoginCard
          selectedRole={selectedRole}
          onSelectRole={setSelectedRole}
          identity={identity}
          password={password}
          showPassword={showPassword}
          setIdentity={setIdentity}
          setPassword={setPassword}
          setShowPassword={setShowPassword}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
