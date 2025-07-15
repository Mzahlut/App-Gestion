// src/pages/Login.jsx
import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e, action) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/auth/register", { email, password, name });
      localStorage.setItem("token", res.data.token);
      setIsSaved(true);
    } catch (error) {
      console.error(`Error en ${action}:`, error.response?.data?.mensaje);
    }
  };

  return (
  !isSaved ? (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400, mx: 2 }}>
        <Typography variant="h5" gutterBottom>Registro</Typography>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: 2 }}
          onClick={(e) => handleSubmit(e, "register")}
        >
          Registrarse
          </Button>
          <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginBottom: 2 }}
          onClick={() => navigate("/")}
        >
          Login
        </Button>
      </Paper>
    </Box>
  ) : (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#e8f5e9">
      <Paper elevation={3} sx={{ padding: 4,  maxWidth: 400, mx: 2 }}>
        <Typography variant="h5" gutterBottom color="success.main">
          Register successful!
        </Typography>
        <Typography>You can now log in and access the panel.</Typography>
        <Button
          variant="outlined"
          sx={{ marginTop: 2 }}
          onClick={() => window.location.href = "/"}
        >
          Go to Login
        </Button>
      </Paper>
    </Box>
  )
  );
};

export default RegisterPage;
