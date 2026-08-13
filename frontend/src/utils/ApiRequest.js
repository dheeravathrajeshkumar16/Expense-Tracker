const host = process.env.REACT_APP_API_HOST || "http://localhost:4000";

export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;
export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;
export const setBudgetAPI = `${host}/api/v1/setBudget`;
export const getBudgetsAPI = `${host}/api/v1/getBudgets`;
export const deleteBudgetAPI = `${host}/api/v1/deleteBudget`;