import { useState } from "react";
import { getMeApi, getUsersApi, addUserApi } from "../api/user";
import { useAuth } from ".";

export function useUser() {
  //para ver si carga o no carga y manejarlo desde aca
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);
  const { auth } = useAuth();

  //funcion getme que recibe un token para consumir una API
  const getME = async (token) => {
    try {
      const response = await getMeApi(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsersApi(auth.token);
      setLoading(false);
      setUsers(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addUsers = async (data) => {
    try {
      setLoading(true);
      await addUserApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    users,
    getME,
    getUsers,
    addUsers,
  };
}
