import { CardDtoResponse } from "../Card/CardDtoResponse";

export interface ListaResponse {
    listId: number;
    nombre: string;
    Order: number;
    BoardId: number;
    cards : CardDtoResponse[];
}