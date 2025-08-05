import { Component, Inject, inject } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDtoResponse } from '../../../interfaces/Card/CardDtoResponse';

@Component({
  selector: 'app-delete-card',
  standalone: true,
  imports: [],
  templateUrl: './delete-card.component.html',
  styleUrl: './delete-card.component.css'
})
export class DeleteCardComponent {
  private cardService = inject(CardService)
  cardId: number = 0
  constructor(private _matDialogRef:MatDialogRef<DeleteCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardDtoResponse
  ){
    console.log('DATA en modal:', data);
    this.cardId = data.cardId
  }

  deleteCard(){
    this.cardService.DeleteCard(this.cardId).subscribe((deleteCard: CardDtoResponse) => {
      this._matDialogRef.close(this.data);

    })
  }
}
