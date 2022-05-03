import { Categoria } from './../models/categoria';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient) { }

  urlApiCategoria = `${environment.urlApi}/categorias`;

  getCategorias()
  {
    return this.httpClient.get<Categoria[]>(this.urlApiCategoria);
  }

  getById(id: number)
  {
    return this.httpClient.get<Categoria>(`${this.urlApiCategoria}/${id}`);
  }

  postCategoria(categoria: Categoria)
  {
    return this.httpClient.post<Categoria>(this.urlApiCategoria, categoria);
  }

  updateCategoria(categoria: Categoria)
  {
    return this.httpClient.put<Categoria>(this.urlApiCategoria, categoria);
  }

  deleteCategoria(id: number)
  {
    return this.httpClient.delete<boolean>(`${this.urlApiCategoria}/${id}`);
  }

  toggleAtivo(id?: number) {
    return this.httpClient.put<boolean>(`${this.urlApiCategoria}/toggleAtivo`, id);
  }

}
