import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TaskCard {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  priority: 'Low' | 'Medium' | 'High';
  assignees: string[];
  links?: number;
  comments: number;
  dueDate?: string;
  reports?: number;
  hasStream?: boolean;
  hasGroupCall?: boolean;
  hasImage?: boolean;
}

interface BoardColumn {
  id: string;
  title: string;
  color: string;
  tasks: TaskCard[];
}

interface TaskStore {
  columns: BoardColumn[];
  setColumns: (columns: BoardColumn[]) => void;
  moveTask: (taskId: string, sourceColumnId: string, destinationColumnId: string) => void;
  searchTasks: (query: string) => void;
  filteredColumns: BoardColumn[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      columns: [],
      filteredColumns: [],
      setColumns: (columns) => set({ columns, filteredColumns: columns }),
      moveTask: (taskId, sourceColumnId, destinationColumnId) => {
        set((state) => {
          const newColumns = [...state.columns];
          const sourceColumn = newColumns.find((col) => col.id === sourceColumnId);
          const destColumn = newColumns.find((col) => col.id === destinationColumnId);
          if (!sourceColumn || !destColumn) return state;

          const task = sourceColumn.tasks.find((t) => t.id === taskId);
          if (!task) return state;

          sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId);
          destColumn.tasks = [...destColumn.tasks, task];

          return { columns: newColumns, filteredColumns: newColumns };
        });
      },
      searchTasks: (query) => {
        set((state) => {
          if (!query) return { filteredColumns: state.columns };
          const filteredColumns = state.columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) =>
              task.title.toLowerCase().includes(query.toLowerCase())
            ),
          }));
          return { filteredColumns };
        });
      },
    }),
    {
      name: 'task-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);