import { useNavigate } from "react-router-dom";
import Produto from "../../../model/Produto";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import CardProduto from "../cardProduto/CardProduto";


function ListaProdutos() {
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
        // ToastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }
 
  useEffect(() => {
    if (token === '') {
      // ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
  }, [produtos.length]);
  
  return (
    <>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {produtos.map((produto) => (
              <>
                <CardProduto key={produto.id} produto={produto} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos