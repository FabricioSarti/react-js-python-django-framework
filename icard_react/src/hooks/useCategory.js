import { useState } from "react";
import {
  getCategoriesApi,
  crearCategoriasAPI,
  updateCategoriasApi,
} from "../api/category";
import { useAuth } from "./useAuth";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState(null);

  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setLoading(false);
      setCategories(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const crearCategorias = async (data) => {
    try {
      setLoading(true);
      await crearCategoriasAPI(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const actualizarCategorias = async (id, data) => {
    try {
      setLoading(true);
      await updateCategoriasApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    categories,
    getCategories,
    crearCategorias,
    actualizarCategorias,
  };
}
