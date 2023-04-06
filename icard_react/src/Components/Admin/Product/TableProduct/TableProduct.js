import React from "react";
import { Table, Image, Button, Icon, Tab } from "semantic-ui-react";
import { map } from "lodash";
import "./TableProduct.scss";

export function TableProduct(props) {
  const { products, updateProducto, onDeleteProducto } = props;

  console.log("productos table ", products);

  return (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.price} Q.</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Actions
              product={product}
              updateProducto={updateProducto}
              onDeleteProducto={onDeleteProducto}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

function Actions(props) {
  const { product, updateProducto, onDeleteProducto } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => updateProducto(product)}>
        <Icon name="pencil" />
      </Button>
      <Button icon negative onClick={() => onDeleteProducto(product)}>
        <Icon name="close" />
      </Button>
    </Table.Cell>
  );
}
