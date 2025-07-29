import { Component, inject } from '@angular/core';
import { BoardService } from '../../../services/board.service';
import { BoardResponse } from '../../../interfaces/Board/BoardResponse';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgFor],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  private boardService = inject(BoardService)

  boards : BoardResponse[] = [];
  constructor(){}

  ngOnInit(){
    this.GetBoards();
  }
  GetBoards(){
    this.boardService.GetBoard().subscribe((data: BoardResponse[]) => {
      this.boards = data;
    })
  }
}
