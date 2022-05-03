import { Subject } from 'rxjs';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../models/categoria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.scss']
})
export class CategoriaAddComponent implements OnInit {

  formCategoria: Categoria = new Categoria({});

  msgRetorno = new Subject<boolean>();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void
  {

  }

  save()
  {
    this.categoriaService.postCategoria(this.formCategoria).subscribe(
      (categoria) => {
        if (categoria.idCategoria)
        {
          this.formCategoria = categoria;
          this.msgRetorno.next(true);
        }
      }
    )
  }

}
