import React, { useEffect, useState } from "react";
import { HeaderPage, TableProduct } from "../../Components/Admin";
import { useProducts } from "../../hooks";
import { ModalBasic } from "../../Components/Common";
import { Loader } from "semantic-ui-react";

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const { loading, getProducts, products } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  console.log("productos ", products);

  return (
    <>
      <HeaderPage title="Productos" btnTitle="Nuevo Producto" />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProduct products={products} />
      )}
    </>
  );
}
