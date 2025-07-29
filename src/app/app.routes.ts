import { Routes } from '@angular/router';
import { BoardComponent } from './page/Boards/board/board.component';
import { BoardIDComponent } from './page/Boards/board-id/board-id.component';

export const routes: Routes = [

    { path: 'board', component: BoardComponent },
    { path: 'board/:boardId', component: BoardIDComponent },
];
