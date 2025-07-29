import { Component, inject } from '@angular/core';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { ActivatedRoute } from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { BoardRequest } from '../../../interfaces/Board/BoardRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './board-update.component.html',
  styleUrl: './board-update.component.css'
})
export class BoardUpdateComponent {
  BoardId: number = 0;
  Board!: BoardResponse;
  nombre: string = '';


  private route = inject(ActivatedRoute)
  constructor(private boardService:BoardService){
        this.route.params.subscribe((params) => {
          console.log('Recibido param:', params);
          this.BoardId = +params['boardId'] || 0
        })
      }
      submit() {
        const boardUpdate: BoardRequest = {
          nombre: this.nombre
        };
      
        this.boardService.GetBoardUpdate(this.BoardId, boardUpdate).subscribe({
          next: (response) => {
            console.log('Board actualizado correctamente:', response);
          },
          error: (error) => {
            console.error('Error al actualizar board:', error);
          }
        });
      }
      
}