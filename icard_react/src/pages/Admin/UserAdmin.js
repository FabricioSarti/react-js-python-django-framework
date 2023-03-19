import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks";
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
} from "../../Components/Admin";
import { ModalBasic } from "../../Components/Common";
import { Loader } from "semantic-ui-react";

export function UserAdmin() {
  /*USO DE ESTADOS PARA MAPEAR LA INFORMACION */
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const { loading, users, getUsers, deleteUser } = useUser();

  const [refetch, setRefecth] = useState(false);

  console.log("loading -> ", loading);
  console.log("users -> ", users);
  /*ACA USAMOS ESTO PARA TRAER LOS USUARIOS*/
  useEffect(() => {
    getUsers();
  }, [refetch]); //solo evalua que cuando hay un cambio de estado ejecute getusers otra vez

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefetch = () => setRefecth((prev) => !prev); //ESTA FUNCION ES PARA ACTUALIZAR LA TABLA DE USUARIOS

  const createUser = () => {
    setTitleModal("Nuevo Usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} refetch={onRefetch} />
    ); //componente modal
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal("Actualizar Usuario");
    setContentModal(
      <AddEditUserForm
        onClose={openCloseModal}
        refetch={onRefetch}
        user={data}
      />
    ); //componente modal
    openCloseModal();
  };

  const onDeleteUser = async (data) => {
    const result = window.confirm(`¿Desea eliminar el usuario ${data.email}?`);
    if (result) {
      try {
        await deleteUser(data.id);
        onRefetch(); //CORRE OTRA VEZ LA FUNCION DE OBTENER LOS USUARIOS
      } catch (error) {
        console.log("ERROR AL ELMINIAR USUARIO ", error);
      }
    }
  };

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={createUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
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
