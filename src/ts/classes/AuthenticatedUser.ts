import { User } from '@/ts/interfaces/user';

import { UserProps } from '../types/userProps';

class AuthenticatedUser implements User {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;

  constructor(user: UserProps) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.role = user.role;
  }

  public fullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
  public isAuthenticated(): boolean {
    return true;
  }
}

export default AuthenticatedUser;
