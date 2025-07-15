import { useState, useEffect } from 'react';
import { Task, TaskFilters, TaskFormData } from '@/types/task';
import { TaskService } from '@/services/taskService';
import { TaskList } from '@/components/TaskList';
import { TaskForm } from '@/components/TaskForm';
import { TaskFilters as TaskFiltersComponent } from '@/components/TaskFilters';
import { TaskSearch } from '@/components/TaskSearch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  CheckSquare, 
  ListTodo, 
  Filter, 
  Search, 
  ArrowUpDown 
} from 'lucide-react';

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const tasksPerPage = 10;
  const { toast } = useToast();

  // Load tasks on component mount
  useEffect(() => {
    TaskService.getTasks().then(loadedTasks => {
      setTasks(loadedTasks);
    });
  }, []);

  // Apply filters, search, and sorting
  useEffect(() => {
    let result = TaskService.filterTasks(tasks, filters, searchQuery);
    result = TaskService.sortTasks(result, sortBy, sortOrder);
    setFilteredTasks(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [tasks, filters, searchQuery, sortBy, sortOrder]);

  const handleCreateTask = async (formData: TaskFormData) => {
    try {
      const newTask = await TaskService.createTask(formData);
      setTasks(prev => [...prev, newTask]);
      setShowForm(false);
      toast({
        title: 'Success',
        description: 'Task created successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateTask = async (formData: TaskFormData) => {
    if (!editingTask) return;
    
    try {
      const updatedTask = await TaskService.updateTask(Number(editingTask.id), formData);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ));
        setEditingTask(null);
        setShowForm(false);
        toast({
          title: 'Success',
          description: 'Task updated successfully!',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update task. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleToggleComplete = async (id: string) => {
    console.log('toggle',id)
    try {
      const updatedTask = await TaskService.toggleTaskCompletion(Number(id));
      console.log("updatedTask", updatedTask);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.id === id ? updatedTask : task
        ));
        toast({
          title: 'Success',
          description: `Task ${updatedTask.isCompleted ? 'completed' : 'reopened'}!`,
        });
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
      toast({
        title: 'Error',
        description: 'Failed to update task status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const success = await TaskService.deleteTask(Number(id));
      if (success) {
        setTasks(prev => prev.filter(task => task.id !== id));
        toast({
          title: 'Success',
          description: 'Task deleted successfully!',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setSortBy('dueDate');
    setSortOrder('asc');
  };

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (showForm) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <TaskForm
            task={editingTask || undefined}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={handleCancelForm}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="gradient-surface border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <CheckSquare className="h-8 w-8 text-primary" />
              Task Management System
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5" />
                Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TaskSearch
                onSearch={setSearchQuery}
                placeholder="Search tasks by title or description..."
              />
            </CardContent>
          </Card>

          {/* Sorting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ArrowUpDown className="h-5 w-5" />
                Sort
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={(value: typeof sortOrder) => setSortOrder(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ListTodo className="h-5 w-5" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => setShowForm(true)}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        {showFilters && (
          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onToggleComplete={handleToggleComplete}
          tasksPerPage={tasksPerPage}
        />
      </div>
    </div>
  );
};

export default Index;
