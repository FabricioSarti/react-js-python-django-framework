import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks/userUser";

export const AuthContext = createContext({
  auth: undefined,
  login: () => null,
  logout: () => null,
});

/*POR DECIRLO ASÍ ES UNA FUNCION GLOBAL PARA TODO ES COMO UN INTERCEPTOR EN ANGULAR*/
export function AuthProvider(props) {

  //siempre por default para que renderice lo de la pagina hija este children
  const { children } = props;

  const [auth, setAuth] = useState(undefined);

  const { getME } = useUser(); //instanca de la función getMe de useUser

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        const me = await getME(token);
        setAuth({ token, me });
      } else {
        setAuth(null);
      }
    })
      ();
  }, []);

  const login = async (token) => {
    setToken(token);
    console.log(token);
    const me = await getME(token);
    //console.log("info con token inyectado ", me);
    setAuth({ token, me }); //de la constante de useState
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
    }
  }

  const valueContext = {
    auth, /*Auth que viene pero del useState para que se use en toda la aplicación */
    login /* llama a la funcion arriba*/,
    logout,
  };

  if (auth === undefined) return null; //para flash

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
