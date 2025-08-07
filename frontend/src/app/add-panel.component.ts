import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AddPanelResponse, Category } from './list-item-types';
import { ListItemsService } from './list-items.service';

@Component({
  selector: 'app-add-panel',
  standalone: true,
  imports: [CommonModule, NgFor],
  template: `
    <div
      *ngIf="!message; else messageTemplate"
      class="w-full flex flex-col gap-y-3 items-center"
    >
      <label [class]="labelStyles">
        Name:
        <input
          type="text"
          id="new-item-name"
          name="new-item-name"
          #newItemNameInput
          (keyup.enter)="
            handleAddItem(newItemNameInput.value, newItemCategoryInput.value);
            newItemCategoryInput.value = '';
            newItemNameInput.value = ''
          "
          [class]="inputStyles"
      /></label>
      <label [class]="labelStyles">
        Category:
        <input
          type="text"
          id="new-item-category"
          name="new-item-category"
          list="datalist-categories"
          #newItemCategoryInput
          (keyup.enter)="
            handleAddItem(newItemNameInput.value, newItemCategoryInput.value);
            newItemCategoryInput.value = '';
            newItemNameInput.value = ''
          "
          [class]="inputStyles"
      /></label>
      <datalist id="datalist-categories">
        <option *ngFor="let category of categories" [value]="category.name">
          {{ category.name }}
        </option>
      </datalist>
      <button
        (click)="
          handleAddItem(newItemNameInput.value, newItemCategoryInput.value);
          newItemCategoryInput.value = '';
          newItemNameInput.value = ''
        "
        class="px-4 py-2 rounded-xl text-white border border-neutral-700 hover:bg-neutral-700 hover:transition transition"
      >
        Add
      </button>
    </div>

    <ng-template #messageTemplate>
      <p>{{ message }}</p>
    </ng-template>
  `,
})
export class AddPanelComponent {
  private listItemService = inject(ListItemsService);
  @Output() submit = new EventEmitter<AddPanelResponse>();

  message: string = '';
  categories: Category[] = [];

  inputStyles =
    'flex-1 rounded-lg px-4 py-2 bg-neutral-800 text-white border border-neutral-700 focus:border-blue-500 focus:transition transition';
  labelStyles = 'w-full flex flex-col items-center justify-center gap-y-3';

  async ngOnInit() {
    await this.getCategories();
  }

  async getCategories() {
    const response = await this.listItemService.getCategories();
    if (!response.success && response.message) {
      this.message = response.message;
      return;
    }

    if (response.result) {
      this.categories = response.result;
      this.message = '';
    }
  }

  handleAddItem(name: string, category: string) {
    if (!name.trim().length || !category.trim().length) {
      alert('Name and category must be filled');
      return;
    }
    this.submit.emit({ name, category });
  }

  clearInputs() {}
}
