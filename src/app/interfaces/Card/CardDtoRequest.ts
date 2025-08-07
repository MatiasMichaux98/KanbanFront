export interface CardDtoRequest{
    title: string;
    descripcion: string;
    listId: number;
    tagId?: number | null;
}