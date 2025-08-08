import NavBar from "../Components/NavBar.jsx";
import InvoiceGrid from "../Components/InvoiceGrid.jsx";
import { FilterControl } from "../Utils/FilterControl.jsx";
import { useState } from "react";
import axios from "axios";

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

  const handleSubmitDialog = async (data) => {
    try {
      const formData = {
        number: data.number,
        email: data.email,
        phone: data.phone,
        address: data.address,
        products: data.products,
      };

      const response = await axios.post(
        "http://localhost:4000/api/invoices",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInvoices((prev) => [...prev, response.data]);
      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error("Error al enviar datos de las facturas :", error);
    }
  };

  const handleFilter = (filters) => {
    let result = [...invoices];

    fields.forEach((field) => {
      const value = filters[field.number];
      if (field.type === "text" && value?.trim()) {
        const search = value.toLowerCase();
        result = result.filter((client) =>
          client[field.number]?.toLowerCase().includes(search)
        );
      }
    });

    setFilteredItems(result);

    console.log(formData, "form data from InvoicePage");
  };

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
      />
    </>
  );
};
