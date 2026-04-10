import { Task } from '@/types/task';
import { useState } from 'react';
import { priorityConfig, typeConfig } from '@/lib/taskConfig';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useTaskStore } from '@/store/taskStore';
import { EditTaskDialog } from '@/components/EditTaskDialog';

interface TaskCardProps {
  task: Task;
  index: number;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, index, onDragStart }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  const type = typeConfig[task.type];
  const PriorityIcon = priority.icon;
  const TypeIcon = type.icon;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteTask } = useTaskStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.2 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, task.id)}
      onClick={() => setIsEditOpen(true)}
      className="group cursor-grab rounded-lg border border-border bg-card p-3 task-card-shadow transition-all hover:task-card-shadow-hover hover:border-primary/20 active:cursor-grabbing"

    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={`flex h-5 w-5 items-center justify-center rounded ${type.className}`}>
            <TypeIcon className="h-3 w-3" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{task.key}</span>
        </div>
        
        <PriorityIcon className={`h-3.5 w-3.5 ${priority.className}`} />
      </div>

      <h3 className="mb-2 text-sm font-medium leading-snug text-card-foreground">
        {task.title}
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {task.labels.slice(0, 2).map((label) => (
            <Badge key={label} variant="secondary" className="h-5 px-1.5 text-[10px] font-normal">
              {label}
            </Badge>
          ))}
          {task.storyPoints && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
              {task.storyPoints}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={(e) => {
              e.stopPropagation(); 
              deleteTask(task.id);
            }}
            className="text-muted-foreground opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <MessageSquare className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          {task.assignee && (
            <Avatar className="h-5 w-5">
              <AvatarFallback className="bg-primary/10 text-[9px] font-medium text-primary">
                {task.assignee.avatar}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
      <EditTaskDialog 
        task={task} 
        open={isEditOpen} 
        onOpenChange={setIsEditOpen} 
      />
    </motion.div>
  );
}
