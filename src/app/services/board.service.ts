import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { BoardResponse } from '../interfaces/Board/BoardResponse';
import { BoardRequest } from '../interfaces/Board/BoardRequest';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private http = inject(HttpClient)
  private baseUrl = appsettings.baseUrl
  constructor() { }

  GetBoard():Observable<BoardResponse[]>{
    return this.http.get<BoardResponse[]>(`${this.baseUrl}Board`)
  }
  GetBoardID(boardId:number):Observable<BoardResponse>{
    return this.http.get<BoardResponse>(`${this.baseUrl}Board/${boardId}`)
  }
  GetBoardUpdate(boardId:number,Board:BoardRequest):Observable<BoardRequest>{
    return this.http.put<BoardResponse>(`${this.baseUrl}Board/UpdateBoard/${boardId}`,Board)
  }
}
