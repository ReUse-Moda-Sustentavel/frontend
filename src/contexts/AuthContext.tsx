import { createContext, ReactNode, useState } from "react";
import { login } from "../services/Service";
import UsuarioLogin from "../model/UsuarioLogin";


interface AuthContextProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {


    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        usuario: '',
        nome: '',
        senha: '',
        foto: '',
        token: '',
    });


    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(usuarioLogin: UsuarioLogin) {

        setIsLoading(true);

        try {
            await login(`/usuarios/logar`, usuarioLogin, setUsuario);
            alert("Usuário autenticado com sucesso!");
        } catch (error) {
            alert("Dados do Usuário inconsistentes!");
        }

        setIsLoading(false);
    }


    function handleLogout() {
        setUsuario({
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: '',
            token: '',
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;