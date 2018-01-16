import { AxiosError } from 'axios';

export interface TodoState {
  loading: boolean;
  error?: Error | AxiosError | null;
  data: Array<Todo & { user: User }>;
  metadata: ResponseMetadata;
}

export interface FetchTodosPayload {
  limit: number;
  offset: number;
}

export interface FetchTodosResponse {
  data: Array<Todo & { user: User & { profile: Profile } }>;
  metadata: ResponseMetadata;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  isPublic: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
  profile: Profile;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName?: string;
  createdDate: string;
  updatedDate: string;
}

export interface ResponseMetadata {
  limit: number;
  offset: number;
  total: number;
}
