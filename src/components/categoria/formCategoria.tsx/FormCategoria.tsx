import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Categoria from '../../../model/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

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

        // ToastAlerta('Categoria atualizado com sucesso', 'sucesso')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          // ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          // ToastAlerta('Erro ao atualizar o Categoria', 'erro')
        }

      }

    } else {
      try {
        await cadastrar(`/categoria`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        // ToastAlerta('Categoria cadastrado com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          // ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          // ToastAlerta('Erro ao cadastrado o Categoria', 'erro')
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
      // ToastAlerta('Você precisa estar logado', 'info');;
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <h2 className='text-2xl font-bold'>
        {id === undefined ? 'Cadastrar Nova Categoria' : 'Editar Categoria'}
      </h2>
      <div className='flex flex-col items-center my-4 bg-green-500  px-4 w-[28rem]'>

        <form className=" flex flex-col gap-4 pt-2 pb-4 w-full" onSubmit={gerarNovoCategoria}>
          <label htmlFor="nome" className='text-xl text-center'>
            Nome da Categoria
          </label>
          <input
            type="text"
            placeholder="Nome"
            name='nome'
            className="py-1 px-2 outline-none"
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <label htmlFor="genero" className='text-xl text-center'>
            Gênero da Categoria
          </label>
          <input
            type="text"
            placeholder="Gênero"
            name='genero'
            className="py-1 px-2 outline-none"
            value={categoria.genero}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <button
            className="bg-green-400 flex justify-around py-1 px-2"
            type="submit"
          >
            {id === undefined ? 'Cadastrar' : 'Editar'}
          </button>
        </form>

      </div>
    </div>
  )
}

export default FormCategoria