import React, { useEffect, useState } from "react";
import {
  HeaderPage,
  TableMesas,
  AddEditTableMesas,
} from "../../Components/Admin";
import { useMesas } from "../../hooks";
import { ModalBasic } from "../../Components/Common";
import { Loader } from "semantic-ui-react";

export function TableAdmin() {
  const { loading, mesas, getMesas, deleteMesas } = useMesas();

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);

  const [refetch, setRefetch] = useState(false);

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefecth = () => setRefetch((prev) => !prev);

  useEffect(() => {
    getMesas();
  }, [refetch]);

  const addMesas = () => {
    setTitleModal("Nueva Mesa");
    setContentModal(
      <AddEditTableMesas onClose={openCloseModal} onRefecth={onRefecth} />
    );
    openCloseModal(); //aca abre el modal
  };

  const updateMesa = (data) => {
    setTitleModal("Actualizar Mesa");
    setContentModal(
      <AddEditTableMesas
        onClose={openCloseModal}
        onRefecth={onRefecth}
        mesa={data}
      />
    );
    openCloseModal();
  };

  const deleteMesasFunction = async (data) => {
    const result = window.confirm(`¿Desea eliminar la mesa #${data.number}?`);
    if (result) {
      try {
        await deleteMesas(data.id);
        onRefecth(); //CORRE OTRA VEZ LA FUNCION DE OBTENER LAS MESAS
      } catch (error) {
        console.log("ERROR AL ELMINIAR PRODUCTO ", error);
      }
    }
  };

  return (
    <>
      <HeaderPage title="Mesas" btnTitle="Crear mesas" btnClick={addMesas} />
      {loading ? (
        <Loader active inline="centered">
          Cargando
        </Loader>
      ) : (
        <TableMesas
          mesas={mesas}
          actualizarMesa={updateMesa}
          eliminarMesa={deleteMesasFunction}
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
