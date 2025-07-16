import { Task, TaskFormData, TaskFilters } from '@/types/task';

const API_URL = 'http://localhost:3001/tasks';

export class TaskService {
  static async toggleTaskCompletion(id: number): Promise<Task> {
    // Fetch current task
    const task = await this.getTask(id);
    // Toggle isCompleted
    const updatedTask = await this.updateTask(id, { isCompleted: !task.isCompleted });
    return updatedTask;
  }
  static async getTasks(): Promise<Task[]> {
    const res = await fetch(API_URL);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }

  static async getTask(id: number): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  }

  static async createTask(taskData: TaskFormData): Promise<Task> {
    // Ensure required fields are present
    const payload = {
      ...taskData,
      status: taskData.status || 'pending',
      priority: taskData.priority || 'Low',
    };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.json();
  }

  static async updateTask(id: number, updates: Partial<TaskFormData>): Promise<Task> {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    return res.json();
  }

  static async deleteTask(id: number): Promise<boolean> {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return res.status === 204;
  }

  // Filtering and sorting can be done client-side after fetching tasks
  static filterTasks(tasks: Task[], filters: TaskFilters, searchQuery?: string): Task[] {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        (task.title?.toLowerCase?.() || '')?.includes(query) ||
        (task.description?.toLowerCase?.() || '')?.includes(query)
      );
    }

    // Apply priority filter
    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(task =>
        filters.status === 'completed' ? task.isCompleted : !task.isCompleted
      );
    }

    // Apply due date filter
    if (filters.dueDateRange) {
      const { from, to } = filters.dueDateRange;
      filtered = filtered.filter(task => {
        const taskDate = new Date(task.dueDate);
        const fromDate = new Date(from);
        const toDate = new Date(to);
        return taskDate >= fromDate && taskDate <= toDate;
      });
    }

    return filtered;
  }

  static sortTasks(tasks: Task[], sortBy: 'dueDate' | 'priority' | 'createdAt', order: 'asc' | 'desc' = 'asc'): Task[] {
    return [...tasks].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'dueDate': {
          console.log('dueDate sort', a.dueDate, b.dueDate);
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        }
        case 'priority': {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        }
        case 'createdAt': {
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        }
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }
}