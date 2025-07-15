import { TaskPriority } from '@/types/task';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: TaskPriority;
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const getPriorityStyles = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return 'priority-low';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        'text-xs font-medium px-2 py-1 rounded-full',
        getPriorityStyles(priority),
        className
      )}
    >
      {priority}
    </Badge>
  );
};