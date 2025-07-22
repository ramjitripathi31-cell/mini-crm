import React, { useEffect, useState } from 'react';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../api/customerApi';
import CustomerFormModal from './CustomerFormModal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchData = async () => setCustomers(await getCustomers());

  const handleAdd = () => {
    setEditingCustomer(null);
    setModalOpen(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    fetchData();
  };

  const handleSubmit = async (data) => {
    if (editingCustomer) await updateCustomer(editingCustomer._id, data);
    else await addCustomer(data);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Add Customer</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust._id} className="border-t">
                <td className="p-2">{cust.name}</td>
                <td className="p-2">{cust.email}</td>
                <td className="p-2">{cust.phone}</td>
                <td className="p-2">{cust.address}</td>
                <td className="p-2 flex space-x-2 justify-center">
                  <button onClick={() => handleEdit(cust)} className="text-sm text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(cust._id)} className="text-sm text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        customer={editingCustomer}
      />
    </div>
  );
};

export default CustomerList;
