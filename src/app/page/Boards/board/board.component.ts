import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BoardUpdateComponent } from '../board-update/board-update.component';
import { BoardDeleteComponent } from '../board-delete/board-delete.component';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  private boardService = inject(BoardService)

  boards : BoardResponse[] = [];
  constructor(private _matDialog:MatDialog, 
              private cdr: ChangeDetectorRef){}

  ngOnInit(){
    this.GetBoards();
  }
  GetBoards(){
    this.boardService.GetBoard().subscribe((data: BoardResponse[]) => {
      this.boards = data;
      console.log('cargando..',this.boards);
    })
  }
  
  abrirModalUpdated(board: BoardResponse):void{
    const dialogRef = this._matDialog.open(BoardUpdateComponent,{
      data:board
    });
    dialogRef.afterClosed().subscribe((updateBoard:BoardResponse)=> {
      if(updateBoard){
        this.boards = this.boards.map(b => 
          b.boardId == updateBoard.boardId ? updateBoard : b
        )
        this.cdr.detectChanges();
      }
    })
  }
  abrirModalDelete(board:BoardResponse):void{
    const dialogRef = this._matDialog.open(BoardDeleteComponent,{
      data : board
    });
    dialogRef.afterClosed().subscribe((deleteBoard:BoardResponse) => {
      if(deleteBoard){
        this.boards = this.boards.filter(b => b.boardId !== deleteBoard.boardId)
      }
    })
  
  }

}
