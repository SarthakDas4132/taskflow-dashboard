import { useState, useCallback } from 'react';
import { Status } from '@/types/task';
import { useTaskStore } from '@/store/taskStore';
import { TaskCard } from '@/components/TaskCard';
import { motion } from 'framer-motion';

const columns: { id: Status; title: string; dotClass: string }[] = [
  { id: 'todo', title: 'To Do', dotClass: 'bg-status-todo' },
  { id: 'in-progress', title: 'In Progress', dotClass: 'bg-status-in-progress' },
  { id: 'review', title: 'In Review', dotClass: 'bg-status-review' },
  { id: 'done', title: 'Done', dotClass: 'bg-status-done' },
];

export function KanbanBoard() {
  const { getFilteredTasks, moveTask } = useTaskStore();
  const tasks = getFilteredTasks();
  const [dragOverColumn, setDragOverColumn] = useState<Status | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, columnId: Status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, columnId: Status) => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData('taskId');
      if (taskId) moveTask(taskId, columnId);
      setDragOverColumn(null);
    },
    [moveTask]
  );

  return (
    <div className="flex h-full gap-4 overflow-x-auto p-4 snap-x">
      {columns.map((col) => {
        const columnTasks = tasks.filter((t) => t.status === col.id);
        const isOver = dragOverColumn === col.id;

        return (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: columns.indexOf(col) * 0.08 }}
            className="flex h-full min-w-[300px] w-[300px] shrink-0 flex-col rounded-xl snap-center"
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.dotClass}`} />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {col.title}
                </h2>
              </div>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-semibold text-muted-foreground">
                {columnTasks.length}
              </span>
            </div>

            <div
              className={`flex flex-1 flex-col gap-2 rounded-lg p-1.5 transition-colors ${
                isOver ? 'bg-primary/5 ring-2 ring-primary/20' : ''
              }`}
            >
              {columnTasks.map((task, i) => (
                <TaskCard key={task.id} task={task} index={i} onDragStart={handleDragStart} />
              ))}
              {columnTasks.length === 0 && (
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-border">
                  <span className="text-xs text-muted-foreground">Drop tasks here</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
