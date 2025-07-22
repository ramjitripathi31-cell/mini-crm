const BASE_URL = 'http://localhost:5000/api/customers';

export const getCustomers = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addCustomer = async (data) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateCustomer = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCustomer = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};
