
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DeletarCategoria from './components/categoria/deletarCategoria.tsx/DeletarCategoria';
import FormCategoria from './components/categoria/formCategoria.tsx/FormCategoria';
import ListaCategorias from './components/categoria/listaCategorias/ListaCategorias';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import DeletarProduto from './components/produto/deletarProduto/DeletarProduto';
import FormProduto from './components/produto/formProduto/FormProduto';
import ListaProdutos from './components/produto/listaProduto/ListaProdutos';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/cadastro/Cadastro';
import Contato from './pages/Contato/Contato';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SobreNos from './pages/SobreNos/SobreNos';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/carrinho/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <CartProvider>
    <AuthProvider>
      <ToastContainer/>
      <BrowserRouter>
          <Navbar />
          <div className='grid [auto_1fr_auto]'>
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

            <Route path='/produtos' element={<ListaProdutos />} />
            <Route path="/cadastroProduto" element={<FormProduto />} />
            <Route path="/atualizarProduto/:id" element={<FormProduto />} />
            <Route path="/deletarProduto/:id" element={<DeletarProduto />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          </div>
          <Footer />
      </BrowserRouter>
    </AuthProvider>
    </CartProvider>
    </>
  );
}
export default App;