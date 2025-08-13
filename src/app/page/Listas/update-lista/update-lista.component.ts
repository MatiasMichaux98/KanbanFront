import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaResponse } from '../../../interfaces/Lista/ListaResponse';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../../../services/lista.service';
import { ListaRequest } from '../../../interfaces/Lista/ListaRequest';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-lista',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './update-lista.component.html',
  styleUrl: './update-lista.component.css'
})
export class UpdateListaComponent {
  listId: number = 0;
  nombre: string = '';
  Order: number = 0;
  BoardId: number = 0;

  private route = inject(ActivatedRoute)
  private  listaService= inject(ListaService)

  constructor(private _matDialogRef:MatDialogRef<UpdateListaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListaResponse
  ){
    this.listId = data.listId
    this.nombre = data.nombre
  }
  submit(){
    const listaUpdate : ListaRequest = {
      listId :this.listId,
      nombre :this.nombre,
      BoardId: this.BoardId
    }

    const UpdateLista : ListaResponse = {
      listId :this.listId,
      BoardId : this.BoardId,
      nombre : this.nombre,
      Order: this.Order,
      cards: []
    }
    this.listaService.UpdateLista(this.listId, listaUpdate).subscribe(() => {
      this._matDialogRef.close(UpdateLista)
    })
  }
}
