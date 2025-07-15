import { TaskFilters as TaskFiltersType, TaskPriority } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X, Calendar } from 'lucide-react';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
  onClearFilters: () => void;
}

export const TaskFilters = ({ filters, onFiltersChange, onClearFilters }: TaskFiltersProps) => {
  const handleFilterChange = (key: keyof TaskFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleDateRangeChange = (field: 'from' | 'to', value: string) => {
    const currentRange = filters.dueDateRange || { from: '', to: '' };
    handleFilterChange('dueDateRange', {
      ...currentRange,
      [field]: value
    });
  };

  const hasActiveFilters = !!(
    filters.priority || 
    filters.status || 
    filters.dueDateRange?.from || 
    filters.dueDateRange?.to
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto h-8 px-3"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={filters.priority || 'all'}
              onValueChange={(value) => 
                handleFilterChange('priority', value === 'all' ? undefined : value as TaskPriority)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={filters.status || 'all'}
              onValueChange={(value) => 
                handleFilterChange('status', value === 'all' ? undefined : value as 'completed' | 'pending')
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Due Date Range</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="relative">
              <Input
                type="date"
                value={filters.dueDateRange?.from || ''}
                onChange={(e) => handleDateRangeChange('from', e.target.value)}
                placeholder="From date"
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <div className="relative">
              <Input
                type="date"
                value={filters.dueDateRange?.to || ''}
                onChange={(e) => handleDateRangeChange('to', e.target.value)}
                placeholder="To date"
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="pt-2 border-t">
            <div className="flex flex-wrap gap-2">
              {filters.priority && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  Priority: {filters.priority}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('priority', undefined)}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {filters.status && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  Status: {filters.status}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('status', undefined)}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              {filters.dueDateRange && (filters.dueDateRange.from || filters.dueDateRange.to) && (
                <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                  Date Range
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFilterChange('dueDateRange', undefined)}
                    className="h-4 w-4 p-0 ml-1"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};