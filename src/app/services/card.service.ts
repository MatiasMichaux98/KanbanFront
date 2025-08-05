import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { CardDtoResponse } from '../interfaces/Card/CardDtoResponse';
import { CardDtoRequest } from '../interfaces/Card/CardDtoRequest';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private http = inject(HttpClient)
  private baseUrl = appsettings.baseUrl

  constructor() { }
  
  GetCards():Observable<CardDtoResponse>{
     return this.http.get<CardDtoResponse>(`${this.baseUrl}Card`)
  }
  GetCardId(id:number):Observable<CardDtoResponse>{
    return this.http.get<CardDtoResponse>(`${this.baseUrl}Card/${id}`)
  }
  CreateCard(card:CardDtoRequest):Observable<CardDtoResponse>{
    return this.http.post<CardDtoResponse>(`${this.baseUrl}Card/CreateCard`,card)
  }
  UpdateCard(id:number,card:CardDtoRequest):Observable<CardDtoResponse>{
    return this.http.put<CardDtoResponse>(`${this.baseUrl}Card/UpdateCard/${id}`,card)
  }
  DeleteCard(id:number):Observable<CardDtoResponse>{
    return this.http.delete<CardDtoResponse>(`${this.baseUrl}Card/DeleteCard/${id}`)
  }
  
}
