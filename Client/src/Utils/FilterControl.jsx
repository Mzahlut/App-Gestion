import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";

export const FilterControl = ({ label, fields, suppliers }) => {
  
  
  const [supplierOptions, setSupplierOptions] = useState([]);



  useEffect(() => {
  if (Array.isArray(suppliers)) {
    const supplierOptions = suppliers.map(item => item.name);
    setSupplierOptions(supplierOptions);
  } else {
    console.warn("⚠️ suppliers no está disponible aún");
  }
}, [suppliers]);


  return (
    <Box sx={{ width: "100%", marginTop: "20px", display: "flex" }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ padding: "2px", display: "flex", alignItems: "center" }}
        >
          Search {label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {fields.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", flex: 1, gap: "6px", minWidth: "200px" }}
            >
              {item.name === "supplier" ? (
                <Autocomplete
                  options={supplierOptions}
                  sx={{ flex: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Supplier"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  )}
                />
              ) : (
                <TextField
                  label={`Search ${item.label || item.name}`}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
              <IconButton>
                <SearchIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
