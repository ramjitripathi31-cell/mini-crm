import { Router } from 'express';
import Customer from '../models/Customer.js'

const router = Router();

// Get all
router.get('/', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// Add new
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.status(201).json(customer);
});

// Update
router.put('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(customer);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
