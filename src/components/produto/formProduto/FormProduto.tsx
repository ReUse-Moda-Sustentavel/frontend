import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Produto from '../../../model/Produto';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import Categoria from '../../../model/Categoria';

function FormProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto);

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', genero: '' })

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/produto/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categoria/${id}`, setCategoria, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar('/categoria', setCategorias, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        
        await atualizar(`/produto`, produto, setProduto, {
          headers: {
            'Authorization': token
          }
        })
        ToastAlerta('Produto atualizado com sucesso', 'sucesso')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar o Produto', 'erro')
        }

      }

    } else {
      try {
        await cadastrar(`/produto`, produto, setProduto, {
          headers: {
            'Authorization': token
          }
        })

        ToastAlerta('Produto cadastrado com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          ToastAlerta('O token expirou, favor logar novamente', 'info')
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar o Produto', 'erro')
        }
      }
    }
    retornar()
  }

  function retornar() {
    navigate("/produtos")
  }

  
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    console.log(JSON.stringify(produto));
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.name === "preco" ? parseFloat(e.target.value) : e.target.value,
      categoria: categoria,
    })
    
    
  }

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    })
  }, [categoria])


  useEffect(() => { // ok 
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
        mx-auto bg-white
        flex flex-col  items-center box-border
      '>
        <div className='flex flex-col items-center w-full px-8 '>
          <h2 className='text-3xl text-reuse-green font-bold pb-8'>
            {id === undefined ? 'Cadastrar Novo Produto' : 'Editar Produto'}
          </h2>

          <form
            className="flex flex-col w-[100%]"
            onSubmit={gerarNovoProduto}>

          {id === undefined ?
            <select
              name="categoria"
              id="categoria"
              className='border border-gray-400 w-[100%] py-3 px-4 mb-6 outline-none text-gray-500'
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option className='rounded-none	' selected disabled>Selecione uma Categoria</option>

              {categorias.map((categoria) => (
                <>
                  <option className='rounded-none text-reuse-green	' value={categoria.id} >{categoria.nome} - {categoria.genero}</option>
                </>
              ))}

            </select> 
            :
            <></>}

            <input
              type="text"
              placeholder="Nome"
              name='nome'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <input
              type="text"
              placeholder="Descrição"
              name='descricao'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={produto.descricao}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <input
              type="text"
              placeholder="Tamanho"
              name='tamanho'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={produto.tamanho}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <input
              type="number"
              placeholder="Preço"
              name='preco'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={produto.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
            <input
              type="text"
              placeholder="Foto"
              name='foto'
              className='border border-gray-400 
                  w-[100%] py-3 px-4 mb-6 
                  outline-none text-reuse-green'
              value={produto.foto}
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

export default FormProduto