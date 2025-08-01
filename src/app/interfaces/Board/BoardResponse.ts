import { ListaResponse } from "../Lista/ListaResponse";

export interface BoardResponse {
    boardId : number;
    nombre: string;
    lists: ListaResponse[];
}