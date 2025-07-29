import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { BoardResponse } from '../interfaces/Board/BoardResponse';

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

}
