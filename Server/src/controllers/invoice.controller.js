import Invoice from "../models/invoice.model.js";

// Obtener todas las facturas
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("products.productId");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las facturas" });
  }
};

// Obtener una factura por ID
export const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("products.productId");
    if (!invoice) return res.status(404).json({ message: "Factura no encontrada" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la factura" });
  }
};

// Crear una nueva factura
export const createInvoice = async (req, res) => {
  try {
    const { number, email, phone, address, products } = req.body;

    const calculatedProducts = products.map(p => ({
      ...p,
      subtotal: p.quantity * p.unitPrice
    }));

    const totalAmount = calculatedProducts.reduce((sum, item) => sum + item.subtotal, 0);

    const newInvoice = new Invoice({
      number,
      email,
      phone,
      address,
      products: calculatedProducts,
      totalAmount
    });

    const savedInvoice = await newInvoice.save();
    const populatedInvoice = await savedInvoice.populate("products.productId");

    res.status(201).json(populatedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la factura", error });
  }
};
