import { Priority, TaskType } from '@/types/task';
import { AlertCircle, ArrowUp, ArrowDown, Minus, ChevronDown, BookOpen, Bug, CheckSquare, Layers } from 'lucide-react';

export const priorityConfig: Record<Priority, { label: string; icon: typeof ArrowUp; className: string }> = {
  critical: { label: 'Critical', icon: AlertCircle, className: 'text-priority-critical' },
  high: { label: 'High', icon: ArrowUp, className: 'text-priority-high' },
  medium: { label: 'Medium', icon: Minus, className: 'text-priority-medium' },
  low: { label: 'Low', icon: ArrowDown, className: 'text-priority-low' },
  trivial: { label: 'Trivial', icon: ChevronDown, className: 'text-priority-trivial' },
};

export const typeConfig: Record<TaskType, { label: string; icon: typeof BookOpen; className: string }> = {
  story: { label: 'Story', icon: BookOpen, className: 'text-status-in-progress bg-status-in-progress/10' },
  bug: { label: 'Bug', icon: Bug, className: 'text-priority-critical bg-priority-critical/10' },
  task: { label: 'Task', icon: CheckSquare, className: 'text-status-done bg-status-done/10' },
  epic: { label: 'Epic', icon: Layers, className: 'text-purple-600 bg-purple-100' },
};
