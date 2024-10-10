import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom';
import Usuario from '../../model/Usuario';
import { RotatingLines } from 'react-loader-spinner';
import { cadastrarUsuario } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Cadastro() {

  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmaSenha, setConfirmaSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    usuario: '',
    nome: '',
    senha: '',
    foto: '',
    tipoUsuario: '',
  });


  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);


  function retornar() {
    navigate('/login')
  }


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })

  }


  function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }


  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {

    e.preventDefault();


    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {


      setIsLoading(true)

      try {
        console.log(usuario);

        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', "sucesso");

      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', "erro")
      }

    } else {
      ToastAlerta("Dados estão inconsistentes! Verifique os dados do usuário.", "info");
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false)
  }

  return (
    <div className='bg-login bg-center h-[100vh] py-12'>
      <div className="max-w-[28rem] shadow-2xl 
                      p-8 border-t-[6px] border-reuse-green
                      mx-auto bg-white">
        <form className='
          flex flex-col'
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className='text-3xl text-reuse-green 
                        font-bold text-center
                        pb-8'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'

              value={usuario.nome}

              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'

              value={usuario.usuario}

              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'

              value={usuario.foto}

              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="tipoUsuario"
              name="tipoUsuario"
              placeholder="Tipo Usuario"
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'

              value={usuario.tipoUsuario}

              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>


          <div className="flex flex-col w-full">
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'

              value={usuario.senha}

              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className='border border-gray-400 
                  w-[100%] py-3 px-4 
                  outline-none text-reuse-green'


              value={confirmaSenha}


              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmaSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-4 mt-4 pb-4">

            <button className='text-white font-bold
                           bg-red-800 hover:bg-red-700
                           py-3 px-4 mt-4'
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='w-[100%] 
            bg-reuse-green hover:bg-green-800
            py-3 px-4 mt-4
            self-center    
            text-white 
            font-bold
            flex outline-none
            items-center justify-center'
            >
              {isLoading ? <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              /> :
                <span>Cadastrar</span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Cadastro