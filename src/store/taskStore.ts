import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Status } from '@/types/task';
import { mockTasks } from '@/data/mockTasks';

interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  filterPriority: string | null;
  setSearchQuery: (q: string) => void;
  setFilterPriority: (p: string | null) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void; // Added for CRUD
  updateTask: (taskId: string, updatedTask: Partial<Task>) => void; // Added for CRUD
  getFilteredTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      // If localStorage is empty, it falls back to mockTasks
      tasks: mockTasks,
      searchQuery: '',
      filterPriority: null,
      setSearchQuery: (q) => set({ searchQuery: q }),
      setFilterPriority: (p) => set({ filterPriority: p }),
      
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : t
          ),
        })),
        
      addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
      
      // NEW: Delete Task
      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== taskId)
      })),

      // NEW: Update existing Task
      updateTask: (taskId, updatedTask) => set((state) => ({
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, ...updatedTask, updatedAt: new Date().toISOString().split('T')[0] } : t
        )
      })),

      getFilteredTasks: () => {
        const { tasks, searchQuery, filterPriority } = get();
        return tasks.filter((t) => {
          const matchesSearch =
            !searchQuery ||
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.key.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesPriority = !filterPriority || t.priority === filterPriority;
          return matchesSearch && matchesPriority;
        });
      },
    }),
    {
      name: 'jmd-kanban-storage', // This is the key in localStorage
      // We only want to save the tasks, not the search queries
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);