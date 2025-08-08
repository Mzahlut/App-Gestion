import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "number", headerName: "Number", width: 150, editable: true },
  { field: "email", headerName: "Email", width: 150, editable: true },
  {
    field: "phone",
    headerName: "Phone",
    width: 110,
    editable: true,
  },
  { field: "address", headerName: "Address", sortable: false, width: 160 },
  { field: "products", headerName: "Products", sortable: false, width: 160 },
  { field: "total", headerName: "Total", sortable: false, width: 160 },
];

export default function DataGridDemo({ invoices, setInvoices, items }) {
  const [rows, setRows] = useState([]);

  console.log("items desde el grid", items);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);
  
  const products = invoices.map((invoice) => invoice.products);
  console.log("products desde el grid", products);

  useEffect(() => {
    const formatted = invoices.map((invoice) => ({
      id: invoice._id,
      number: invoice.number,
      email: invoice.email,
      phone: invoice.phone,
      address: invoice.address,
      products: invoice.products,
      total: invoice.totalAmount ? invoice.totalAmount : "N/A",
    }));
    setRows(formatted);
  }, [invoices]);

  const formatProducts = (arr) =>
    arr.map((invoice) => ({
      id: invoice._id,
      number: invoice.number,
      email: invoice.email,
      phone: invoice.phone,
      address: invoice.address,
      products: invoice.products,
      total: invoice.totalAmount ? invoice.totalAmount : "N/A",
    }));

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={
          Array.isArray(items) && items.length > 0
            ? formatProducts(items)
            : rows
        }
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
