import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './ModalProduto.css';
import FormProduto from '../formProduto/FormProduto';


function ModalProduto() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2  border-white hover:bg-white hover:text-indigo-800'>
                        Novo Produto
                    </button>
                }
                modal
            >
                <FormProduto />
            </Popup>
        </>
    );
}

export default ModalProduto;