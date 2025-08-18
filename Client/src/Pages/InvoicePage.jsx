import NavBar from "../Components/NavBar.jsx";
import InvoiceGrid from "../Components/InvoiceGrid.jsx";
import { FilterControl } from "../Utils/FilterControl.jsx";
import { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Divider } from "@mui/material";

export const InvoicePage = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [filteredItems, setFilteredItems] = useState("");
  const fields = [
    { id: 1, name: "number", label: "Number", type: "text" },
    { id: 2, name: "email", label: "Email", type: "email" },
    { id: 3, name: "phone", label: "Phone", type: "text" },
    { id: 4, name: "address", label: "Address", type: "text" },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    color: "text.primary",
  };

  const formatInvoice = (invoice) => {
  const productsArray = Array.isArray(invoice.products)
    ? invoice.products
    : Array.isArray(invoice.rawProducts)
    ? invoice.rawProducts
    : [];
    

  return {
    id: invoice._id || invoice.id,
    number: invoice.number,
    email: invoice.email,
    phone: invoice.phone,
    address: invoice.address,
    products: productsArray.length > 0
      ? productsArray.map((p) => {
          const name = p.name || (p.productId?.name ?? "Sin nombre");
          return `${name} (${p.quantity} x $${p.unitPrice})`;
        }).join(", ")
      : "Sin productos",
    rawProducts: productsArray,
    total: invoice.total || (invoice.totalAmount ? `$${invoice.totalAmount}` : "N/A"),
  };
};
  const handleSubmitDialog = async (data) => {
    try {
      const formData = {
        number: data.number,
        email: data.email,
        phone: data.phone,
        address: data.address,
        products: Array.isArray(data.products) ? data.products : [],
      };

      const response = await axios.post(
        "http://localhost:4000/api/invoices",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formattedInvoice = formatInvoice(response.data);
      setInvoices((prev) => [...prev, formattedInvoice]);

      console.log("Nueva factura formateada:", formattedInvoice);

      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error("Error al enviar datos de las facturas :", error);
    }
  };

 const handleOpenModal = (products) => {
  setSelectedProducts(Array.isArray(products) ? products : []);
  setOpenModal(true);
};

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProducts([]);
  };

  const handleFilter = (filters) => {
    let result = [...invoices];

    fields.forEach((field) => {
      const value = filters[field.name];
      if (field.type === "text" && value?.trim()) {
        const search = value.toLowerCase();
        result = result.filter((client) =>
          client[field.number]?.toLowerCase().includes(search)
        );
      }
    });

    const formatted = result.map((invoice) => {
      const productsArray = Array.isArray(invoice.rawProducts)
        ? invoice.rawProducts
        : Array.isArray(invoice.products)
        ? invoice.products
        : [];

      return {
        id: invoice.id || invoice._id,
        number: invoice.number,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        products:
          productsArray.length > 0
            ? productsArray
                .map((p) => {
                  const name = p.name || (p.productId?.name ?? "Sin nombre");
                  return `${name} (${p.quantity} x $${p.unitPrice})`;
                })
                .join(", ")
            : "Sin productos",
        rawProducts: productsArray,
        total:
          invoice.total ||
          (invoice.totalAmount ? `$${invoice.totalAmount}` : "N/A"),
      };
    });
    setFilteredItems(formatted);

  };


  console.log(selectedProducts, "Productos seleccionados");

  return (
    <>
      <NavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        headerName="Invoices"
        type="invoices"
        handleSubmitDialog={(data, type) => handleSubmitDialog(data, type)}
        formData={formData}
        setFormData={setFormData}
      />
      <FilterControl label="Invoices" fields={fields} onFilter={handleFilter} />

      <InvoiceGrid
        items={filteredItems}
        invoices={invoices}
        setInvoices={setInvoices}
        formData={formData}
        setFormData={setFormData}
        handleOpenModal={handleOpenModal}
      />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            Productos
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {Array.isArray(selectedProducts) && selectedProducts.length === 0 ? (
            <Typography>No hay productos.</Typography>
          ) : (
            selectedProducts.map((p, i) => {
              const name = p.name || (p.productId?.name ?? "Sin nombre");
              return (
                <Typography key={i} sx={{ mb: 1 }}>
                  • {name} — {p.quantity} x ${p.unitPrice}
                 
                </Typography>
              );
            })
            
          )}
          <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
            Total: ${selectedProducts.reduce((acc, p) => acc + p.quantity * p.unitPrice, 0)}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
