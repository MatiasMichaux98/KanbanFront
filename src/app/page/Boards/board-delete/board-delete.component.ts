import { Component, Inject, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoardUpdateComponent } from '../board-update/board-update.component';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';

@Component({
  selector: 'app-board-delete',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './board-delete.component.html',
  styleUrl: './board-delete.component.css'
})
export class BoardDeleteComponent {
  private boardService = inject(BoardService)
  BoardId: number = 0;

  constructor(private _matDialogRef:MatDialogRef<BoardUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data :BoardResponse
  ){
    this.BoardId = data.boardId
  }

  deleteBoard(){
    this.boardService.BoardDelete(this.BoardId).subscribe((deleteBoard :BoardResponse)=>{
        this._matDialogRef.close(this.data);
        console.log('contenido',this.data)
    })
  }
}
