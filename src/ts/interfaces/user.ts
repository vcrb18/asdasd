interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  fullName(): string;
  isAuthenticated(): boolean;
}

export type { User };
