import { useContext, useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Categoria from '../../../model/Categoria';
import { buscar } from '../../../services/Service';
import CardCategoria from '../cardCategoria/CardCategoria';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar('/categoria', setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [categorias.length]);

  return (
    <>

      <div className="mx-[6vw] py-4 flex justify-center md:justify-end ">
        <Link to="/cadastroCategoria">
          <button
            className="bg-reuse-green text-white
                    py-[10px] hover:bg-green-800 outline-none
                    border-solid border-[1px] border-reuse-green 
                    w-[280px] rounded-md">
            Adicionar Categoria
          </button>
        </Link>
      </div>



      {categorias.length === 0 && (
        <div className="w-full flex justify-center">
          <Puff
            visible={true}
            height="100"
            width="100"
            color="#24422F"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass="puff-wrapper mx-auto"
          />
        </div>
      )}
      <div>
        <div className="grid items-center justify-center grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 wrap  mx-[5vw] ">
          {categorias.map((categoria) => (
            <>
              <CardCategoria key={categoria.id} categoria={categoria} />
              {/* {produto.categoria?.id == 13 ? <CardProduto key={produto.id} produto={produto} /> : <></>}  */}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaCategorias