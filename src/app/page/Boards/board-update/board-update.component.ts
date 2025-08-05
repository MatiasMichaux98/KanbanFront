import { Component, Inject, inject } from '@angular/core';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '../../../services/board.service';
import { BoardRequest } from '../../../interfaces/Board/BoardRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardUpdateRequest } from '../../../interfaces/Board/BoardUpdateRequest';

@Component({
  selector: 'app-board-update',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './board-update.component.html',
  styleUrl: './board-update.component.css'
})
export class BoardUpdateComponent {
  BoardId: number = 0;
  nombre: string = '';

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private boardService = inject(BoardService)
  constructor(private _matDialogRef:MatDialogRef<BoardUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data :BoardResponse
  ){
    this.BoardId = data.boardId
    this.nombre = data.nombre
  }
  submit() {
    const boardUpdate: BoardUpdateRequest = {
      boardId: this.BoardId,
      nombre: this.nombre
    };
    
    const UpdateBoard: BoardResponse = {
      boardId: this.BoardId,
      nombre: this.nombre,
      lists: []
    }
    this.boardService.BoardUpdate(this.BoardId, boardUpdate).subscribe(()=>{
      this._matDialogRef.close(UpdateBoard)
    });
  }

  

      
}