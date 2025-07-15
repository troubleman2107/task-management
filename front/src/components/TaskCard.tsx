import { Task } from '@/types/task';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PriorityBadge } from '@/components/PriorityBadge';
import { StatusBadge } from '@/components/StatusBadge';
import { 
  Calendar, 
  Edit3, 
  Trash2, 
  Check, 
  Clock,
  RotateCcw 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && !task.isCompleted;

  return (
    <Card className={cn(
      'task-card-hover border-l-4 transition-all duration-300',
      task.isCompleted ? 'opacity-80 bg-muted/30' : 'bg-card',
      isOverdue && 'border-l-destructive bg-destructive/5',
      !isOverdue && task.priority === 'High' && 'border-l-priority-high',
      !isOverdue && task.priority === 'Medium' && 'border-l-priority-medium',
      !isOverdue && task.priority === 'Low' && 'border-l-priority-low'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-semibold text-lg leading-tight',
              task.isCompleted && 'line-through text-muted-foreground'
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                'text-sm text-muted-foreground mt-1 line-clamp-2',
                task.isCompleted && 'line-through'
              )}>
                {task.description}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <PriorityBadge priority={task.priority} />
            <StatusBadge isCompleted={task.isCompleted} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className={cn(
                isOverdue && !task.isCompleted && 'text-destructive font-medium'
              )}>
                {formatDate(task.dueDate)}
              </span>
              {isOverdue && !task.isCompleted && (
                <Badge variant="destructive" className="ml-1 text-xs">
                  Overdue
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Created {formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleComplete(task.id)}
              className={cn(
                'h-8 w-8 p-0',
                task.isCompleted && 'text-status-completed hover:text-status-completed'
              )}
            >
              {task.isCompleted ? (
                <RotateCcw className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};