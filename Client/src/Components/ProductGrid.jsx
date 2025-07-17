import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  { field: "name", headerName: "Name", width: 150, editable: true },
  {
    field: "stock",
    headerName: "Stock",
    type: "number",
    width: 110,
    editable: true,
  },
  { field: "price", headerName: "Price", width: 150, editable: true },
  { field: "supplier", headerName: "Supplier", width: 150, editable: true },
];

export default function DataGridDemo() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const formatted = response.data.map((product, index) => ({
          id: index + 1,
          name: product.name,
          stock: product.stock,
          price: product.price,
          supplier: product.supplier,
        }));
        setRows(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
