import { CardDtoResponse } from "../Card/CardDtoResponse";

export interface ListaResponse {
    ListaId: number;
    nombre: string;
    Order: number;
    BoardId: number;
    cards : CardDtoResponse[];
}