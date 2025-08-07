import { Component, inject } from '@angular/core';
import { ListItemComponent } from './list-item.component';
import { ListItemsService } from './list-items.service';
import { Item } from './list-item-types';
import { NgFor, NgIf } from '@angular/common';
import { AddPanelComponent } from './add-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div
      class="w-full flex flex-col justify-center items-center ld:max-w-150 max-w-80"
      *ngIf="success; else messageTemplate"
    >
      <app-add-panel
        [class]="commonStyles"
        (submit)="addItem($event)"
      ></app-add-panel>
      <app-list-item
        class="{{ commonStyles }} flex flex-col gap-y-2 relative"
        *ngFor="let item of items"
        [item]="item"
        (toggleState)="toggleState($event)"
        (submit)="updateItem(item.id, $event)"
        (delete)="deleteItem($event)"
      ></app-list-item>
    </div>

    <ng-template #messageTemplate>
      <p>{{ message }}</p>
    </ng-template>
  `,
  imports: [ListItemComponent, NgFor, NgIf, AddPanelComponent],
})
export class AppComponent {
  private listItemService = inject(ListItemsService);

  items: Item[] = [];
  message: string = '';
  success: boolean = false;
  commonStyles = 'bg-neutral-800 text-gray-100 mb-5 w-full rounded-xl p-4';

  async getAllItems() {
    const response = await this.listItemService.getAll();
    if (!response.success && response.message) {
      this.message = response.message;
      this.success = false;
      return;
    }

    if (response.result) {
      this.items = response.result;
      this.success = true;
      this.message = '';
    }
  }

  async ngOnInit() {
    this.message = 'Loading....';
    this.getAllItems();
  }

  async addItem({ name, category }: { name: string; category: string }) {
    const response = await this.listItemService.add(name, category);
    if (!response.success && response.message) {
      this.message = response.message;
      this.success = false;
      return;
    }

    this.success = true;
    this.getAllItems();
  }

  async updateItem(id: number, updatedName: string) {
    const response = await this.listItemService.update(id, updatedName);
    if (!response.success && response.message) {
      this.message = response.message;
      this.success = false;
      return;
    }

    this.success = true;
    this.items = this.items.map((item) => {
      if (item.id === id) {
        item.name = updatedName;
      }

      return item;
    });

    alert('Success');
  }

  async deleteItem(id: number) {
    const response = await this.listItemService.delete(id);
    if (!response.success && response.message) {
      this.message = response.message;
      return;
    }

    this.success = true;
    this.items = this.items.filter((item) => item.id !== id);
  }

  async toggleState(id: number) {
    const response = await this.listItemService.toggleState(id);
    if (!response.success && response.message) {
      this.message = this.message;
      this.success = false;
      return;
    }

    this.success = true;

    this.items = this.items.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
      }

      return item;
    });
  }
}
