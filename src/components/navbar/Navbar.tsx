import { ShoppingCart, User } from "@phosphor-icons/react"


function Navbar() {
    return (
        <div className="
                grid
                grid-cols-3
                font-italiana 
                h-24
                px-10
                bg-gray-200">
            <div className="text-2xl flex items-center justify-start">
                Menu
            </div>
            <div className="text-7xl flex items-center justify-center">
                REUSE
            </div>
            <div className="text-2xl flex items-center justify-around">
                <ul className="flex items-center justify-around gap-8">
                    <li className="cursor-pointer">Contato</li>
                    <li className="cursor-pointer">Sobre Nós</li>
                    <li className="cursor-pointer">
                        <User size={24} />
                    </li>
                    <li className="cursor-pointer">
                        <ShoppingCart size={24} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar