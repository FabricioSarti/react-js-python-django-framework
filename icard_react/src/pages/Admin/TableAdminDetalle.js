import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useOrder, useMesas } from "../../hooks";
import { useParams } from "react-router-dom";
import { HeaderPage } from "../../Components/Admin";
import { ListOrder } from "../../Components/Admin/TableDetails";

export function TableAdminDetalle() {
  const [reloadOrder, setReloadOrder] = useState(false);
  const { loading, orders, getOrdersByTable } = useOrder();

  const { mesa, getMesa } = useMesas();

  const { id } = useParams();

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrder]);

  useEffect(() => {
    getMesa(id);
  }, [id]);

  console.log(orders);

  const onReloadOrders = () => setReloadOrder((prev) => !prev);

  return (
    <>
      <HeaderPage title={`Mesa ${mesa?.number || " "}`} />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrder orders={orders} onReloadOrders={onReloadOrders} />
      )}
    </>
  );
}
