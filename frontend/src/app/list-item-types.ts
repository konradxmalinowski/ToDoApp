export type Item = {
  id: number;
  category: string;
  name: string;
  done: boolean;
};

export type AddRemoveDeleteResponse = {
  success: boolean;
  message?: string;
  result?: Item[];
};

export type CategoriesResponse = {
  success: boolean;
  message?: string;
  result?: Category[];
};

export type AddPanelResponse = {
  category: string;
  name: string;
};

export type Category = {
  id: number;
  name: string;
};
