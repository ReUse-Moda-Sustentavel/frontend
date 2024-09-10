import { Link } from "react-router-dom"
import Categoria from "../../../model/Categoria"

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <>
      <Link to="/produtos" state={categoria}>
        <div className="flex flex-col items-center rounded-md 
          overflow-hidden bg-gray-200 w-[280px] 
          hover:shadow-xl duration-150 mx-auto
          border-solid border-[1px] border-gray-300 cursor-pointer">
          <div className="py-[12px] px-4 text-xl w-full bg-gray-300 font-bold">{categoria.nome}</div>
          <div className="py-[8px] px-4  w-full text-lg text-end">{categoria.genero}</div>
          <div className="flex justify-around w-full bg-reuse-green">
            <button className="w-1/2 text-white rounded-b-md 
                      bg-reuse-green hover:bg-green-800 
                      flex items-center justify-center py-2
                      border-solid border-[1px] border-reuse-green">
              <Link className="" to={`/atualizarCategoria/${categoria.id}`}>
                Editar
              </Link>
            </button>
            <button className="w-1/2 text-white rounded-b-md 
                      bg-reuse-green hover:bg-green-800 
                      flex items-center justify-center py-2
                      border-solid border-[1px] border-reuse-green">
              <Link className="" to={`/deletarCategoria/${categoria.id}`}>
                Deletar
              </Link>
            </button>
          </div>
        </div >
      </Link>
    </>
  )
}


export default CardCategoria