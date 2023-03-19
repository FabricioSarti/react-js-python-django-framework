import React from "react";
import { LoginAdmin } from "../../pages/Admin";
import "./AdminLayout.scss";
import { useAuth } from "../../hooks";
import { TopMenu, SideMenu } from "../../Components/Admin";

export function AdminLayout(props) {
  const { children } = props;
  //console.log(useAuth());
  const { auth } = useAuth(); //extrae la info del json useAuth

  if (!auth) return <LoginAdmin />;

  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>

      <div className="admin-layout__main-content">
        <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
}
