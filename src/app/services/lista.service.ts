import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ListaResponse } from '../interfaces/Lista/ListaResponse';

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
}
