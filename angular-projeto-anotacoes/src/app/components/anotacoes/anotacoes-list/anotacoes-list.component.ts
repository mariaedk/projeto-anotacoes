import { NotasService } from './../../../services/notas.service';
import { Nota } from './../../../models/nota';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anotacoes-list',
  templateUrl: './anotacoes-list.component.html',
  styleUrls: ['./anotacoes-list.component.scss']
})
export class AnotacoesListComponent implements OnInit {

  listaNotas$ = new Observable<Nota[]>();

  notaAction = new Nota({});

  notaSaveCurrent = new Nota({});

  criando$ = new Subject<boolean>();
  criado$ = new Subject<boolean>();

  monitoraStatusAction$ = new Subject<boolean>();

  constructor(private service: NotasService) { }

  ngOnInit(): void
  {
    this.getList();
    this.criado$.subscribe((resp) => {
      this.criando$.next(resp);
      this.getList();
    });
    // registra no observable para ser atualziado no momento em que a variavel for alterada
    this.monitoraStatusAction$.subscribe(
      (resp) => {
          this.notaAction = new Nota({});
          this.getList();
        }
    )
  }

  getList()
  {
    this.listaNotas$ = this.service.getNotas();
  }

  newNota()
  {
    this.criando$.next(true);
  }

  confirmAction(nota: Nota)
  {
    if (nota)
    {
      this.notaAction = nota;
    }
  }
}
