import { useState } from "react";
import { getProductsApi } from "../api/products";
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

  return {
    loading,
    error,
    products,
    getProducts,
  };
}
