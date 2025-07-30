import NavBar from "../Components/NavBar.jsx";
import ClientsGrid from "../Components/ClientsGrid.jsx";
import {FilterControl} from "../Utils/FilterControl.jsx";
import { useState } from "react";
import axios from "axios";


export const ClientsPage = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [clients, setClients] = useState([]);
    const [filteredItems, setFilteredItems] = useState("")
  const fields = [
    { id:1, name: "name", label: "Name", type: "text" },
    { id:2, name: "email", label: "Email", type: "email" },
    { id:3, name: "phone", label: "Phone", type: "text" },
    { id:4, name: "address", label: "Address", type: "text" },
  ];

  const handleSubmitDialog = async (data) => {
    try {
      const formData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      };

      
      const response = await axios.post(
        "http://localhost:4000/api/clients",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setClients((prev) => [...prev, response.data]);
      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error("Error al enviar datos del cliente:", error);
    }
  };

  
  const handleFilter = (filters) => {
  let result = [...clients];

  fields.forEach(field => {
    const value = filters[field.name];
    if (field.type === "text" && value?.trim()) {
      const search = value.toLowerCase();
      result = result.filter(client =>
        client[field.name]?.toLowerCase().includes(search)
      );
    }
  });

    setFilteredItems(result);
    
    console.log(filteredItems)
};


  return (
    <>
      <NavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        headerName="Clients"
        type="clients"
        handleSubmitDialog={(data, type) => handleSubmitDialog(data, type)}
        formData={formData}
        setFormData={setFormData}
      />
      <FilterControl label="Clients" fields={fields} onFilter={handleFilter} />

      <ClientsGrid
        items = {filteredItems}
        clients={clients}
        setClients={setClients}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};
