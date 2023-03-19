import React from "react";
import { LoginForm } from "../../../Components/Admin";
import "./LoginAdmin.scss";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin_content">
        <h1>Entrar al panel</h1>
        <LoginForm />
      </div>
    </div>
  );
}
