import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  number: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitPrice: { type: Number, required: true },
      subtotal: { type: Number, required: true }
    }
  ],

  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
