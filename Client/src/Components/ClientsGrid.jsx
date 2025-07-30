import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "name", headerName: "First name", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 150, editable: true },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 110,
    editable: true,
  },
  { field: "address", headerName: "Address", sortable: false, width: 160 },
];

export default function DataGridDemo({ clients, setClients, items }) {
  const [rows, setRows] = useState([]);

  console.log("items desde el grid", items)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const formatted = clients.map((client) => ({
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
    }));
    setRows(formatted);
  }, [clients]);


  const formatClients = (arr) =>
  arr.map((client) => ({
    id: client._id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    address: client.address
  }));

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={Array.isArray(items) && items.length > 0 ? formatClients(items) : rows}
        sx={{ height: "100vh", width: "100%" }}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        columnVisibilityModel={{
          id: false,
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
