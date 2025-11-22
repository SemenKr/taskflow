export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

export interface TodolistType {
  id: string;
  title: string;
  filter: FilterType;
}

export interface TasksStateType {
  [key: string]: TaskType[];
}

export type FilterType = 'all' | 'active' | 'completed';
