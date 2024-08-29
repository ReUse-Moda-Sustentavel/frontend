
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import SobreNos from './pages/SobreNos/SobreNos';
import Contato from './pages/Contato/Contato';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className='w-screen'>
      <BrowserRouter>
        <Navbar />
        <div className='min-h-[80vh] '>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sobrenos' element={<SobreNos />} />
            <Route path='/contato' element={<Contato />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;