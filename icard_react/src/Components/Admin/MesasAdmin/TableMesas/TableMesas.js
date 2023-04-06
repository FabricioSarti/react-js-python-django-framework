import React from "react";
import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";

export function TableMesas(props) {
  const { mesas, actualizarMesa, eliminarMesa } = props;
  return (
    <Table className="table-mesas-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Mesa no.</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(mesas, (mesa, index) => (
          <Table.Row key={index}>
            <Table.Cell>{mesa.number}</Table.Cell>
            <Actions
              mesa={mesa}
              actualizarMesa={actualizarMesa}
              eliminarMesa={eliminarMesa}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { mesa, actualizarMesa, eliminarMesa } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => actualizarMesa(mesa)}>
        <Icon name="pencil" />
      </Button>

      <Button icon negative onClick={() => eliminarMesa(mesa)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
