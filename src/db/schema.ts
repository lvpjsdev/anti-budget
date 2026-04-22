export interface Category {
  id: string;
  emoji: string;
  name: string;
}

export interface Transaction {
  id: string;
  categoryId: string;
  amount: number;
  date: string; // ISO date string
  createdAt: number;
}

export interface Settings {
  id: string;
  selectedCategoryId: string | null;
}

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'coffee', emoji: '☕', name: 'Coffee' },
  { id: 'delivery', emoji: '🧋', name: 'Delivery' },
  { id: 'taxi', emoji: '🚕', name: 'Taxi' },
  { id: 'vapes', emoji: '💨', name: 'Vapes' },
  { id: 'alcohol', emoji: '🍺', name: 'Alcohol' },
];
