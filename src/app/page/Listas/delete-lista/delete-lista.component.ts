import { Component, Inject, inject } from '@angular/core';
import { ListaService } from '../../../services/lista.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListaResponse } from '../../../interfaces/Lista/ListaResponse';

@Component({
  selector: 'app-delete-lista',
  standalone: true,
  imports: [],
  templateUrl: './delete-lista.component.html',
  styleUrl: './delete-lista.component.css'
})
export class DeleteListaComponent {

  private listaService = inject(ListaService)
  listaId : number = 0
  constructor(private _matDialogRef:MatDialogRef<DeleteListaComponent>,
    @Inject (MAT_DIALOG_DATA) public data: ListaResponse 
  ){
    this.listaId = data.listId
  }

  deleteLista(){
    this.listaService.deleteLista(this.listaId).subscribe((deletelista: ListaResponse)=>{
      this._matDialogRef.close(this.data)
      console.log('contenido',this.data)
    })
  }
}
