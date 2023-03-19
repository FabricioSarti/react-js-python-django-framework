import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { map } from "lodash";
import routes from "./routes";

export function Navigation() {
  //console.log(routes);
  return (
    <BrowserRouter>
      <Routes>
        {map(routes, (infoRutas, index) => (
          <Route
            key={index}
            path={infoRutas.path}
            element={
              <infoRutas.layout>
                <infoRutas.component></infoRutas.component>
              </infoRutas.layout>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
