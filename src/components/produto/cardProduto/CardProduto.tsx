import { Link } from 'react-router-dom'
import Produto from '../../../model/Produto'
import { CartContext } from '../../../contexts/CartContext'
import { useContext } from 'react'
import { Pencil, Trash } from '@phosphor-icons/react'

interface CardProdutoProps {
  produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {

  const { adicionarProduto } = useContext(CartContext)

  return (
    <div className='flex flex-col rounded-md 
          overflow-hidden bg-gray-200 w-[280px] 
          hover:shadow-2xl duration-150 mx-auto
          border-solid border-[1px] border-gray-300'>
      <div className="flex justify-end items-end pt-2 pr-2">
        <Link to={`/atualizarProduto/${produto.id}`}>
          <Pencil size={18} className="mr-1 hover:fill-teal-700" />
        </Link>

        <Link to={`/deletarproduto/${produto.id}`}>
          <Trash size={18} className="mr-1 hover:fill-red-700" />
        </Link>
      </div>

      <div className=''>
        <div className='pt-2 p-4'>
          <img src={produto.foto}
            className='border-solid border-[1px] border-gray-300 rounded-md' alt={produto.nome} />
        </div>

        <div>
          <p className='text-xl text-start pl-4 pt-2 text-font-bold'>{produto.nome}</p>
          <p className='text-sm text-start pl-4 text-reuse-light-green'>{produto.categoria?.genero}</p>
          <h3 className='text-xl text-start pl-4 pt-2 '>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(produto.preco)}
          </h3>
          <p className='text-sm text-end pr-4 pb-4'>{produto.categoria?.nome}</p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <button
          className='w-full text-white rounded-b-md 
                      bg-reuse-green hover:bg-green-800 
                      flex items-center justify-center py-2
                      border-solid border-[1px] border-reuse-green'
          onClick={() => adicionarProduto(produto)}>
          Comprar
        </button>
      </div>
    </div >
  )
}


export default CardProduto