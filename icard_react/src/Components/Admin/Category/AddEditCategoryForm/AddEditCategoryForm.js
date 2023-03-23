import React, { useCallback, useState } from "react";
import { Form, Image, Button } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import "./AddEditCategoryForm.scss";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useCategory } from "../../../../hooks";

export function AddEditCategoryForm(props) {
  const { onClose, onRefecth, category } = props;

  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const { crearCategorias, actualizarCategorias } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formulario enviado ", formValue);
      try {
        if (category) await actualizarCategorias(category.id, formValue);
        else await crearCategorias(formValue);
        onClose();
        onRefecth();
      } catch (error) {
        console.error("ALGO MALISIMO PASO ", error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    setPreviewImage(URL.createObjectURL(file));
    await formik.setFieldValue("image", file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre de la categoria"
        value={formik.values.title}
        error={formik.errors.title}
        onChange={formik.handleChange}
      />
      <Button
        type="button"
        fluid
        {...getRootProps()}
        color={formik.errors.image && "red"}
      >
        {previewImage ? "Cambiar imagen" : "Subir imagen"}
      </Button>

      <input {...getInputProps()} />

      <Image src={previewImage} fluid />

      <Button
        type="submit"
        primary
        fluid
        content={category ? "Actualizar" : "Crear"}
      />
    </Form>
  );
}

function initialValues(data) {
  return {
    title: data?.title || "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
