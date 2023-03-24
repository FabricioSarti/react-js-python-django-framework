import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableCategory } from "../../Components/Admin";
import { useCategory } from "../../hooks";
import { AddEditCategoryForm } from "../../Components/Admin";
import { ModalBasic } from "../../Components/Common";

export function CategoriesAdmin() {
  const { loading, categories, getCategories, eliminarCategorias } =
    useCategory();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [contentModal, setContentModal] = useState(false);

  const [refetch, setRefetch] = useState(false);

  console.log(categories);
  useEffect(() => {
    getCategories();
  }, [refetch]);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefecth = () => setRefetch((prev) => !prev);

  const addCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefecth={onRefecth} />
    );
    openCloseModal();
  };

  const updateCategory = (data) => {
    setTitleModal("Actualizar Categoria");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefecth={onRefecth}
        category={data} /*COMUNICACION ENTRE COMPONENTES*/
      />
    );
    openCloseModal();
  };

  const onDeleteCategoria = async (data) => {
    const result = window.confirm(
      `¿Desea eliminar la categoria ${data.title}?`
    );
    if (result) {
      try {
        await eliminarCategorias(data.id);
        onRefecth(); //CORRE OTRA VEZ LA FUNCION DE OBTENER LOS USUARIOS
      } catch (error) {
        console.log("ERROR AL ELMINIAR USUARIO ", error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Categorias"
        btnTitle="Nueva Categoria"
        btnClick={addCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategory
          categories={categories}
          updateCategory={updateCategory}
          onDeleteCategoria={onDeleteCategoria}
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
