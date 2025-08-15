import { Routes } from '@angular/router';
import { BoardComponent } from './page/Boards/board/board.component';
import { BoardIDComponent } from './page/Boards/board-id/board-id.component';
import { BoardUpdateComponent } from './page/Boards/board-update/board-update.component';
import { BoardDeleteComponent } from './page/Boards/board-delete/board-delete.component';
import { HomeComponent } from './page/home/home.component';
import { MainComponent } from './page/main/main.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  {
      path: 'board',
      component: BoardComponent,
      children: [
        {path: '' , component: MainComponent},
        { path: ':boardId', component: BoardIDComponent },
        { path: 'updateboard/:boardId', component: BoardUpdateComponent },
        { path: 'deleteboard/:boardId', component: BoardDeleteComponent },
        //home
      ],
    },
  ];