import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardDtoResponse } from '../../../interfaces/Card/CardDtoResponse';
import { CardService } from '../../../services/card.service';
import { CardDtoRequest } from '../../../interfaces/Card/CardDtoRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagDtoResponse } from '../../../interfaces/Tag/TagDtoResponse';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-update-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-card.component.html',
  styleUrl: './update-card.component.css'
})
export class UpdateCardComponent {
  cardId: number = 0;
  listId: number = 0;
  title: string = '';
  descripcion: string = '';
  selectedTagId: number | null = null;
  tags: TagDtoResponse[] = [];
  private cardService = inject(CardService);
  private tagService  = inject(TagService);

  constructor(
    private _matDialogRef: MatDialogRef<UpdateCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CardDtoResponse
  ) {
    this.cardId = data.cardId;
    this.title = data.title;
    this.descripcion = data.descripcion;
    this.listId = data.listId;
    this.selectedTagId = data.tag?.id ?? null;
  }

  ngOnInit() {
    this.tagService.GetTag().subscribe(tags => {
      this.tags = tags;
    });
  }
  updateCard() {
    const cardUpdate: CardDtoRequest = {
      title: this.title,
      descripcion: this.descripcion,
      listId: this.listId,
      tagId: this.selectedTagId
    };

    const selectedTag = this.tags.find(t => t.id === this.selectedTagId);

    const updatedCard: CardDtoResponse = {
      cardId: this.cardId,
      title: this.title,
      descripcion: this.descripcion,
      listId: this.listId,
      tag: selectedTag ? { ...selectedTag } : null
 
    };

    this.cardService.UpdateCard(this.cardId, cardUpdate).subscribe(() => {
      this._matDialogRef.close(updatedCard);
    });
  }
}
