import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from './list-item-types';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [NgIf],
  template: `
    <button class="absolute top-5 right-5" (click)="toggleIsSelected()">
      <svg
        fill="#fff"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/1999/xlink"
        width="20px"
        height="20px"
        viewBox="0 0 528.899 528.899"
        xml:space="preserve"
      >
        <g>
          <path
            d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
          c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
          C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
          L27.473,390.597L0.3,512.69z"
          />
        </g>
      </svg>
    </button>

    <button class="absolute top-5 right-14" (click)="handleDelete()">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="20px"
        height="20px"
        viewBox="0 0 109.484 122.88"
        enable-background="new 0 0 109.484 122.88"
        xml:space="preserve"
        fill="white"
      >
        <g>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"
          />
        </g>
      </svg>
    </button>

    <div>
      <span class="font-semibold text-white">#{{ item.category }}</span>
    </div>
    <div>
      Task:
      <span *ngIf="!isSelected; else editTemplate" class="font-medium">{{
        item.name
      }}</span>
      <ng-template #editTemplate>
        <input
          type="text"
          name="update-name-input"
          id="update-name-input"
          value="{{ item.name }}"
          class="text-neutral-950 border-none rounded-md px-2 outline-gray-400 ml-1"
          (blur)="handleUpdate(updateNameInput.value)"
          (keyup.enter)="handleUpdate(updateNameInput.value)"
          #updateNameInput
        />
      </ng-template>
    </div>

    <button
      class="p-2 rounded-xl text-white font-semibold mt-3"
      [class]="item.done ? 'bg-green-500' : 'bg-red-600'"
      (click)="handleClickToggle()"
    >
      {{ item.done ? 'Finished' : 'Unfinished' }}
    </button>
  `,
})
export class ListItemComponent {
  @Input() item!: Item;
  @Output() toggleState = new EventEmitter<number>();
  @Output() submit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<number>();

  isSelected = false;

  toggleIsSelected() {
    this.isSelected = !this.isSelected;
  }

  handleClickToggle() {
    this.toggleState.emit(this.item.id);
  }

  handleUpdate(updatedName: string) {
    this.submit.emit(updatedName);
  }

  handleDelete() {
    this.delete.emit(this.item.id);
  }
}
