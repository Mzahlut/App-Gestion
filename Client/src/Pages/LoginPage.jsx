// src/pages/Login.jsx
import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e, action) => {
    e.preventDefault();
    const endpoint =
      action === "register"
        ? "http://localhost:4000/api/auth/register"
        : "http://localhost:4000/api/auth/login";

    try {
      const res = await axios.post(endpoint, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/homepage");
    } catch (error) {
      console.error(`Error en ${action}:`, error.response?.data?.mensaje);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width={"100%"}
      bgcolor="#f5f5f5"
      px={4}
      py={8} 
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxHeight: '100%',
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Iniciar sesión
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: 2 }}
          onClick={(e) => handleSubmit(e, "login")}
        >
          Login
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: 2 }}
          onClick={() => navigate("/RegisterPage")}
        >
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
