import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

export default function NavBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

      <AppBar
        position="static"
        sx={{borderRadius: "12px"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Business Management
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Popover >
                  <Typography sx={{ p: 2 }}>User Menu</Typography>
                </Popover>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Config 🛠</MenuItem>
                <MenuItem onClick={handleClose}>My account 🙍‍♂️</MenuItem>
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
      />
    </Box>
  );
}
