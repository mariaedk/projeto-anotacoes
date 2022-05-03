import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Nota } from 'src/app/models/nota';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-anotacoes-modal-save',
  templateUrl: './anotacoes-modal-save.component.html',
  styleUrls: ['./anotacoes-modal-save.component.scss']
})
export class AnotacoesModalSaveComponent implements OnInit {

  @Input()
  notaEdit = new Nota({});

  @Input()
  statusEdit = new Subject<boolean>();
  // quando alterar, vai atribuir esse valor ao monitoraSave

  categoriasList = new Observable<Categoria[]>();

  listaNotas$ = new Observable<Nota[]>();

  constructor(private notaService: NotasService,
              private categoriaService: CategoriaService) { }

  ngOnInit(): void
  {
    this.statusEdit.subscribe(
      resp => {
        if (!resp)
        {
          document.getElementById('btnModalSaveNotaCancel')?.click();
        }
      }
    );
  }

  getAllCategorias()
  {
    this.categoriasList = this.categoriaService.getCategorias();
  }

  update(nota: Nota)
  {
    if (nota)
    {
      this.notaService.updateNota(nota).subscribe(
        resp =>
        {
          if (resp)
          {
            console.log("modificado");
            this.updateStatus(true);
          }
          else
          {
            this.updateStatus(false);
          }
        }
      )
    }
  }

  updateStatus(status: boolean)
  {
    this.notaEdit = new Nota({});
    this.statusEdit.next(status);
  }

  cancelUpdate()
  {
    this.statusEdit.next(false);
  }

  getList()
  {
    this.listaNotas$ = this.notaService.getNotas();
  }

}
