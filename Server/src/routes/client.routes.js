import express from 'express';
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getClient
} from '../controllers/client.controller.js';

const router = express.Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;