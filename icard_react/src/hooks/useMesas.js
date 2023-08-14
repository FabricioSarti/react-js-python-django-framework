import { useState } from "react";
import { size } from "lodash"
import {
  getMesasApi,
  addTableApi,
  updateTableApi,
  deleteTableApi,
  getTableApi,
  getTableByNumerApi,
} from "../api/mesas";

import { useAuth } from "./useAuth";

export function useMesas() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mesas, setMesas] = useState(null);

  const [mesa, setMesa] = useState(null);

  const { auth } = useAuth();

  const getMesas = async () => {
    try {
      setLoading(true);
      const response = await getMesasApi();
      setLoading(false);
      setMesas(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addMesas = async (data) => {
    try {
      setLoading(true);
      await addTableApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const actualizarMesas = async (id, data) => {
    try {
      setLoading(true);
      await updateTableApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteMesas = async (id) => {
    try {
      setLoading(true);
      await deleteTableApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getMesa = async (id) => {
    try {
      setLoading(true);
      const response = await getTableApi(id);
      setMesa(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const isExistTable = async (tableNumber) => {
    try {
      const response = await getTableByNumerApi(tableNumber);
      if (size(response) > 0) {
        return true;
      }

      throw error
    } catch (error) {
      setError(error);
    }
  }

  return {
    loading,
    error,
    mesas,
    getMesas,
    addMesas,
    actualizarMesas,
    deleteMesas,
    getMesa,
    mesa,
    isExistTable,
  };
}
