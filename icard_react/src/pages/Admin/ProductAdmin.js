import React, { useEffect, useState } from "react";
import {
  AddEditProductForm,
  HeaderPage,
  TableProduct,
} from "../../Components/Admin";
import { useProducts } from "../../hooks";
import { ModalBasic } from "../../Components/Common";
import { Loader } from "semantic-ui-react";

export function ProductAdmin() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const [refetch, setRefetch] = useState(false);

  const { loading, getProducts, products, deleteProducto } = useProducts();

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefecth = () => setRefetch((prev) => !prev);

  const addProducto = () => {
    setTitleModal("Nuevo producto");
    setContentModal(
      <AddEditProductForm onClose={openCloseModal} onRefecth={onRefecth} />
    );
    openCloseModal();
  };

  const onDeleteProducto = async (data) => {
    const result = window.confirm(`¿Desea eliminar el producto ${data.title}?`);
    if (result) {
      try {
        await deleteProducto(data.id);
        onRefecth(); //CORRE OTRA VEZ LA FUNCION DE OBTENER LOS USUARIOS
      } catch (error) {
        console.log("ERROR AL ELMINIAR PRODUCTO ", error);
      }
    }
  };

  const updateProduct = (data) => {
    setTitleModal("Actualizar Producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefecth={onRefecth}
        producto={data} /*COMUNICACION ENTRE COMPONENTES*/
      />
    );
    openCloseModal();
  };

  useEffect(() => {
    getProducts();
  }, [refetch]);

  console.log("productos ", products);

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Nuevo Producto"
        btnClick={addProducto}
      />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProduct
          products={products}
          updateProducto={updateProduct}
          onDeleteProducto={onDeleteProducto}
        />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
}
