import express from 'express';
import {
  getInvoices,
  createInvoice,
  UpdateInvoice,
  deleteInvoice,
  getInvoice
} from '../controllers/invoice.controller.js';

const router = express.Router();

router.get('/', getInvoices);
router.get('/:id', getInvoice);
router.post('/',   createInvoice);
router.put('/:id', UpdateInvoice);
router.delete('/:id', deleteInvoice);

export default router;