import React, { useState } from "react";
import {
  getOrdersbyTableApi,
  checkDeliveredOrderApi,
  addOrderToTableApi,
  addPaymentToOrderApi,
  closeOrderApi,
  getOrdersByPaymentApi,
} from "../api/orders";

import { useAuth } from "./useAuth";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);

  const { auth } = useAuth();

  const getOrdersByTable = async (idTable, status, ordering) => {
    try {
      setLoading(true);
      const response = await getOrdersbyTableApi(idTable, status, ordering);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const checkDeliveredOrder = async (idOrder) => {
    try {
      setLoading(true);
      await checkDeliveredOrderApi(idOrder, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addOrderToTable = async (idTable, idProduct) => {
    try {
      setLoading(true);
      await addOrderToTableApi(idTable, idProduct, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      setLoading(true);
      await addPaymentToOrderApi(idOrder, idPayment, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const closeOrder = async (idOrder) => {
    try {
      setLoading(true);
      await closeOrderApi(idOrder, auth.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOrdersByPayment = async (idPayment) => {
    try {
      return await getOrdersByPaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  }

  return {
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable,
    addPaymentToOrder,
    closeOrder,
    getOrdersByPayment,
  };
}
