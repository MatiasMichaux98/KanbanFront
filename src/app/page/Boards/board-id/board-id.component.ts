import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCardComponent } from '../../Cards/create-card/create-card.component';
import { CardDtoResponse } from '../../../interfaces/Card/CardDtoResponse';
import { DeleteCardComponent } from '../../Cards/delete-card/delete-card.component';
import { ListaResponse } from '../../../interfaces/Lista/ListaResponse';
import { UpdateCardComponent } from '../../Cards/update-card/update-card.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CdkDragDrop , CdkDropList , CdkDrag , moveItemInArray, transferArrayItem} from  '@angular/cdk/drag-drop' ;
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UpdateListaComponent } from '../../Listas/update-lista/update-lista.component';
import { CreateListaComponent } from '../../Listas/create-lista/create-lista.component';
import { DialogRef } from '@angular/cdk/dialog';
import { DeleteListaComponent } from '../../Listas/delete-lista/delete-lista.component';

@Component({
  selector: 'app-board-id',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatMenuModule,CdkDrag,CdkDropList ,DragDropModule ],
  templateUrl: './board-id.component.html',
  styleUrl: './board-id.component.css'
})
export class BoardIDComponent {
      selectedCard: CardDtoResponse | null = null;
      private route = inject(ActivatedRoute);
      private boardService = inject(BoardService);
      BoardId: number = 0;
      board!: BoardResponse;
      lista: ListaResponse[] = [];
      newCardTitle: string = '';
      newCardDescription: string = '';

      constructor(private _matDialog:MatDialog,private cdr: ChangeDetectorRef){
        this.route.params.subscribe((params) => {
          this.BoardId = +params['boardId'] || 0
          this.loadBoard();
        })
      }

      loadBoard(){
        this.boardService.GetBoardID(this.BoardId).subscribe({
          next:(data) => {
            this.board = data
          },
          error:(err) => {
            console.error('Error al obtener el board:', err);

          }
        })
      }
      //card modal 
      AbrirModalCreate(listId: number):void{
        const dialogRef = this._matDialog.open(CreateCardComponent,{
          data:{listId}
        });
        dialogRef.afterClosed().subscribe((createCard:CardDtoResponse) => {
          if(createCard && this.board?.lists){
            this.board.lists.find(list => 
              list.listId === createCard.listId)?.cards.unshift(createCard)
              this.cdr.detectChanges(); 
          }
          this.cdr.detectChanges(); 
        })
      }
      AbrirModalUpdate(card:CardDtoResponse):void{
        const dialogRef = this._matDialog.open(UpdateCardComponent,{
          data:card
        })
        dialogRef.afterClosed().subscribe((updateCard:CardDtoResponse) => {
          if(updateCard && this.board?.lists){
            this.board.lists.forEach(list => {
              list.cards = list.cards.map(c => c.cardId == updateCard.cardId? updateCard : c)
            })
            this.cdr.detectChanges();
          }
        })
      }
      AbrirModalDelete(card:CardDtoResponse):void{
        const dialogRef = this._matDialog.open(DeleteCardComponent,{
          data: card
        })
        dialogRef.afterClosed().subscribe((deleteCard:CardDtoResponse) =>{
          if(deleteCard && this.board?.lists){
            this.board.lists.forEach(list => {
              list.cards = list.cards.filter(c => c.cardId !== deleteCard.cardId)
            })
            this.cdr.detectChanges();

          }
        })
      }
      //lista modal 
      AbrirModalCreateLista(BoardId: number):void{
        const dialogRef = this._matDialog.open(CreateListaComponent,{
          data:{BoardId }
        });
        dialogRef.afterClosed().subscribe((createLista:ListaResponse) => {
          if(createLista && this.board?.lists){
            this.board.lists.push(createLista)
              this.cdr.detectChanges(); 
          }
          this.cdr.detectChanges(); 
        })
      }
      AbrirModalUpdateLista(lista:ListaResponse):void{
        const dialogRef = this._matDialog.open(UpdateListaComponent,{
          data:lista
        })
        dialogRef.afterClosed().subscribe((updateLista:ListaResponse) => {
          if(updateLista && this.board.lists ){
            this.board.lists = this.board.lists.map(l => 
              l.listId == updateLista.listId? {...l, nombre:updateLista.nombre}: l
            )
            this.cdr.detectChanges();
          }
        })
        }
        
      AbrirModalDeleteLista(lista:ListaResponse):void{
        const dialogRef = this._matDialog.open(DeleteListaComponent,{
          data:lista
        })
        dialogRef.afterClosed().subscribe((deleteLista:ListaResponse) => {
          if(deleteLista && this.board.lists){
            this.board.lists = this.board.lists.filter(l => l.listId !== deleteLista.listId
            )
            this.cdr.detectChanges();

          }
        })
      }

      //drag and drop 
      connectedDropLists(currentListId: number):string[]{
        if(!this.board || !this.board.lists) return []
        return this.board.lists
          .filter(list => list.listId !== currentListId)
          .map(list => 'list-' + list.listId)
      }

      drop(event: CdkDragDrop<CardDtoResponse[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );
        }
        this.cdr.detectChanges();
      }
      
      trackByCardId(index: number, card: any): any {
        return index;
      }

      getColor(tagNombre: string){
        switch(tagNombre){
           case 'error': return '#d73a4a';
           case 'documentación': return '#0366d6 ';
           case 'duplicado': return '#cfd3d7';
           case 'mejora': return '#a2eeef';
           case 'buen primer issue': return '#7057ff';
           case 'se necesita ayuda': return '#008672 ';
           case 'inválido': return '#e4e669 ';
           case 'pregunta': return '#d876e3';
           case 'no se arreglará': return '#b60205 ';
           case 'necesita revisión': return '#fbca04';
           default: return  'gray';
        }
      }
      colorNombre(tagNombre: string){
        switch(tagNombre){
           case 'error': return 'white';
           case 'documentación': return 'white';
           case 'duplicado': return 'black';
           case 'mejora': return 'black';
           case 'buen primer issue': return 'white';
           case 'se necesita ayuda': return 'white';
           case 'inválido': return 'black';
           case 'pregunta': return 'white';
           case 'no se arreglará': return 'white ';
           case 'necesita revisión': return 'white';
           default: return  'gray';
        }
      }
      
}
