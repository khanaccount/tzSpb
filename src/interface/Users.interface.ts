export interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  avatar: string;
  persist?: { version: number; rehydrated: boolean };
}

export interface UsersState {
  users: User[];
}

export const initialState: UsersState = {
  users: [],
};
