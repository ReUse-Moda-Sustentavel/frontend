import { Link } from 'react-router-dom'
import Produto from '../../../model/Produto'

interface CardProdutoProps {
  produto: Produto
}

function CardProduto({ produto }: CardProdutoProps) {
  return (
    <div>
      <div className="py-2 px-4 bg-green-300">{produto.id} - {produto.nome}</div>

      <div className="bg-green-400 flex justify-around">
        <Link to={`/atualizarProduto/${produto.id}`}>
          <button className="w-1/2 py-1 px-2">Editar</button>
        </Link>
        <Link to={`/deletarProduto/${produto.id}`}>
          <button className="w-1/2 py-1 px-2">Deletar</button>
        </Link>
      </div>
    </div>
  )
}


export default CardProduto