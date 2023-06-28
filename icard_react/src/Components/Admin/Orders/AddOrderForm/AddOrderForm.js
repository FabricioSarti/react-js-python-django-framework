import React, { useState, useEffect } from "react";
import { Form, Image, Button, Dropdown } from "semantic-ui-react";
import "./AddOrderForm.scss";
import { useOrder, useProducts } from "../../../../hooks";
import { map } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";

export function AddOrderForm(props) {
  const { idMesa, abrirCerrarModal, onReloadOrders } = props;
  const [productsFormat, setProductsFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { products, getProducts, getProductById } = useProducts();
  const { addOrderToTable } = useOrder();

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => setProductsFormat(formDropdownData(products)), [products]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("Creando pedidos");
      console.log("mesa ", idMesa);
      for await (const idProduct of formValue.products) {
        await addOrderToTable(idMesa, idProduct);
      }

      onReloadOrders();
      abrirCerrarModal();
    },
  });

  useEffect(() => {
    addProductList();
  }, [formik.values]);

  const onRemoveProduct = (idProducto) => {
    const productosEliminar = [...formik.values.products];
    productosEliminar.splice(idProducto, 1);
    formik.setFieldValue("products", productosEliminar);
  };

  const addProductList = async () => {
    try {
      const productsId = formik.values.products;
      const arrayTemporal = [];
      for await (const idProduct of productsId) {
        const response = await getProductById(idProduct);
        arrayTemporal.push(response);
      }

      setProductsData(arrayTemporal);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Dropdown
        placeholder="Productos"
        fluid
        selection
        search
        options={productsFormat}
        value={null} //para que no permita seleccionar
        /*ESTE ON CHANGE ES PARA QUE SELECCIONE VARIOS ITEMS A LA VEZ, ENTONCES RECORRE EL ARRAY
        SEGÚN LOS CLICKS QUE YO DI*/
        onChange={(_, data) =>
          formik.setFieldValue("products", [
            ...formik.values.products,
            data.value,
          ])
        }
      />
      <div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <Button
              type="button"
              content="Eliminar"
              basic
              color="red"
              onClick={() => onRemoveProduct(index)}
            />
          </div>
        ))}
      </div>
      <Button
        type="submit"
        content="Añadir productos a la mesa"
        primary
        fluid
      />
    </Form>
  );
}

function formDropdownData(data) {
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues() {
  return {
    products: [],
  };
}

function validationSchema() {
  return {
    products: Yup.array().required(true),
  };
}
