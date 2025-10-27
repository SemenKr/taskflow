export interface Task {
  id: string;
  title: string;
  isDone: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
