import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDtoRequest } from '../../../interfaces/Card/CardDtoRequest';
import { CardService } from '../../../services/card.service';
import { CardDtoResponse } from '../../../interfaces/Card/CardDtoResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../../services/tag.service';
import { TagDtoResponse } from '../../../interfaces/Tag/TagDtoResponse';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent {
  private CardService = inject(CardService)
  private tagService = inject(TagService);

  selectedTagId: number | null = null;
  tags: any[] = [];
  constructor(private _matDialogRef:MatDialogRef<CreateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {listId: number}
  ){
    this.listId = data.listId

  }
  ngOnInit(){
    this.loadTag()
  }
  loadTag():void{
    this.tagService.GetListas().subscribe({
      next: (response: TagDtoResponse[]) => {
        this.tags = response;
      },
      error: (err) => {
        console.error('Error al obtener las etiquetas:', err);
      }
    });
  }


  listId!:number;
  title = '';
  description = '';


  createCard(){
    const newCard = {
      title : this.title,
      descripcion  : this.description ,
      listId : this.listId,
      tagId: this.selectedTagId
    }
    this.CardService.CreateCard(newCard).subscribe({
      next: (createCard: CardDtoResponse) => {
        this._matDialogRef.close(createCard)
      }
    })
  }
}
