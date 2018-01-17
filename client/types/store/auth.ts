export interface AuthState {
  loading: boolean;
  authUser?: AuthUser | null;
  error?: any;
}

export interface AuthUser {
  id: number;
  email: string;
  createdDate: string;
  updatedDate: string;
  role: Role;
  profile: Profile;
  accessToken: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName?: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}
