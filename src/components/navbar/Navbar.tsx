import { ShoppingCart, SignIn, SignOut, User, UserCircle } from "@phosphor-icons/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

function Navbar() {
    const { usuario, handleLogout } = useContext(AuthContext);

    return (
        <div className="
                grid grid-cols-3
                font-italiana text-reuse-green
                h-24 px-10
                bg-gray-200">
            <div className="
                text-2xl 
                flex items-center justify-start gap-8">

                {usuario.token ? (
                    <>
                        <Link to="/produtos">Produtos</Link>
                        <Link to="/categorias">Categorias</Link>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className="
                text-7xl flex items-center justify-center">
                <Link to="/">REUSE</Link>
            </div>
            <div className="
                text-2xl flex 
                items-center justify-end">
                {usuario.token ? (
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
                            <Link to='/cart'> <ShoppingCart size={24} /> </Link>
                        </li>
                        <li className="cursor-pointer">
                                <SignOut onClick={handleLogout} size={24} />
                        </li>
                    </ul>
                ) : (
                    <Link to="/login">
                        <UserCircle size={32} className="cursor-pointer" />
                    </Link>
                )}

            </div>
        </div>
    )
}

export default Navbar