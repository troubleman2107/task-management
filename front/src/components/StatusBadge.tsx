import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  isCompleted: boolean;
  className?: string;
}

export const StatusBadge = ({ isCompleted, className }: StatusBadgeProps) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'text-xs font-medium px-2 py-1 rounded-full',
        isCompleted ? 'status-completed' : 'status-pending',
        className
      )}
    >
      {isCompleted ? 'Completed' : 'Pending'}
    </Badge>
  );
};