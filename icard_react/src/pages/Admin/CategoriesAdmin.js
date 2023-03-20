import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage } from "../../Components/Admin";
import { useCategory } from "../../hooks";

export function CategoriesAdmin() {
  const { loading, categories, getCategories } = useCategory();

  console.log(categories);
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <HeaderPage title="Categorias" btnTitle="Nueva Categoria" />
      {
        loading?(
            <Loader active inline="centered" >
                Cargando...
            </Loader>
        ):(
            <h2>LISTAS DE CATEGORIAS</h2>
        )
      }
    </>
  );
}
