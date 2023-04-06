import React, { useCallback, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useMesas } from "../../../../hooks";

export function AddEditTableMesas(props) {
  const { onClose, onRefecth, mesa } = props;

  const { addMesas, actualizarMesas } = useMesas();

  const formik = useFormik({
    initialValues: initialValues(mesa),
    validationSchema: Yup.object(mesa ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (mesa) await actualizarMesas(mesa.id, formValue);
        else await addMesas(formValue);
        onClose();
        onRefecth();
      } catch (error) {
        console.log("error en crear actualizar mesa ", error);
      }
    },
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        placeholder="Número de la mesa"
        value={formik.values.number}
        error={formik.errors.number}
        onChange={formik.handleChange}
      />

      <Button
        type="submit"
        primary
        fluid
        content={mesa ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    number: data?.number || "",
  };
}

function newSchema() {
  return {
    number: Yup.number().required(true),
  };
}

function updateSchema() {
  return {
    number: Yup.number().required(true),
  };
}
