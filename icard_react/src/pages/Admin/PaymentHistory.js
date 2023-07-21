import React, { useEffect } from "react";
import { HeaderPage, TablePayments } from "../../Components/Admin";
import { usePayment } from "../../hooks";
import { Loader } from "semantic-ui-react";

export function PaymentHistory() {
  const { loading, payments, getPayments } = usePayment();

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <HeaderPage title="Historial de pagos" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablePayments payments={payments} />
      )}
    </>
  );
}
