export interface BreadMemoType {
  id: number;
  user_id: number;
  bread_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMemoParams {
  breadId: number;
  content: string;
}

export interface UpdateMemoParams {
  breadId: number;
  content: string;
}

export interface DeleteMemoParams {
  breadId: number;
}
