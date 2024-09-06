import { Link } from "react-router-dom"
import Categoria from "../../../model/Categoria"

interface CardCategoriaProps {
    categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div>
      <div className="py-2 px-4 bg-green-300">{categoria.id} - {categoria.nome}</div>

      <div className="bg-green-400 flex justify-around"> 
        <Link to={`/atualizarCategoria/${categoria.id}`}>
          <button className="w-1/2 py-1 px-2">Editar</button>
        </Link>
        <Link to={`/deletarCategoria/${categoria.id}`}>
          <button className="w-1/2 py-1 px-2">Deletar</button>
        </Link>
      </div>
    </div>
  )
}


export default CardCategoria