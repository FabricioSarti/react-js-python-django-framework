import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, MesasListadoAdminOrd } from "../../Components/Admin";
import { useMesas } from "../../hooks";

export function OrderAdmin() {
  const { loading, mesas, getMesas } = useMesas();

  useEffect(() => {
    getMesas();
  }, []);
  return (
    <>
      <HeaderPage title="Restaurante" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <MesasListadoAdminOrd mesas={mesas} />
      )}
    </>
  );
}
