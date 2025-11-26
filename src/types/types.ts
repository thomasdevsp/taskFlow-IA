
export type ActionState = { status: string; message: string; task?: string; };

export interface ChatSchema {
  id?: string
  message: string
  author: string
}

export interface TodoListSchema {
  id: number;
  created_at: string;
  is_completed: boolean | null;
  task_description: string | null;
  title: string | null;
  category: string | null;
}
