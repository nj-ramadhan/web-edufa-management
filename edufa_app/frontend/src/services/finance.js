import api from './api';

export const getBillings = async (branchId = '') => {
    const response = await api.get(`/billings/?branch=${branchId}`);
    return response.data;
};

export const getPayrolls = async (branchId = '') => {
    const response = await api.get(`/payroll/?branch=${branchId}`);
    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get('/transactions/');
    return response.data;
};