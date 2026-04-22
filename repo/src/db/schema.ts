export interface Category {
  id: string;
  name: string;
  emoji: string;
  createdAt: number;
}

export interface Transaction {
  id: string;
  categoryId: string;
  amount: number;
  note?: string;
  timestamp: number;
  createdAt: number;
}

export interface Settings {
  id: 'singleton';
  currency: string;
  unlocked: boolean;
  reminderEnabled: boolean;
  reminderTime: string;
  locale: string;
  createdAt: number;
  updatedAt: number;
}