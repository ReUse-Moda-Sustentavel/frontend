import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Categoria from '../../../model/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/categoria/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })

    console.log(JSON.stringify(categoria))
  }

  async function gerarNovoCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await atualizar(`/categoria`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        ToastAlerta('Categoria atualizado com sucesso', 'sucesso')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar o Categoria', 'erro')
        }

      }

    } else {
      try {
        await cadastrar(`/categoria`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        ToastAlerta('Categoria cadastrado com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrado o Categoria', 'erro')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/categorias")
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='flex justify-center bg-center bg-login pt-12 pb-24'>

      <div className='
        w-[28rem] shadow-2xl 
        py-8 border-t-[6px] border-reuse-green
        mx-auto bg-white mb-40
        flex flex-col  items-center box-border
      '>
        <div className='flex flex-col items-center w-full px-8 '>
          <h2 className='text-3xl text-reuse-green font-bold pb-8'>
            {id === undefined ? 'Cadastrar Nova Categoria' : 'Editar Categoria'}
          </h2>

          <form
            className="flex flex-col w-[100%]"
            onSubmit={gerarNovoCategoria}>
            <input
              type="text"
              placeholder="Nome"
              name='nome'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <input
              type="text"
              placeholder="Gênero"
              name='genero'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={categoria.genero}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <button
              className='
              w-[100%] 
            bg-reuse-green hover:bg-green-800
            py-3 px-4 mt-4
            self-center    
            text-white 
            font-bold
            flex  outline-none
            items-center justify-center '
              type="submit"
            >
              {id === undefined ? 'Cadastrar' : 'Editar'}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default FormCategoria