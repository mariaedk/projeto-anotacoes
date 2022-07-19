import { Observable, Subject } from 'rxjs';
import { NotasService } from './../../../services/notas.service';
import { Nota } from './../../../models/nota';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anotacoes-modal-delete',
  templateUrl: './anotacoes-modal-delete.component.html',
  styleUrls: ['./anotacoes-modal-delete.component.scss']
})
export class AnotacoesModalDeleteComponent implements OnInit {

  @Input() // vem do componente pai (anotacoes-list)
  notaDel = new Nota({});

  @Input() // vai ser a resposta se deu certo o delete ou nao
  statusDelete = new Subject<boolean>();

  constructor(private service: NotasService) { }

  ngOnInit(): void { }

  delete(id?: number)
  {
    if (!id)
    {
      return;
    }
    this.service.deleteNota(id || 0).subscribe(
      resp => {
        if (resp)
        {
          this.updateStatus(true);
        }
        else
        {
          this.updateStatus(false);
        }
      }
    );
  }

  deleteConfirm(nota: Nota)
  {
    if (nota)
    {
      this.notaDel = nota;
    }
  }

  updateStatus(status: boolean)
  {
    this.notaDel = new Nota({});
    this.statusDelete.next(status);
  }
}
