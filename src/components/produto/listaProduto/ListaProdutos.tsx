import { Link, useLocation, useNavigate } from "react-router-dom";
import Produto from "../../../model/Produto";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { Puff } from "react-loader-spinner";
import CardProduto from "../cardProduto/CardProduto";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Categoria from "../../../model/Categoria";

interface isHome {
  isHome: boolean;
  categoria?: Categoria;
}

function ListaProdutos(isHome: isHome) {
  const location = useLocation();
  const categoria = location.state;

  if (categoria) {
    console.log(categoria);
    
  }

  const [produtos, setProdutos] = useState<Produto[]>([]);

  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      await buscar('/produto', setProdutos, {
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
  }, [produtos.length]);

  return (
    <>
      {isHome.isHome == true && (
        <div className="mx-[6vw] py-4 flex justify-center md:justify-end ">
          <Link to="/cadastroProduto">
            <button
              className="bg-reuse-green text-white
                    py-[10px] hover:bg-green-800 outline-none
                    border-solid border-[1px] border-reuse-green 
                    w-[280px] rounded-md">
              Adicionar Produto
            </button>
          </Link>
        </div>
      )}
      {produtos.length === 0 && (
        <div className="w-full flex justify-center items-center">
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
          {produtos.map((produto) => (
            <>
              {categoria ?
                produto.categoria?.id == categoria.id ? <CardProduto key={produto.id} produto={produto} /> : <></> 
                :
                <CardProduto key={produto.id} produto={produto} />}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaProdutos