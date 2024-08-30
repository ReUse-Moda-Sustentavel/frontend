
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
    <div className='w-screen'>
      <AuthProvider>

        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh] '>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sobrenos' element={<SobreNos />} />
              <Route path='/contato' element={<Contato />} />
              <Route path='/cadastro' element={<Cadastro />} />
              <Route path='/login' element={<Login />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </div>
  );
}
export default App;