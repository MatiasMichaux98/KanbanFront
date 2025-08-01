import { Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-board-id',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './board-id.component.html',
  styleUrl: './board-id.component.css'
})
export class BoardIDComponent {
      
      BoardId: number = 0;
      Board!: BoardResponse;
      nombre ="";
      private route = inject(ActivatedRoute)
      constructor(private boardService:BoardService){
        this.route.params.subscribe((params) => {
          console.log('Recibido param:', params);
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
}
