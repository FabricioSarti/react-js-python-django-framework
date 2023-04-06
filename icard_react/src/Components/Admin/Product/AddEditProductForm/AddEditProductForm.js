import React, { useCallback, useEffect, useState } from "react";
import "./AddEditProductForm.scss";
import { Form, Image, Button, Dropdown, Checkbox } from "semantic-ui-react";
import { useCategory, useProducts } from "../../../../hooks";
import { map } from "lodash";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";

export function AddEditProductForm(props) {
  const { onClose, onRefecth, producto } = props;
  const { categories, getCategories } = useCategory();
  const [previewImage, setPreviewImage] = useState(producto?.image || null);

  const { addProducts, updateProduct } = useProducts();

  const [categoriesFormat, setCategoriesFormat] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCategoriesFormat(formatDropDownData(categories));
  }, [categories]);

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

  const formik = useFormik({
    initialValues: initialValues(producto),
    validationSchema: Yup.object(producto ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("formulario enviado ");
      console.log(formValue);
      if (producto) await updateProduct(producto.id, formValue);
      else await addProducts(formValue);
      onRefecth();
      onClose();
    },
  });

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        type="number"
        name="price"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="categoria"
        fluid
        selection
        search
        options={categoriesFormat}
        value={formik.values.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
        error={formik.errors.category}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
        />
        Producto Activo
      </div>

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
        content={producto ? "Actualizar" : "Crear"}
      ></Button>
    </Form>
  );
}

function formatDropDownData(info) {
  return map(info, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues(data) {
  return {
    title: data?.title || "",
    price: data?.price || "",
    category: data?.category || "",
    active: data?.active ? true : false,
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
    image: Yup.string(),
  };
}
