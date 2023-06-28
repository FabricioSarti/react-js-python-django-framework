import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useOrder, useMesas } from "../../hooks";
import { useParams } from "react-router-dom";
import { HeaderPage, AddOrderForm } from "../../Components/Admin";
import { ListOrder } from "../../Components/Admin/TableDetails";
import { ModalBasic } from "../../Components/Common";

export function TableAdminDetalle() {
  const [reloadOrder, setReloadOrder] = useState(false);
  const { loading, orders, getOrdersByTable } = useOrder();

  const { mesa, getMesa } = useMesas();

  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrder]);

  useEffect(() => {
    getMesa(id);
  }, [id]);

  console.log(orders);

  const onReloadOrders = () => setReloadOrder((prev) => !prev);
  const abrirCerrarModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <HeaderPage
        title={`Mesa ${mesa?.number || " "}`}
        btnTitle="Añadir pedido"
        btnClick={abrirCerrarModal}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrder orders={orders} onReloadOrders={onReloadOrders} />
      )}

      <ModalBasic
        show={showModal}
        onClose={abrirCerrarModal}
        title="Generar pedido"
      >
        <AddOrderForm
          idMesa={id}
          abrirCerrarModal={abrirCerrarModal}
          onReloadOrders={onReloadOrders}
        />
      </ModalBasic>
    </>
  );
}
