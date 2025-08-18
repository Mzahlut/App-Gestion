import Invoice from "../models/invoice.model.js";

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las facturas" });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "products.productId"
    );
    if (!invoice)
      return res.status(404).json({ message: "Factura no encontrada" });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la factura" });
  }
};

export const createInvoice = async (req, res) => {
  try {
    const { number, email, phone, address, products } = req.body;

    console.log(number, email, phone, address, products);

    const calculatedProducts = products.map((p) => ({
      ...p,
      subtotal: p.quantity * p.unitPrice,
    }));

    const totalAmount = calculatedProducts.reduce(
      (sum, item) => sum + item.subtotal,
      0
    );

    const newInvoice = new Invoice({
      number,
      email,
      phone,
      address,
      products: calculatedProducts,
      totalAmount,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);

    res.status(201).json(populatedInvoice);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la factura", error });
  }
};

export const UpdateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    console.log(updatedInvoice)
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }
    res.json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar producto", error });
  }
};

export const deleteInvoice = async (req, res) => {
try {
  const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id)
  if (!deletedInvoice) {
    return res.status(404).json({message: 'Factura no encontrada'})
  }
    res.json("Factura eliminada con exito")

} catch (error) {
  res.status(500).json({ message: 'Error al eliminar la factura', error });
  
}


};
