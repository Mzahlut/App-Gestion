import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";


export default function DataGridDemo({ products, setProducts }) {
  const [rows, setRows] = useState([]);
  
  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "name", headerName: "Product Name", width: 150, editable: true },
    { field: "stock", headerName: "Stock", width: 150, editable: true },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 110,
      editable: true,
    },
    { field: "supplier", headerName: "Supplier", sortable: false, width: 160 },
  ];
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    const formatted = products.map((product) => ({
      id: product._id,
      name: product.name,
      stock: product.stock,
      price: product.price,
      supplier: product.supplier?.name || "N/A",
    }));
    setRows(formatted);
  }, [products]);



  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={rows}
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
