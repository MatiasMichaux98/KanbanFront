import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaService } from '../../../services/lista.service';
import { ListaRequest } from '../../../interfaces/Lista/ListaRequest';
import { ListaResponse } from '../../../interfaces/Lista/ListaResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-lista',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-lista.component.html',
  styleUrl: './create-lista.component.css'
})
export class CreateListaComponent {

  private listaService  = inject(ListaService)

  constructor(
    private _matDialogRef: MatDialogRef<CreateListaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { BoardId: number }
  ) {
    this.newLista.BoardId = data.BoardId;
  }
  newLista: ListaRequest = {
    nombre: '',
    listId: 0,
    BoardId: 0
  };

  createLista(){
    this.listaService.CreateLista(this.newLista).subscribe((createLista: ListaResponse) => {
      this._matDialogRef.close(createLista)
    } )
  }
}
