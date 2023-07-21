import { useState } from "react";
import {
  closePaymentApi,
  createPaymentApi,
  getPaymentByTableApi,
  getPaymentsApi,
} from "../api/payment";

export function usePayment() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState(null);

  const createPayment = async (paymentData) => {
    try {
      return await createPaymentApi(paymentData);
    } catch (error) {
      setError(error);
    }
  };

  const getPaymentByTable = async (idTable) => {
    try {
      return await getPaymentByTableApi(idTable);
    } catch (error) {
      setError(error);
    }
  };

  const closePayment = async (idPayment) => {
    try {
      setLoading(true);
      const respose = await closePaymentApi(idPayment);
      setLoading(false);
      setPayments(respose);
    } catch (error) {
      setError(error);
    }
  };

  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await getPaymentsApi();
      setLoading(false);
      setPayments(response);
    } catch (error) {
      setError(error);
    }
  };

  return {
    createPayment,
    loading,
    payments,
    error,
    getPaymentByTable,
    closePayment,
    getPayments,
  };
}
