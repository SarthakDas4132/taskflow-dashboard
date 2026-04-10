export type Priority = 'critical' | 'high' | 'medium' | 'low' | 'trivial';
export type Status = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskType = 'story' | 'bug' | 'task' | 'epic';

export interface Task {
  id: string;
  key: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  type: TaskType;
  assignee?: {
    name: string;
    avatar: string;
  };
  labels: string[];
  deadline?: string;
  storyPoints?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: Status;
  title: string;
  tasks: Task[];
}
