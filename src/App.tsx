
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import SobreNos from './pages/SobreNos/SobreNos';
import Contato from './pages/Contato/Contato';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/cadastro/Cadastro';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='grid [auto_1fr_auto]'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sobrenos' element={<SobreNos />} />
            <Route path='/contato' element={<Contato />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;