import { Categoria } from './../../../models/categoria';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

  constructor(private service: CategoriaService, private router: Router) { }

  listaCategorias = new Observable<Categoria[]>();

  categoriaAtualDeletada: Categoria = new Categoria({});

  msgRetorno = new Subject<boolean>();

  ngOnInit(): void
  {
    this.list();
  }

  list()
  {
    this.listaCategorias = this.service.getCategorias();
  }

  delete(id?: number)
  {
    if (!id)
    {
      return;
    }
    this.service.deleteCategoria(id || 0).subscribe(
      (resp) =>
      {
        this.categoriaAtualDeletada.idCategoria = id;
        this.msgRetorno.next(true);
        resp ? this.list() : '';
      }
        // se a resposta for verdadeira, executa this.list, se não, executa o ''
    );
  }

  toggleAtivo(id?: number)
   {
    console.log(id);
    if(!id) {
      return;
    }
    this.service.toggleAtivo(id || 0)
        .subscribe((resp) => resp ? this.list() : '');
  }
}
