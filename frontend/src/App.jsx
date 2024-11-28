import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Layout from './components/Layout';
import Login from './components/Login';
import Registro from './components/Registro';
import ListaTareas from './components/ListaTareas';

const RutaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

RutaProtegida.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          
          {/* Rutas protegidas */}
          <Route
            path="/tareas"
            element={
              <RutaProtegida>
                <ListaTareas />
              </RutaProtegida>
            }
          />
          
          {/* Ruta por defecto */}
          <Route path="/" element={<Navigate to="/tareas" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;