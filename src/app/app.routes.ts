import { Routes } from '@angular/router';
import { BoardComponent } from './page/Boards/board/board.component';
import { BoardIDComponent } from './page/Boards/board-id/board-id.component';
import { BoardUpdateComponent } from './page/Boards/board-update/board-update.component';
import { BoardDeleteComponent } from './page/Boards/board-delete/board-delete.component';

export const routes: Routes = [
    //boards
    { path: 'board', component: BoardComponent },
    { path: 'board/:boardId', component: BoardIDComponent },
    { path: 'board/updateboard/:boardId', component: BoardUpdateComponent },
    { path: 'board/deleteboard/:boardId', component: BoardDeleteComponent },
];
