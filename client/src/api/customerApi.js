const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

export const getCustomers = async () => {
  const res = await fetch(API_BASE_URL);
  return res.json();
};

export const addCustomer = async (data) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCustomer = async (id, data) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCustomer = async (id) => {
  await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
};
