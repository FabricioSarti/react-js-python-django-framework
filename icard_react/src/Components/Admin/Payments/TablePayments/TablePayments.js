import React from "react";
import "./TablePayments.scss";
import { Table, Button, Icon, Tab } from "semantic-ui-react";
import { map } from "lodash";
import moment from "moment";

export function TablePayments(props) {
  const { payments } = props;

  const getIconPaymentName = (key) => {
    if (key === "CARD") return "credit card outline";
    if (key === "CASH") return "money bill alternate outline";
    return null;
  };

  return (
    <Table className="table-payments-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID PAGO</Table.HeaderCell>
          <Table.HeaderCell>Mesa</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Tipo de pago</Table.HeaderCell>
          <Table.HeaderCell>Fecha</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(payments, (payment, index) => (
          <Table.Row key={index}>
            <Table.Cell>{payment.id}</Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
            <Table.Cell>Q. {payment.totalPayment}</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPaymentName(payment.paymentType)} />
            </Table.Cell>
            <Table.Cell>
              {moment(payment.created_at).format("DD/MM/YYYY - HH:MM")}
            </Table.Cell>
            <Table.Cell textAlign="right">
              <Button icon onClick={() => console.log("Ver detalles")}>
                <Icon name="eye" />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
