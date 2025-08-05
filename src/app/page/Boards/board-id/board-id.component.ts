import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCardComponent } from '../../Cards/create-card/create-card.component';
import { CardDtoResponse } from '../../../interfaces/Card/CardDtoResponse';
import { DeleteCardComponent } from '../../Cards/delete-card/delete-card.component';
import { ListaResponse } from '../../../interfaces/Lista/ListaResponse';
import { UpdateCardComponent } from '../../Cards/update-card/update-card.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board-id',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatMenuModule],
  templateUrl: './board-id.component.html',
  styleUrl: './board-id.component.css'
})
export class BoardIDComponent {
      private route = inject(ActivatedRoute);
      private boardService = inject(BoardService);
      BoardId: number = 0;
      board!: BoardResponse;
      lista!: ListaResponse;
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
}
