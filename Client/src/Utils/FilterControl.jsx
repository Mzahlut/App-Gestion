import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";

export const FilterControl = ({ label, fields, suppliers, onFilter }) => {
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (Array.isArray(suppliers)) {
      const supplierOptions = suppliers.map((item) => item.name);
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
              {item.type === "select" ? (
                <Autocomplete
                  options={supplierOptions}
                  sx={{ flex: 1 }}
                  onChange={(event, value) => {
                    setFilters((prev) => ({
                      ...prev,
                      supplier: value || "",
                    }));
                  }}
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
              ) : item.type === "number" ? (
                <Box sx={{ display: "flex", flex: 1, gap: "6px" }}>
                  <TextField
                    label="From"
                    size="small"
                    type="number"
                    value={filters[`${item.name}_from`] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [`${item.name}_from`]: e.target.value,
                      }))
                    }
                  />
                  <TextField
                    label="To"
                    size="small"
                    type="number"
                    value={filters[`${item.name}_to`] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [`${item.name}_to`]: e.target.value,
                      }))
                    }
                  />
                </Box>
              ) : (
                <TextField
                  label={`Search ${item.label || item.name}`}
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={filters[item.name] || ""}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [item.name]: e.target.value,
                    }))
                  }
                  InputProps={{
                    endAdornment: filters[item.name] && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setFilters((prev) => ({
                              ...prev,
                              [item.name]: "",
                            }))
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <IconButton onClick={() => onFilter(filters)}>
                <SearchIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
