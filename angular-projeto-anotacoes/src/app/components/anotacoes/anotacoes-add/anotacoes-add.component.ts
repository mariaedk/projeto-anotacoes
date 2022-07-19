import { NotasService } from './../../../services/notas.service';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../models/categoria';
import { Nota } from './../../../models/nota';
import { Subject, Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anotacoes-add',
  templateUrl: './anotacoes-add.component.html',
  styleUrls: ['./anotacoes-add.component.scss']
})
export class AnotacoesAddComponent implements OnInit {

  @Input()
  status = new Subject<boolean>();

  @Input()
  notaInsert = new Nota({categoria: new Categoria({})});

  categoriasList = new Observable<Categoria[]>();

  constructor(private notaService: NotasService,
              private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.getAllCategorias();
  }

  getAllCategorias() {
    this.categoriasList = this.categoriaService.getCategorias();
  }

  save() {
    console.log(this.notaInsert);
    if(this.validate()) {
      this.notaService
          .postNota(this.notaInsert)
          .subscribe(
            (notaSaved) => {
              if(notaSaved.idNota)
                this.cancel();
            }
          )
    }
  }

  cancel() {
    this.status.next(false);
  }

  validate() {
    if(typeof this.notaInsert.categoria == 'undefined') {
      return false;
    }

    return true;
  }

}
