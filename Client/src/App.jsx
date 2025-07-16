import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import { HomePage } from './Pages/HomePage.jsx';

import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>

    </Router>

  )
}

export default App
