import { Routes } from '@angular/router';
import { BoardComponent } from './page/Boards/board/board.component';
import { BoardIDComponent } from './page/Boards/board-id/board-id.component';
import { BoardUpdateComponent } from './page/Boards/board-update/board-update.component';
import { BoardDeleteComponent } from './page/Boards/board-delete/board-delete.component';

export const routes: Routes = [
    {
      path: 'board',
      component: BoardComponent,
      children: [
        { path: ':boardId', component: BoardIDComponent },
        { path: 'updateboard/:boardId', component: BoardUpdateComponent },
        { path: 'deleteboard/:boardId', component: BoardDeleteComponent },
      ],
    },
  ];