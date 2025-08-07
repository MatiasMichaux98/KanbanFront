import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { TagDtoResponse } from '../interfaces/Tag/TagDtoResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private http = inject(HttpClient)
  private baseUrl = appsettings.baseUrl

  constructor() { }
  GetListas(): Observable<TagDtoResponse[]> {
    return this.http.get<TagDtoResponse[]>(`${this.baseUrl}Tag`);
  }
  
}
