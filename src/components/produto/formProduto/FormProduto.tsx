import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Produto from '../../../model/Produto';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/produto/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.name === "preco" ? parseFloat(e.target.value) : e.target.value
    })
    console.log(produto)
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await atualizar(`/produto`, produto, setProduto, {
          headers: {
            'Authorization': token
          }
        })

        ToastAlerta('Produto atualizado com sucesso', 'sucesso')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar o Produto', 'erro')
        }

      }

    } else {
      try {
        await cadastrar(`/produto`, produto, setProduto, {
          headers: {
            'Authorization': token
          }
        })

        ToastAlerta('Produto cadastrado com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar o Produto', 'erro')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/produtos")
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl font-bold'>
        {id === undefined ? 'Cadastrar Novo Produto' : 'Editar Produto'}
      </h2>
      <div className='flex flex-col items-center my-4 bg-green-500  px-4 w-[28rem]'>

        <form className=" flex flex-col gap-4 pt-2 pb-4 w-full" onSubmit={gerarNovoProduto}>
          <label htmlFor="nome" className='text-xl text-center'>
            Nome do Produto
          </label>
          <input
            type="text"
            placeholder="Nome"
            name='nome'
            className="py-1 px-2 outline-none"
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <label htmlFor="tamanho" className='text-xl text-center'>
            Tamanho do Produto
          </label>
          <input
            type="text"
            placeholder="Tamanho"
            name='tamanho'
            className="py-1 px-2 outline-none"
            value={produto.tamanho}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <label htmlFor="preco" className='text-xl text-center'>
            Preço do Produto
          </label>
          <input
            type="number"
            placeholder="Preço"
            name='preco'
            className="py-1 px-2 outline-none"
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <label htmlFor="descricao" className='text-xl text-center'>
            Descrição do Produto
          </label>
          <input
            type="text"
            placeholder="Descrição"
            name='descricao'
            className="py-1 px-2 outline-none"
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <label htmlFor="foto" className='text-xl text-center'>
            Foto do Produto
          </label>
          <input
            type="text"
            placeholder="Foto"
            name='foto'
            className="py-1 px-2 outline-none"
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <button
            className="bg-green-400 flex justify-around py-1 px-2"
            type="submit"
          >
            {id === undefined ? 'Cadastrar' : 'Editar'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default FormProduto