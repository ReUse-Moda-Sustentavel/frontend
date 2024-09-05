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

  return (
    <div className='bg-login bg-center h-[100vh] pt-12'>
      <div className="
      w-[28rem] shadow-2xl 
      p-8 border-t-[6px] border-reuse-green
      mx-auto bg-white">
        <div className="flex flex-col justify-center items-center">
          <h2 className='text-3xl text-reuse-green font-bold pb-8'>Login</h2>
          <form
            onSubmit={login}
            className="flex flex-col w-[100%]"
            method="post">
            <input
              type="text"
              name="usuario"
              id="usuario"
              placeholder='Usuário'
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green' />
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder='Senha'
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              className='
              border border-gray-400 
              w-[100%] py-3 px-4 mb-6 
              outline-none' />

            <button type="submit"
              className='w-[100%] 
            bg-reuse-green hover:opacity-95
            py-3 px-4 mt-4
            self-center    
            text-white 
            font-bold
            flex 
            items-center justify-center'>
              {
                isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> :
                  "Entrar"
              }
            </button>
          </form>
          <span className='p-4 font-bold text-gray-500'>
            Ainda não tem uma conta? <Link to="/cadastro" className='text-reuse-green cursor-pointer hover:underline'>Cadastre-se</Link>

          </span>

        </div>
      </div>
    </div>
  );
}

export default Login;