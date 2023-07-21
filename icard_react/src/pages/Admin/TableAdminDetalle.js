import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { useOrder, useMesas, usePayment } from "../../hooks";
import { useParams } from "react-router-dom";
import { HeaderPage, AddOrderForm } from "../../Components/Admin";
import { ListOrder, PaymentDetail } from "../../Components/Admin/TableDetails";
import { ModalBasic } from "../../Components/Common";
import { forEach, size } from "lodash";

export function TableAdminDetalle() {
  const [reloadOrder, setReloadOrder] = useState(false);

  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();

  const { mesa, getMesa } = useMesas();

  const { createPayment, getPaymentByTable } = usePayment();

  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(id);
      console.log("Respuesta mesa id ", response);

      if (size(response) > 0) setPaymentData(response[0]);
    })();
  }, [reloadOrder]);

  useEffect(() => {
    getOrdersByTable(id, "", "ordering=-status,created_at");
  }, [id, reloadOrder]);

  useEffect(() => {
    getMesa(id);
  }, [id]);

  console.log(orders);

  const onReloadOrders = () => setReloadOrder((prev) => !prev);
  const abrirCerrarModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm(
      "¿Estas seguro de generar la cuenta de la mesa?"
    );
    if (result) {
      let totalPayment = 0;

      forEach(orders, (order) => {
        totalPayment += Number(order.product_data.price);
      });

      const resultTipoPago = window.confirm(
        'Si es con tarjeta de credito o debido pulsa "OK". En caso contrario pulsa "CANCELAR"'
      );

      const paymentData = {
        table: id,
        totalPayment: totalPayment.toFixed(2),
        paymentType: resultTipoPago ? "CARD" : "CASH",
        statusPayment: "PENDING",
      };

      const payment = await createPayment(paymentData);

      console.log("BD ", payment);

      for await (const order of orders) {
        await addPaymentToOrder(order.id, payment.id);
      }

      onReloadOrders();
    }
  };

  return (
    <>
      <HeaderPage
        title={`Mesa ${mesa?.number || " "}`}
        btnTitle={paymentData ? "Ver cuenta" : "Añadir pedido"}
        btnClick={abrirCerrarModal}
        btnTitleTwo={!paymentData ? "Generar cuenta" : null}
        btnClickTwo={onCreatePayment}
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
        {paymentData ? (
          <PaymentDetail
            payment={paymentData}
            orders={orders}
            abrirCerrarModal={abrirCerrarModal}
            onReloadOrders={onReloadOrders}
          />
        ) : (
          <AddOrderForm
            idMesa={id}
            abrirCerrarModal={abrirCerrarModal}
            onReloadOrders={onReloadOrders}
          />
        )}
      </ModalBasic>
    </>
  );
}
