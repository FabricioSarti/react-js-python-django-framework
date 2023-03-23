import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableCategory } from "../../Components/Admin";
import { useCategory } from "../../hooks";
import { AddEditCategoryForm } from "../../Components/Admin";
import { ModalBasic } from "../../Components/Common";

export function CategoriesAdmin() {
  const { loading, categories, getCategories } = useCategory();
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
        <TableCategory categories={categories} />
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
