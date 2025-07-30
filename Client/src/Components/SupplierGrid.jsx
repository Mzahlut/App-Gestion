import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";



const columns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "name", headerName: "First name", width: 150, editable: true },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 110,
    editable: true,
  },
  { field: "email", headerName: "Email", width: 150, editable: true },

];

export default function DataGridDemo({ suppliers, setSuppliers, items }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);


  useEffect(() => {
    const formatted = suppliers.map((supplier) => ({
      id: supplier._id,
      name: supplier.name,
      phone: supplier.phone,
      email: supplier.email,

    }));
    setRows(formatted);
  }, [suppliers]);

  const formatSuppliers = (arr) =>
  arr.map((supplier) => ({
    id: supplier._id,
    name: supplier.name,
    phone: supplier.phone,
    email: supplier.email,
  }));

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={Array.isArray(items) && items.length > 0 ? formatSuppliers(items) : rows}
        sx={{height: "100vh", width: "100%"}}
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