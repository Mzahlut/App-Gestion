import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button } from "@mui/material";

export default function DataGridDemo({
  invoices,
  setInvoices,
  items,
  handleOpenModal,
}) {
  const [rows, setRows] = useState([]);
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
    {
      field: "verDetalle",
      headerName: "Detalle",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              handleOpenModal(params.row.rawProducts);
              console.log("Click en Ver detalle:", params.row.rawProducts);
            }}
          >
            Ver detalle
          </Button>
        );
      },
    },
  ];

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

  useEffect(() => {
    const formatted = invoices.map((invoice) => ({
      id: invoice._id,
      number: invoice.number,
      email: invoice.email,
      phone: invoice.phone,
      address: invoice.address,
      products: Array.isArray(invoice.products)
        ? invoice.products
            .map((p) => {
              const name = p.name || (p.productId?.name ?? "Sin nombre");
              return `${name} (${p.quantity} x $${p.unitPrice})`;
            })
            .join(", ")
        : "Sin productos",
      rawProducts: Array.isArray(invoice.products) ? invoice.products : [],

      total: invoice.totalAmount ? `$${invoice.totalAmount}` : "N/A",
    }));
    setRows(formatted);
  }, [invoices]);

  const formatProducts = (arr) =>
    arr
      .filter((invoice) => invoice && invoice._id)
      .map((invoice) => ({
        id: invoice.id,
        number: invoice.number,
        email: invoice.email,
        phone: invoice.phone,
        address: invoice.address,
        products: Array.isArray(invoice.products)
          ? invoice.products
              .map((p) => {
                const id = p._id || p.id;
                const name = p.name || (p.productId?.name ?? "Sin nombre");
                return `${id} ${name} (${p.quantity} x $${p.unitPrice})`;
              })
              .join(", ")
          : "Sin productos",
        rawProducts: Array.isArray(invoice.products) ? invoice.products : [],
        total: invoice.totalAmount ? `$${invoice.totalAmount}` : "N/A",
      }));

  const finalRows =
    Array.isArray(items) && items.length > 0 ? formatProducts(items) : rows;

  
  console.log("Final rows:", finalRows);
  finalRows.forEach((row, i) => {
    if (!row.id) {
      console.warn(`Fila sin ID en índice ${i}:`, row);
    }
  });

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={finalRows}
        getRowId={(row) => row.id || row._id || row.number || crypto.randomUUID()}
        columns={columns}
        sx={{ height: "100vh", width: "100%" }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        columnVisibilityModel={{
          id: true,
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
