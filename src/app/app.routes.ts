import { Routes } from '@angular/router';
import { BoardComponent } from './page/Boards/board/board.component';
import { BoardIDComponent } from './page/Boards/board-id/board-id.component';
import { BoardUpdateComponent } from './page/Boards/board-update/board-update.component';

export const routes: Routes = [

    { path: 'board', component: BoardComponent },
    { path: 'board/:boardId', component: BoardIDComponent },
    { path: 'board/updateboard/:boardId', component: BoardUpdateComponent },
];
