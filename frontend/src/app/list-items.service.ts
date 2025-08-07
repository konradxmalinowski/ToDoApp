import { Injectable } from '@angular/core';
import { AddRemoveDeleteResponse, CategoriesResponse } from './list-item-types';

@Injectable({
  providedIn: 'root',
})
export class ListItemsService {
  private readonly URL = 'http://localhost:8080';

  async getAll() {
    try {
      const response: Response = await fetch(`${this.URL}/items`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: AddRemoveDeleteResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: 'Failed to get all list items' };
    }
  }

  async add(name: string, category: string) {
    try {
      const response: Response = await fetch(`${this.URL}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: AddRemoveDeleteResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }
      return { success: false, message: 'Failed to add new item' };
    }
  }

  async update(id: number, updatedName: string) {
    try {
      const response: Response = await fetch(`${this.URL}/items/${id}/name`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedName),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: AddRemoveDeleteResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: 'Failed to update item' };
    }
  }

  async delete(id: number) {
    try {
      const response: Response = await fetch(`${this.URL}/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: AddRemoveDeleteResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: 'Failed to remove item' };
    }
  }

  async toggleState(id: number) {
    try {
      const response: Response = await fetch(`${this.URL}/items/${id}/done`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: AddRemoveDeleteResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message,
        } as AddRemoveDeleteResponse;
      }
      return {
        success: false,
        message: 'Failed to toggle state',
      } as AddRemoveDeleteResponse;
    }
  }

  async getCategories() {
    try {
      const response: Response = await fetch(`${this.URL}/categories`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data: CategoriesResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, message: error.message };
      }

      return { success: false, message: 'Failed to get all categories' };
    }
  }
}
