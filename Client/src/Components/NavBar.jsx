import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function NavBar({ headerName, type }) {
  const [auth, setAuth] = useState(true);
  const [mainMenuAnchor, setMainMenuAnchor] = React.useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickLogout = () => {
    setOpenSnackbar(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    console.log(token);
    console.log("Token removed");
    setAuth(false);
    navigate("/");
    setOpenSnackbar(false);
  };

  const cancelLogout = () => {
    setOpenSnackbar(false);
  };

  const handleMainMenu = (event) => {
    setMainMenuAnchor(event.currentTarget);
  };

  const handleUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleCloseMainMenu = () => {
    setMainMenuAnchor(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitDialog = async (type) => {
    try {
      if (type === "products") {
        const response = await axios.post(
          "http://localhost:4000/api/products",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Producto creado:", response.data);
      } else if (type === "clients") {
        const response = await axios.post(
          "http://localhost:4000/api/clients",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Cliente creado:", response.data);
      } else if (type === "suppliers") {
        const response = await axios.post(
          "http://localhost:4000/api/suppliers",
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Proveedor creado:", response.data);
      }

      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error("Error al enviar datos del producto:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onClick={handleClickLogout}
              aria-label="login switch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static" sx={{ borderRadius: "12px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMainMenu}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="main-menu"
            anchorEl={mainMenuAnchor}
            open={Boolean(mainMenuAnchor)}
            onClose={handleCloseMainMenu}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMainMenu();
                navigate("/products");
              }}
            >
              Products
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMainMenu();
                navigate("/clients");
              }}
            >
              Clients
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMainMenu();
                navigate("/supplier");
              }}
            >
              Suppliers
            </MenuItem>
          </Menu>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AddBoxRoundedIcon onClick={handleOpenDialog} />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              marginLeft: 0,
              display: { xs: "none", sm: "flex", width: 0 },
            }}
          >
            {headerName}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}
          >
            Business Management
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleUserMenu}
                color="inherit"
              >
                <Popover>
                  <Typography sx={{ p: 2 }}>User Menu</Typography>
                </Popover>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={handleCloseUserMenu}>Config 🛠</MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>My account 🙍‍♂️</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        slots={{ transition: Snackbar.Transition }}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#1976d2",
            color: "#fff",
          },
          borderRadius: "18px",
        }}
        message="Are you sure you want to logout?"
        action={
          <>
            <Button color="inherit" size="small" onClick={confirmLogout}>
              Yes
            </Button>
            <Button color="inherit" size="small" onClick={cancelLogout}>
              No
            </Button>
          </>
        }
      />{" "}
      {type === "products" ? (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Products</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="stock"
              label="Stock"
              fullWidth
              margin="normal"
              value={formData.stock || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="price"
              label="Price"
              fullWidth
              margin="normal"
              value={formData.price || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="supplier"
              label="Supplier"
              fullWidth
              margin="normal"
              value={formData.supplier || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />

            <Button onClick={() => handleSubmitDialog(type)}>Send</Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogContent>
        </Dialog>
      ) : type === "clients" ? (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Clients</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="phone"
              label="Phone"
              fullWidth
              margin="normal"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="address"
              label="Address"
              fullWidth
              margin="normal"
              value={formData.address || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <Button onClick={() => handleSubmitDialog(type)}>Send</Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Supplier</DialogTitle>
          <DialogContent>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="phone"
              label="Phone"
              fullWidth
              margin="normal"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
            <Button onClick={() => handleSubmitDialog(type)}>Send</Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
