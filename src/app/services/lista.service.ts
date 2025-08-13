import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ListaResponse } from '../interfaces/Lista/ListaResponse';
import { ListaRequest } from '../interfaces/Lista/ListaRequest';

@Injectable({
  providedIn: 'root'
})
export class ListaService {
  private http = inject(HttpClient)
  private baseUrl = appsettings.baseUrl

  constructor() { }

  GetListas():Observable<ListaResponse>{
      return this.http.get<ListaResponse>(`${this.baseUrl}Lista`)
  }

  GetListaID(id:number):Observable<ListaResponse>{
    return this.http.get<ListaResponse>(`${this.baseUrl}Lista/${id}`)
  } 
  CreateLista(lista:ListaRequest):Observable<ListaResponse>{
    return this.http.post<ListaResponse>(`${this.baseUrl}Lista/CreateLista`,lista)
  }
  UpdateLista(id:number,lista:ListaRequest):Observable<ListaResponse>{
    return this.http.put<ListaResponse>(`${this.baseUrl}Lista/UpdateLista/${id}`,lista)
  }
  deleteLista(id:number):Observable<ListaResponse>{
    return this.http.delete<ListaResponse>(`${this.baseUrl}Lista/DeleteLista/${id}`)
  }
}
