export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  priority?: TaskPriority;
  status?: 'completed' | 'pending';
  dueDateRange?: {
    from: string;
    to: string;
  };
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  status?: string;
  isCompleted?: boolean;
}