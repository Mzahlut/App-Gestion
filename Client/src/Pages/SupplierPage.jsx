import NavBar from "../Components/NavBar.jsx";
import SupplierGrid from "../Components/SupplierGrid.jsx";
import { FilterControl } from "../Utils/FilterControl.jsx";
import { useState } from "react";
import axios from "axios";

export const SupplierPage = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredItems, setFilteredItems] = useState("");

  const fields = [
    { id: 1, name: "name", label: "Name", type: "text" },
    { id: 2, name: "phone", label: "Phone", type: "text" },
    { id: 3, name: "email", label: "Email", type: "email" },
  ];

  const handleSubmitDialog = async (data) => {
    try {
      const formData = {
        name: data.name,
        phone: data.phone,
        email: data.email,
      };

      const response = await axios.post(
        "http://localhost:4000/api/suppliers",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuppliers((prevSuppliers) => [...prevSuppliers, response.data]);

      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error("Error al enviar datos del producto:", error);
    }
  };

  const handleFilter = (filters) => {
    let result = [...suppliers];

    fields.forEach((field) => {
      const value = filters[field.name];
      if (field.type === "text" && value?.trim()) {
        const search = value.toLowerCase();
        result = result.filter((client) =>
          client[field.name]?.toLowerCase().includes(search)
        );
      }
    });

    setFilteredItems(result);

    console.log(filteredItems);
  };

  return (
    <>
      <NavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        headerName="Supplier"
        type="supplier"
        handleSubmitDialog={(data, type) => handleSubmitDialog(data, type)}
        formData={formData}
        setFormData={setFormData}
      />
      <FilterControl label="Suppliers" fields={fields} suppliers={suppliers} onFilter={handleFilter} />

      <SupplierGrid
        items = {filteredItems}
        suppliers={suppliers}
        setSuppliers={setSuppliers}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};
