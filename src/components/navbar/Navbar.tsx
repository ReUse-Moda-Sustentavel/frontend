import { ShoppingCart, SignIn, SignOut, User, UserCircle } from "@phosphor-icons/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

function Navbar() {
    const { usuario, handleLogout } = useContext(AuthContext);
    const [mobileNavbar, setMobileNavar] = useState(false);



    return (
        <>
            <div className="
                grid grid-cols-3 md:grid-cols-3
                font-italiana text-reuse-green
                h-24 px-10
                bg-gray-200">

                {/* Seção 1 */}
                {usuario.token ?
                    (
                        <div className="
                            text-2xl 
                            items-center justify-start gap-8 md:flex">
                            <>
                                <Link className="hidden md:block" to="/produtos">Produtos</Link>
                                <Link className="hidden md:block" to="/categorias">Categorias</Link>
                            </>
                        </div>
                    )
                    :
                    (
                        <div className="
                            text-2xl 
                            items-center justify-start gap-8 md:flex" />

                    )
                }


                {/* Seção 2 */}
                <div className="
                text-7xl flex items-center justify-center">
                    <Link to="/">REUSE</Link>
                </div>

                {/* Seção 3 */}
                {usuario.token ? (
                    <div className="
                text-2xl flex 
                items-center justify-end">
                        <ul className="
                    items-center  md:flex 
                    justify-around gap-8">
                            <li className="cursor-pointer">
                                <Link className="hidden md:block" to="/contato">Contato</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link className="hidden md:block" to="/sobrenos">Sobre Nós</Link>
                            </li>
                            <li className="cursor-pointer">
                                <Link className="hidden md:block" to='/cart'> <ShoppingCart size={24} /> </Link>
                            </li>
                            <li className="cursor-pointer">
                                <SignOut className="hidden md:block" onClick={handleLogout} size={24} />
                            </li>
                            <li className="cursor-pointer">
                                <SignOut className="md:hidden" onClick={handleLogout} size={24} />
                            </li>
                        </ul>
                    </div>
                ) :
                    (
                        <div className="
                        text-2xl flex 
                        items-center justify-end">
                            <Link to="/login">
                                <UserCircle size={32} className="cursor-pointer" />
                            </Link>
                        </div>
                    )
                }
            </div>

            {usuario.token ? (

                <ul className="block md:hidden  w-full items-center text-center  flex flex-col gap-2 pt-2">
                    <li className="block md:hidden w-full border-[1px] border-solid border-gray-400  bg-gray-200">
                        <Link className="block md:hidden" to="/produtos">Produtos</Link>
                    </li>
                    <li className="w-full border-[1px] border-solid border-gray-400 bg-gray-200">
                        <Link className="block md:hidden block md:hidden" to="/categorias">Categorias</Link>
                    </li>
                    <li className="w-full border-[1px] border-solid border-gray-400 bg-gray-200">
                        <Link className="block md:hidden block md:hidden" to="/contato">Contato</Link>
                    </li>
                    <li className="w-full border-[1px] border-solid border-gray-400 bg-gray-200">
                        <Link className="block md:hidden block md:hidden" to="/sobrenos">Sobre Nós</Link>
                    </li>
                </ul>
            ) : (<></>) }
        </>
    )
}

export default Navbar