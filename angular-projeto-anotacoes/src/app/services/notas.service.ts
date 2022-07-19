import { Nota } from './../models/nota';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http: HttpClient) { }

  urlApiNotas = `${environment.urlApi}/notas`;

  getNotas()
  {
    return this.http.get<Nota[]>(this.urlApiNotas);
  }

  getNotaById(id: number)
  {
    return this.http.get<Nota>(`${this.urlApiNotas}/${id}`);
  }

  postNota(nota: Nota)
  {
    if (nota.idNota && nota.idNota > 0)
    {
      return this.updateNota(nota);
    }
    return this.http.post<Nota>(this.urlApiNotas, nota);
  }

  updateNota(nota: Nota)
  {
    return this.http.put<Nota>(this.urlApiNotas, nota);
  }

  deleteNota(id: number)
  {
    return this.http.delete<boolean>(`${this.urlApiNotas}/${id}`);
  }
}
