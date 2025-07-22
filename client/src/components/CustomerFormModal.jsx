import React, { useState, useEffect } from 'react';

const CustomerFormModal = ({ isOpen, onClose, onSubmit, customer }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (customer) setForm(customer);
    else setForm({ name: '', email: '', phone: '', address: '' });
  }, [customer]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{customer ? 'Edit' : 'Add'} Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input className="w-full border px-3 py-2 rounded" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
          <input className="w-full border px-3 py-2 rounded" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          <input className="w-full border px-3 py-2 rounded" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {customer ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerFormModal;
