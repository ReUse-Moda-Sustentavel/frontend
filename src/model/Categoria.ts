import Produto from "./Produto";

export default interface Categoria {

    id: number;
    nome: string;
    genero: string;
    produto?: Produto | null;
}