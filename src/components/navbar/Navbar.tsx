import { ShoppingCart, User } from "@phosphor-icons/react"
import { Link, useNavigate } from "react-router-dom"
import Contato from "../../pages/Contato/Contato"


function Navbar() {
    const navigate = useNavigate();
    return (
        <div className="
                grid grid-cols-3
                font-italiana text-reuse-green
                h-24 px-10
                bg-gray-200">
            <div className="
                text-2xl 
                flex items-center justify-start gap-2">


                <Link to="/produtos">Produtos</Link>
                {/* <Link to="/cadastroProduto">Cadastrar Produto</Link> */}
                {/* <Link to="/categorias">
                    <span className="cursor-pointer">Categorias</span>
                </Link>
                <Link to="/cadastroCategoria">
                    <span className="cursor-pointer">Cadastrar Categoria</span>
                </Link> */}
            </div>
            <div className="
                text-7xl flex items-center justify-center">
                <Link to="/">REUSE</Link>
            </div>
            <div className="
                text-2xl flex 
                items-center justify-end">
                <ul className="
                    flex items-center 
                    justify-around gap-8">
                    <li className="cursor-pointer">
                        <Link to="/contato">Contato</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/sobrenos">Sobre Nós</Link>
                    </li>
                    <li className="cursor-pointer">
                        <Link to="/login">
                            <User size={24} />
                        </Link>
                    </li>
                    <li className="cursor-pointer">

                        <Link to='/cart'> <ShoppingCart size={24} /> </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar