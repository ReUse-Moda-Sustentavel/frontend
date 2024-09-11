
import 'react-toastify/dist/ReactToastify.css';
import { ToastAlerta } from '../../utils/ToastAlerta';
import { FormEvent } from 'react';

function Contato() {

 
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    ToastAlerta('Mensagem enviada com sucesso!',"sucesso");
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="mx-auto flex flex-col overflow-hidden rounded-md bg-gray-200 md:flex-row shadow-xl">
        <div className="w-full bg-green-800 p-8 text-white md:w-1/3 md:p-12">
          <h2 className="mt-12 mb-2 text-start text-2xl font-bold md:text-3xl">ReUse Moda Sustentável</h2>
          <div className="mt-5 text-start">
            <p>Rua Coitadolândia, 1234</p>
            <p>São Paulo - SP</p>
            <p>reusemodasustentavelgen@gmail.com</p>
            <p>+55(11) 4002-8922</p>
          </div>
        </div>
        <div className="w-full px-4 py-8 md:w-1/2 md:px-12 md:py-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Contate-nos</h2>
          <form className="form" onSubmit={handleFormSubmit}>

            <div>
              <input
                type="text"
                placeholder="Nome"
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              />
            </div>

            <div className="mt-5">
              <input
                type=""
                placeholder="Telefone/Celular"
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              />
            </div>

            <div className="mt-5">
              <input
                type="text"
                placeholder="E-mail"
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              />
            </div>

            <div className="mt-5">
              <input
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
                placeholder="Digite sua mensagem!"
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className="w-full rounded-md bg-green-800 py-3 text-center text-white outline-none"
              >
                Enviar Mensagem
              </button>
            </div>

          </form>
        </div>
      </div>
      

      
    </div>
  );
}

export default Contato;


