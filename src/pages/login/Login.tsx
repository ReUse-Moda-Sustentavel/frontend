import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import UsuarioLogin from '../../model/UsuarioLogin';
import AuthContext from '../../contexts/AuthContext';


function Login() {

  const navigate = useNavigate()
  const { usuario, handleLogin, isLoading } = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  )

  useEffect(() => {
    console.log(usuario);

if (usuario.token !== '') {
      navigate("/")
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    })
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin)
  }

 {/* console.log(JSON.stringify(usuarioLogin))*/}

  return (
    <div className="h-screen grid grid-cols-2">
      <div className="login-section flex flex-col justify-center items-center">
        <h2 className='text-4xl font-bold'>Entrar</h2>
        <form
          onSubmit={login}
          className="flex flex-col w-[60%]"
          method="post">
          <label htmlFor="" className='font-bold pt-2'>Usuário</label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            placeholder='Usuário'
            value={usuarioLogin.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className='border-2 border-black rounded py-1 px-3' />
          <label htmlFor="" className='font-bold pt-2'>Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder='Senha'
            value={usuarioLogin.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            className='border-2 border-black rounded py-1 px-3' />

          <button type="submit"
            className='w-[40%] 
            bg-indigo-400 
            py-2 mt-4
            self-center    
            text-white 
            font-bold
            rounded flex
            items-center justify-center'>
            {
              isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                "Entrar"
            }
          </button>
        </form>
        <div className='w-[60%] h-[0.5px] bg-black mt-4' />
        <span className='p-4 font-bold'>
          Ainda não tem uma conta? <Link to="/cadastro" className='text-indigo-800 cursor-pointer hover:underline'>Cadastre-se</Link>

        </span>

      </div>
    </div>
  );
}

export default Login;