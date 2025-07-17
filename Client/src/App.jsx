import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import { ClientsPage } from './Pages/ClientsPage.jsx';
import { SupplierPage } from './Pages/SupplierPage.jsx';
import { ProductsPage } from './Pages/ProductsPage.jsx';


import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>

    </Router>

  )
}

export default App
