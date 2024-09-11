import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import Produto from '../../../model/Produto'
import { ToastAlerta } from '../../../utils/ToastAlerta'

function DeletarProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto)

  let navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produto/${id}`, setProduto, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        ToastAlerta('O token expirou, favor logar novamente', 'info')
        handleLogout()
      }
    }
  }
  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'erro');
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/produtos")
  }


  async function deletarProduto() {
    try {
      await deletar(`/produto/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      ToastAlerta('Produto apagado com sucesso', 'sucesso')

    } catch (error) {
      ToastAlerta('Erro ao apagar o Produto', 'erro')
    }

    retornar()
  }


  return (
    <div className='flex justify-center'>
      <div className='flex flex-col items-center my-4 bg-reuse-green py-2 px-4'>
        <h2 className='text-xl pb-4 font-bold text-white'>
          Você tem certeza que deseja apagar o produto a seguir?
        </h2>
        <span className=' w-full text-center bg-white py-2'>
          {produto.id} - {produto.nome}
        </span>
        <div className='flex justify-around w-[100%] mt-4 gap-4 pb-2'>
          <button onClick={retornar}
            className="w-1/2 py-1 px-2 border-green-600 border-solid border-[1px] bg-white">
            Não
          </button>
          <button onClick={deletarProduto}
            className="w-1/2 py-1 px-2 border-green-600 border-solid border-[1px] bg-white">
            Sim
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarProduto