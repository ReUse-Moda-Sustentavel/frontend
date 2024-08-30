import Categoria from "./Categoria";

export default interface Produto {

    id: number;
    nome: string;
    tamanho: string;
    preco: number;
    descricao: string;
    foto: string;
    categoria?: Categoria | null;

}