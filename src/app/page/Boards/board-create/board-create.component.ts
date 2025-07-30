import { Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { BoardRequest } from '../../../interfaces/Board/BoardRequest';
import { BoardCreateRequest } from '../../../interfaces/Board/BoardCreateRequest';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './board-create.component.html',
  styleUrl: './board-create.component.css'
})
export class BoardCreateComponent {

  private BoardServide  = inject(BoardService)

  constructor(private _matDialogRef:MatDialogRef<BoardCreateComponent>){}
  newBoard : BoardCreateRequest ={
    nombre: '',
    boardId: 0
  }

  createBoard(){
    this.BoardServide.BoardCreate(this.newBoard).subscribe((createBoard: BoardResponse)=> {
      this._matDialogRef.close(createBoard)
    })
  }

}
