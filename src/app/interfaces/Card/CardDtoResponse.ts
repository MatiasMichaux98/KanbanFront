import { TagDtoResponse } from "../Tag/TagDtoResponse";

export interface CardDtoResponse{
    cardId: number;
    title: string;
    descripcion: string;
    listId: number;
    tag: TagDtoResponse | null;

}