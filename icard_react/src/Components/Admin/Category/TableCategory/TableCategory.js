import React from "react";
import { Table, Image, Button, Icon } from "semantic-ui-react";
import { map } from "lodash";
import "./TableCategory.scss";

export function TableCategory(props) {
  const { categories, updateCategory } = props;

  return (
    <Table className="table-category-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(categories, (categoria, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Image src={categoria.image} />
            </Table.Cell>
            <Table.Cell>{categoria.title}</Table.Cell>
            <Actions categoria={categoria} updateCategory={updateCategory} />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { categoria, updateCategory } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateCategory(categoria)}>
        <Icon name="pencil" />
      </Button>

      <Button
        icon
        negative
        onClick={() => console.log("Eliminar categoria ", categoria)}
      >
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
