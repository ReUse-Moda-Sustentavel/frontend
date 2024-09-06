
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
import ListaCategorias from './components/categoria/listaCategorias/ListaCategorias';
import FormCategoria from './components/categoria/formCategoria.tsx/FormCategoria';
import DeletarCategoria from './components/categoria/deletarCategoria.tsx/DeletarCategoria';

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

            <Route path='/categorias' element={<ListaCategorias />} />
            <Route path="/cadastroCategoria" element={<FormCategoria />} />
            <Route path="/atualizarCategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarCategoria/:id" element={<DeletarCategoria />} />

          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;