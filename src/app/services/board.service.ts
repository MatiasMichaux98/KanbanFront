import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { BoardResponse } from '../interfaces/Board/BoardResponse';
import { BoardRequest } from '../interfaces/Board/BoardRequest';
import { BoardUpdateRequest } from '../interfaces/Board/BoardUpdateRequest';
import { BoardCreateRequest } from '../interfaces/Board/BoardCreateRequest';

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
  BoardUpdate(boardId:number,Board:BoardUpdateRequest):Observable<BoardResponse>{
    return this.http.put<BoardResponse>(`${this.baseUrl}Board/UpdateBoard/${boardId}`,Board)
  }
  BoardDelete(boardId:number):Observable<BoardResponse>{
    return this.http.delete<BoardResponse>(`${this.baseUrl}Board/DeleteBoard/${boardId}`)
  }
  BoardCreate(Board:BoardCreateRequest):Observable<BoardResponse>{
    return this.http.post<BoardResponse>(`${this.baseUrl}Board/CreateBoard`,Board)
  }
  

}
