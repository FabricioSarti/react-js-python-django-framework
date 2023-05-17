import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useOrder } from "../../hooks";
import { useParams } from "react-router-dom";
import { HeaderPage } from "../../Components/Admin";
import { ListOrder } from "../../Components/Admin/TableDetails";

export function TableAdminDetalle() {
  const { loading, orders, getOrdersByTable } = useOrder();

  const { id } = useParams();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, []);

  console.log(orders);

  return (
    <>
      <HeaderPage title={`Mesa****`} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrder orders={orders} />
      )}
    </>
  );
}
