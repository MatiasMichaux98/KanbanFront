import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateCardComponent } from '../../Cards/create-card/create-card.component';
import { CardDtoResponse } from '../../../interfaces/Card/CardDtoResponse';

@Component({
  selector: 'app-board-id',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './board-id.component.html',
  styleUrl: './board-id.component.css'
})
export class BoardIDComponent {
      private route = inject(ActivatedRoute);
      private boardService = inject(BoardService);
      BoardId: number = 0;
      Board!: BoardResponse;
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
            this.Board = data
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
          if(createCard && this.Board?.lists){
            this.Board.lists.find(list => 
              list.listId === createCard.listId)?.cards.unshift(createCard)
          }
        })
      }
}
