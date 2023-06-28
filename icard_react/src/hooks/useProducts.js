import { useState } from "react";
import {
  getProductsApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  getProductByIdApi,
} from "../api/products";
import { useAuth } from "./useAuth";

export function useProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);

  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProducts = async (data) => {
    try {
      setLoading(true);
      await addProductApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateProduct = async (id, data) => {
    try {
      setLoading(true);
      await updateProductApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteProducto = async (id) => {
    try {
      setLoading(true);
      await deleteProductApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProductById = async (id) => {
    try {
      const product = await getProductByIdApi(id);
      return product;
    } catch (error) {
      throw error;
    }
  };
  return {
    loading,
    error,
    products,
    getProducts,
    addProducts,
    updateProduct,
    deleteProducto,
    getProductById,
  };
}
